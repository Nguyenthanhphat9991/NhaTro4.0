import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css.css';
function QuanLyCacBaiViet() {



    const [SoDienThoaiPhongTro, setSoDienThoaiPhongTro] = useState("");
    const [TrangThai, setTrangThai] = useState("");
    const [phongtro, setphongtro] = useState([])
    const [phongtroID, setphongtroID] = useState(null)

    const [errorSoDienThoai, seterrorSoDienThoai] = useState("")
    const [errorTrangThai, seterrorTrangThai] = useState("")

    const [User, setUser] = useState([]);


    useEffect(() => {
        loadData()
        getPhongTro()
    })

    async function loadData() {
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        };
        await axios.get("http://phatnguyen.nikinpham.com/be/public/index.php/api/auth/home", config)
            .then(response => {
                setUser(response.data[0].data.UserID)
            },
                err => {
                    // console.log(err)
                }
            )
    }

    async function getPhongTro() {
        const url = `http://phatnguyen.nikinpham.com/be/public/index.php/api/user/userQuanLy/${User}`;
        await axios.get(url)
            .then((result) => {
                setphongtro(result.data)
                // console.log(phongtro)
            })
    }


    function deleteUser(phongtroID) {
        let deleteID = [phongtroID];
        const url = `http://phatnguyen.nikinpham.com/be/public/index.php/api/phongtro/delete/${deleteID}`
        if (window.confirm("Bạn có chắc chắc xoá không?")) {
            fetch(url, {
                method: 'DELETE'
            }).then((result) => {
                result.json().then((resp) => {
                    alert('Bạn đã xoá thành công')
                    getPhongTro()
                })
            })
            window.location.reload();
        }
        else {
            alert('Bạn đã huỷ thao tác xoá')
        }
    }

    function selectUser(phongtroID) {
        let item = phongtro[phongtroID];
        setSoDienThoaiPhongTro(item.SoDienThoai);
        setTrangThai(item.TrangThai);
        setphongtroID(item.PhongTroID);
        // console.log(phongtroID, item)
    }

    function updateUser() {
        let id = phongtroID;
        if (!SoDienThoaiPhongTro && !TrangThai) {
            alert("Dữ liệu cần thay đổi không được để trống")
            const checkRongSoDienThoai = "Vui lòng không để trống số điện thoại ";
            seterrorSoDienThoai(checkRongSoDienThoai)
            const checkRongTrangThai = "Vui lòng không để trống trạng thái phòng trọ";
            seterrorTrangThai(checkRongTrangThai)
        } else if (!SoDienThoaiPhongTro) {
            alert("Dữ liệu cần thay đổi không được để trống")
            const checkRongSoDienThoai = "Vui lòng không để trống số điện thoại ";
            seterrorSoDienThoai(checkRongSoDienThoai)
        } else if (SoDienThoaiPhongTro.length !== 10) {
            alert("Kiểm tra lại số điện thoại")
            const checkRongSoDienThoai = "Vui lòng cập nhật số điện thoại có 10 số";
            seterrorSoDienThoai(checkRongSoDienThoai)
        } else if (!TrangThai) {
            alert("Dữ liệu cần thay đổi không được để trống")
            const checkRongTrangThai = "Vui lòng không để trống trạng thái phòng trọ";
            seterrorTrangThai(checkRongTrangThai)
        } else {
            const url = `http://phatnguyen.nikinpham.com/be/public/index.php/api/phongtro/user_update/${id}`
            const SoDienThoai = SoDienThoaiPhongTro
            let item = { SoDienThoai, TrangThai }
            // console.log(url, item)
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            }).then((result) => {
                result.json().then((resp) => {
                    alert("Cập nhật thành công")
                    getPhongTro()
                    window.location = '/thongtinchutro';
                })
            })
        }
    }

    return (
        <>
            <div className=" quanlybaiviet table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-6">
                                <h2>Quản Lý <b>Bài Viết</b></h2>
                            </div>
                            <div className="col-sm-6 text-right">
                                <Link style={{
                                    "color": "rgb(0, 0, 0)",
                                    "float": "right",
                                    "fontSize": "13px",
                                    "minWidth": "50px",
                                    "borderRadius": "2px",
                                    "border": "none",
                                    "outline": "none !important",
                                    "marginLeft": "10px"
                                }} to="/dangtinmienphi" className="btn btn-success" ><i className="fa fa-plus"></i> <span>Thêm bài viết mới</span></Link>
                            </div>
                        </div>
                    </div>
                    <table className="table table-striped table-hover">
                        <thead style={{ "overflowY": "scroll", fontSize: "14px" }}>
                            <tr >
                                <th>STT</th>
                                <th>Tiêu đề</th>
                                <th>Số điện thoại</th>
                                <th>Trạng thái</th>
                                <th style={{ width: "200px" }}>Hành động</th>
                            </tr>
                        </thead>
                        <tbody style={{ fontSize: "12px" }}>
                            {
                                phongtro.map((item, i) =>
                                    <tr key={item.PhongTroID}>
                                        <td>{i + 1}</td>
                                        <td>{item.TieuDe}</td>
                                        <td>{item.SoDienThoai}</td>
                                        <td>{item.TrangThai}</td>
                                        <td style={{ width: "200px" }}>
                                            <Link to={{ pathname: `/chitiet/${item.PhongTroID}` }}
                                                className="view"><i style={{ fontSize: "11px" }} className="fa fa-angle-double-right"></i>Xem</Link>
                                            <a onClick={() => selectUser(i)} href="/#" data-toggle="modal" data-target="#sua" className="edit"><i style={{ fontSize: "11px" }} className="fa fa-edit"></i>Sửa</a>
                                            <Link onClick={() => deleteUser(item.PhongTroID)} to="/thongtinchutro" className="delete" ><i style={{ fontSize: "11px" }} className="fa fa-trash">Xoá</i></Link>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="modal fade" id="sua" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Sửa thông tin</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <div className="col-xs-12">
                                    {/* <div>
                                    <input type="text" value={SoDienThoai} onChange={(e) => { setSoDienThoai(e.target.value) }} /> <br /><br />
                                </div> */}
                                    <label><h4>Số điện thoại</h4></label>
                                    <input type="text" className="form-control"
                                        id="SoDienThoaiPhongTro" placeholder="Cập nhật lại số điện thoại"
                                        name="SoDienThoaiPhongTro"
                                        value={SoDienThoaiPhongTro}
                                        onChange={(data) => { setSoDienThoaiPhongTro(data.target.value) }}
                                    />
                                    <span className="text-danger" style={{ fontSize: "15px" }} >{errorSoDienThoai}</span>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-xs-12">
                                    {/* <input type="text" value={TrangThai} onChange={(e) => { setTrangThai(e.target.value) }} /> <br /><br /> */}
                                    <label><h4>Trạng thái</h4></label>
                                    <input type="text" className="form-control"
                                        id="TrangThai" placeholder="Cập nhật trạng thái phòng trọ của bạn"
                                        value={TrangThai} name="TrangThai"
                                        onChange={(data) => { setTrangThai(data.target.value) }}
                                    />
                                    <span className="text-danger" style={{ fontSize: "15px" }}>{errorTrangThai}</span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                            <button onClick={() => updateUser()} type="button" className="btn btn-primary">Thay đổi</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default QuanLyCacBaiViet;