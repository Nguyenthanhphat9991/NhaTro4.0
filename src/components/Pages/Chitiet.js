import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../TrangChu/Navbar';
import Footer from '../TrangChu/Footer';
import Banner from '../TrangChu/Banner';
import { Link } from 'react-router-dom';



import { CardGroup, Card } from 'react-bootstrap';


// import './pages.css';

function Chitiet() {
    const [isLoading, setIsLoading] = useState(true)
    const [error] = useState(null)
    const [KhuVuc, setKhuVuc] = useState("");
    const [DanhMuc, setDanhMuc] = useState("");
    const [phongtrolienquan, setphongtrolienquan] = useState([])



    const { id } = useParams()
    const [phongtro, setphongtro] = useState("")
    const [baocao, setbaocao] = useState("");
    const [User, setUsers] = useState("");
    const [NhanXet, setNhanXet] = useState("");
    const [HoVaTen, setHoVaTen] = useState("");
    const [Email, setEmail] = useState("");
    const [errorEmail] = useState("");
    const [errorRongNhanXet, seterrorRongNhanXet] = useState("");
    const [errorRongHoVaTen, seterrorRongHoVaTen] = useState("");
    const [errorRongEmail, seterrorRongEmail] = useState("");

    // let content = null

    useEffect(() => {
        document.title = 'Chi tiết phòng trọ';

        get_phongtro()
    },[])

    async function get_phongtro() {
        const urlPhongTro = `http://phatnguyen.nikinpham.com/be/public/index.php/api/phongtro/thongtin/${id}`;
        await axios.get(urlPhongTro)
            .then(response => {
                setphongtro(response.data)
                setDanhMuc(response.data[0].TenDanhMuc)
                setKhuVuc(response.data[0].TenKhuVuc)
            })
    }



    async function get_userID() {
        const idUser = (phongtro[0].UserID)
        const urlUser = `http://phatnguyen.nikinpham.com/be/public/index.php/api/user/selectone/${idUser}`;
        await axios.get(urlUser)
            .then(res => {
                setUsers(res.data)
            })
    }

    async function get_BaoCao() {
        const urlBaoCao = `http://phatnguyen.nikinpham.com/be/public/index.php/api/phongtro/baocao/${id}`;
        await axios.get(urlBaoCao)
            .then(res => {
                setbaocao(res.data)
            })
    }


    async function get_PhongTroLienQuan() {
        try {
            if (KhuVuc && DanhMuc) {
                const res = await fetch(`http://phatnguyen.nikinpham.com/be/public/index.php/api/phongtro/phongtrolienquan/${KhuVuc}/${DanhMuc}`);
                const json = await res.json();
                setphongtrolienquan(json)
                setIsLoading(false)
            } else {
                return null;
            }
        } catch (err) {
            console.error('err', err);
        }
    }

    function submit() {
        var filter = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if ((!NhanXet) && (!HoVaTen) && (!Email)) {
            const checkRongNhanXet = "Vui lòng không để nội dung nhận xét rỗng";
            seterrorRongNhanXet(checkRongNhanXet)
            const checkRongHoVaTen = "Vui lòng nhập họ và tên vào";
            seterrorRongHoVaTen(checkRongHoVaTen)
            const checkRongEmail = "Vui lòng nhập đầy đủ email";
            seterrorRongEmail(checkRongEmail)
        } else if ((!NhanXet) && (!HoVaTen) && !filter.test(Email)) {
            seterrorRongEmail(null)
            const checkRongNhanXet = "Vui lòng không để nội dung nhận xét rỗng";
            seterrorRongNhanXet(checkRongNhanXet)
            const checkRongHoVaTen = "Vui lòng nhập họ và tên vào";
            seterrorRongHoVaTen(checkRongHoVaTen)
            const checkRongEmail = "Vui lòng nhập đầy đủ email";
            seterrorRongEmail(checkRongEmail)
        } else if ((!NhanXet) && (!Email)) {
            seterrorRongHoVaTen(null)
            const checkRongNhanXet = "Vui lòng không để nội dung nhận xét rỗng";
            seterrorRongNhanXet(checkRongNhanXet)
            const checkRongEmail = "Vui lòng nhập đầy đủ email";
            seterrorRongEmail(checkRongEmail)
        } else if ((!HoVaTen) && (!Email)) {
            seterrorRongNhanXet(null)
            const checkRongHoVaTen = "Vui lòng nhập họ và tên vào";
            seterrorRongHoVaTen(checkRongHoVaTen)
            const checkRongEmail = "Vui lòng nhập đầy đủ email";
            seterrorRongEmail(checkRongEmail)
        } else if ((!NhanXet) && !filter.test(Email)) {
            seterrorRongEmail(null)
            seterrorRongHoVaTen(null)
            const checkRongNhanXet = "Vui lòng không để nội dung nhận xét rỗng";
            seterrorRongNhanXet(checkRongNhanXet)
            const checkEmail = "Kiểm tra lại Email";
            seterrorRongEmail(checkEmail)
        } else if (!HoVaTen && !filter.test(Email)) {
            seterrorRongEmail(null)
            seterrorRongNhanXet(null)
            const checkRongHoVaTen = "Vui lòng nhập họ và tên vào";
            seterrorRongHoVaTen(checkRongHoVaTen)
            const checkEmail = "Kiểm tra lại Email";
            seterrorRongEmail(checkEmail)
        } else if (!Email) {
            seterrorRongNhanXet(null)
            seterrorRongHoVaTen(null)
            const checkRongEmail = "Vui lòng nhập đầy đủ email";
            seterrorRongEmail(checkRongEmail)
        } else if (!NhanXet) {
            seterrorRongEmail(null)
            seterrorRongHoVaTen(null)
            const checkRongNhanXet = "Vui lòng không để nội dung nhận xét rỗng";
            seterrorRongNhanXet(checkRongNhanXet)
        } else if (!HoVaTen) {
            seterrorRongEmail(null)
            seterrorRongNhanXet(null)
            const checkRongHoVaTen = "Vui lòng nhập họ và tên vào";
            seterrorRongHoVaTen(checkRongHoVaTen)
        } else if (HoVaTen && NhanXet && !filter.test(Email)) {
            seterrorRongNhanXet(null)
            seterrorRongHoVaTen(null)
            const checkEmail = "Kiểm tra lại Email";
            seterrorRongEmail(checkEmail)
        } else {
            seterrorRongEmail(null)
            seterrorRongNhanXet(null)
            seterrorRongHoVaTen(null)
            const PhongTroID = id;
            const NoiDungBaoCao = NhanXet;
            console.log("id: ", PhongTroID, "nhận xét", NhanXet, "họ và tên", HoVaTen, "email", Email)
            let urlBaoCao = "http://phatnguyen.nikinpham.com/be/public/index.php/api/baocao/create"
            let data = { PhongTroID, NoiDungBaoCao, HoVaTen, Email }
            console.log("data: ", data)
            fetch(urlBaoCao, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(data)
            }).then((result) => {
                console.log("Result: ", result)
                result.json()
                    .then((response) => {
                        console.warn("response: ", response)
                        alert("Đánh giá thành công")
                        window.location.reload();
                    })
            })
        }
    }

    function reload(id) {
        window.location = `/chitiet/${id}`;
    }

    const PhongTroLienQuan = () => {
        return (
            <React.Fragment >
                <h3 id="thongtinphongtro" style={{ backgroundColor: "#fff", color: "#83BFA6" }} class="heading  mt-5 mb-0 pt-2 text-center">Phòng trọ liên quan</h3>
                {error ? <p>{error.message}</p> : null}
                {!isLoading ?
                    (
                        phongtrolienquan.map(phongtrolienquans => {
                            const { TieuDe, Gia, HinhAnh } = phongtrolienquans;
                            let lowercasetext = TieuDe.toLowerCase();
                            var a = lowercasetext.match(/.{1,25}/g);
                            // var b = MoTa.match(/.{1,60}/g);
                            return (
                                <CardGroup key={phongtrolienquans.PhongTroID} style={{ backgroundColor: "#fff" }} className="col-lg-4 m-auto mt-0 pb-3" >
                                    <Card className="mt-3 mb-3" style={{ width: '350px' }}>
                                        <Card.Img style={{
                                            "width": "100 %",
                                            "height": "15vw",
                                            "fit": "cover"
                                        }}
                                            src={HinhAnh} alt={TieuDe} />
                                        <Card.Body>
                                            <Card.Title style={{ 'textTransform': 'capitalize' }}>{a[0] + "..."}</Card.Title>
                                            <Card.Text>
                                                <div className="d-flex justify-content-between">
                                                    <strong className="text-info">{KhuVuc}</strong>
                                                    <strong className="text-info">{DanhMuc}</strong>
                                                    <strong className="text-info">{Gia}<sup>₫</sup>/tháng</strong>
                                                </div>
                                                
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <Link className="btn btn-outline-primary"
                                                to="/#"
                                            ><span onClick={() => reload(phongtrolienquans.PhongTroID)}>Xem Chi Tiết</span></Link>
                                        </Card.Footer>
                                    </Card>
                                </CardGroup>
                            );
                        })
                    ) :
                    (
                        <>
                            <div className="col-4">
                            </div>
                            <div className="col-4 text-center mt-3">
                                <div class="spinner-grow text-primary" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <div class="spinner-grow text-secondary" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <div class="spinner-grow text-success" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <div class="spinner-grow text-danger" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <div class="spinner-grow text-warning" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <div class="spinner-grow text-info" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <div class="spinner-grow text-light" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                            <div className="col-4">
                            </div>
                        </>
                    )}
            </React.Fragment>
        );
    }


    if (phongtro) {
        const tienIch = phongtro[0].TienIch.split('.');
        const moTa = phongtro[0].MoTa.split('.');

        const MoTaItems = []
        for (const [index, value] of moTa.entries()) {
            MoTaItems.push(<ol className="text-left" key={index} > - {value}</ol>)
        }

        const TienIchItems = []
        for (const [index, value] of tienIch.entries()) {
            TienIchItems.push(<ol className="text-capitalize" key={index} > - {value}</ol>)
        }


        var noidungbaocao = [];
        for (var i = 0; i < baocao.length; i++) {
            noidungbaocao.push(
                <div className="p-2 ">
                    <strong className="ml-2 text-info">{baocao[i].HoVaTen}</strong> <p style={{ "fontFamily": "cursive" }} className="ml-4 text-warning">{baocao[i].NoiDungBaoCao}</p>
                </div>
            );
        }

        return (
            <>
                <Navbar />
                <Banner />
                <div className="container mt-3 mb-2" onMouseOut={() => { get_userID(); get_PhongTroLienQuan(); get_BaoCao() }} >
                    <h3 id="thongtinphongtro" style={{ backgroundColor: "#fff", color: "#83BFA6" }} class="heading  mt-5 mb-0 text-center">Thông Tin Chi Tiết</h3>
                    <div className="tab-content mt-3" style={{ fontFamily: "Barlow Condensed, sans-serif" }} >
                        <div id="phongtro" className="chitietphongtro container tab-pane active" style={{ backgroundColor: "#fff" }} >
                            <div className="row">
                                <h3 className="text-center">{phongtro[0].TieuDe}</h3>
                                <div className="col-5 " style={{ borderStyle: "dotted", backgroundColor: "f2f2f2" }}>
                                    <h2 style={{ fontSize: "30px", color: "#E9AD28", fontFamily: "Barlow Condensed, sans-serif" }}>{phongtro[0].Gia}<sup>₫</sup><span style={{ fontSize: "14", color: "#000" }}>&nbsp;/tháng</span></h2>
                                    <ul>
                                        <li>
                                            <span>Tiện ích:</span>{TienIchItems}
                                        </li>
                                        <li>
                                            <span>Mô tả:</span>{MoTaItems}
                                        </li>
                                        <li>
                                            <span>Diện tích:</span> <strong>{phongtro[0].DienTich}</strong> m²
                                        </li>
                                        <li>
                                            <span>Trạng thái:</span> <strong>{phongtro[0].TrangThai}</strong>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-7">
                                    <img alt={phongtro[0].TieuDe} src={phongtro[0].HinhAnh} className="img-thumbnail img-fluid" />
                                </div>
                            </div>
                            {/* thoong tin lien lac */}
                            <div className="row border border-warning mt-5  pb-2">
                                <h3 id="thongtinphongtro"
                                    style={{ backgroundColor: "#fff", color: "#83BFA6" }}
                                    class="heading  pt-2 text-center">
                                    Thông tin liên lạc
                                </h3>
                                <div className="col-2 m-auto text-center">
                                    <img src={User.HinhDaiDien} atl="ava" style={{ width: "100%" }} className="rounded-circle" />
                                </div>
                                <div className="col-10  m-auto">
                                    <table className="table table-sm justify-content-center">
                                        <thead></thead>
                                        <tbody>
                                            <tr>
                                                <th style={{ 'width': '20%' }} className="text-white bg-secondary">Họ và tên</th>
                                                <td style={{ 'width': '80%' }} ><strong className="ml-1">{User.HoVaTen}</strong></td>
                                            </tr>
                                            <tr>
                                                <th style={{ 'width': '20%' }} className="text-white bg-secondary">Số điện thoại</th>
                                                <td style={{ 'width': '80%' }}><strong className="ml-1">{phongtro[0].SoDienThoai}</strong></td>
                                            </tr>
                                            <tr>
                                                <th style={{ 'width': '20%' }} className="text-white bg-secondary">Địa chỉ</th>
                                                <td style={{ 'width': '80%' }}><strong className="ml-1">{phongtro[0].DiaChi}</strong></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* noi dung danh gia */}
                            <div>
                                <h3 id="thongtinphongtro" style={{ backgroundColor: "#fff", color: "#83BFA6" }} class="heading  mt-5 mb-0 pt-2 text-center">Nội dung đánh giá</h3>

                                <div className="row mt-3 mb-3" style={{ "height": "20rem", "overflow": "scroll", "border": "1px solid", "overflowX": "auto" }}>
                                    <div class="col-12">
                                        {noidungbaocao}
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-10">
                                        <textarea class="form-control" rows="3"
                                            placeholder="Nhận xét về trọ"
                                            value={NhanXet} name="nhanxet"
                                            onChange={(data) => { setNhanXet(data.target.value) }}
                                            required
                                        ></textarea>
                                        <span className="text-danger">{errorRongNhanXet}</span>
                                        <br />
                                        <div class="row">
                                            <div class="col-8">
                                                <div style={{ " position": "relative" }} class="inner-addon left-addon">
                                                    <i style={{
                                                        "position": "absolute",
                                                        "padding": "10px",
                                                        "pointerEvents": "none"
                                                    }}
                                                        class="fa fa-user"></i>
                                                    <input required placeholder="Họ và tên" style={{ "paddingLeft": "30px" }} type="text" class="form-control"
                                                        value={HoVaTen} name="hovaten"
                                                        onChange={(data) => { setHoVaTen(data.target.value) }}
                                                    />
                                                    <span className="text-danger">{errorRongHoVaTen}</span>
                                                </div>
                                                <div style={{ " position": "relative" }} className=" form-group mt-3">
                                                    <i style={{
                                                        "position": "absolute",
                                                        "padding": "10px",
                                                        "pointerEvents": "none"
                                                    }}
                                                        class="fa fa-envelope-square"></i>

                                                    <input
                                                        type="email" className="form-control" placeholder="nhập email"
                                                        value={Email} name="Email"
                                                        onChange={(data) => { setEmail(data.target.value) }}
                                                        style={{ "paddingLeft": "30px" }}
                                                        required
                                                    />
                                                    <span className="text-danger">{errorRongEmail}</span>
                                                    <span className="text-danger">{errorEmail}</span>
                                                </div>
                                            </div>
                                            <div class="col-4">
                                                <button onClick={submit} type="button" className="float-right btn btn-primary">Nhận xét</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-2">
                                    </div>
                                </div>
                            </div>
                            {/* phongtro lien quan */}
                            <div className="row">
                                <PhongTroLienQuan />
                            </div>
                        </div>
                    </div >
                </div >


                <Footer />
            </>
        )
    }
    return (
        <>
            <Navbar />
            <>
                <div className="col-4">
                </div>
                <div className="col-4 text-center mt-3">
                    <div class="spinner-grow text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="spinner-grow text-secondary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="spinner-grow text-success" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="spinner-grow text-danger" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="spinner-grow text-warning" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="spinner-grow text-info" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="spinner-grow text-light" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                <div className="col-4">
                </div>
            </>
            <Footer />
        </>
    )



}
export default Chitiet;