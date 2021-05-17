import React, { useEffect, useState } from 'react';
import Navbar from '../TrangChu/Navbar';
import Footer from '../TrangChu/Footer';
import axios from 'axios';
import './pages.css';

function CapNhatThongTin() {

    const [User, setUser] = useState([]);

    useEffect(() => {
        document.title = 'Cập nhật thông tin';
        loadData()
    }, [])

    async function loadData() {
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        };
        axios.get("http://phatnguyen.nikinpham.com/be/public/index.php/api/auth/home", config)
            .then(response => {
                setUser(response.data[0].data)
            },
                err => {
                    // console.log(err)
                }
            )
    }

    const [SoDienThoai, setSoDienThoai] = useState("");
    const [CauHoiBiMat, setCauHoiBiMat] = useState("");

    const [HinhDaiDien, setHinhDaiDien] = useState("");


    const [errorSoDienThoai, seterrorSoDienThoai] = useState("");
    const [errorHinhAnh, seterrorHinhAnh] = useState("");
    const [errorCauHoiBiMat, seterrorCauHoiBiMat] = useState("");

    const [imageUrl, setUrl] = useState();
    const imageRef = React.useRef(null);

    function HienThiHinhAnh() {
        const [result, setResult] = React.useState("");

        function uploader(data) {
            const imageFile = data.target.files[0];
            const reader = new FileReader();
            reader.addEventListener("load", (data) => {
                setResult(data.target.result);
            });

            reader.readAsDataURL(imageFile);
        }

        return { result, uploader };
    }

    const { result, uploader } = HienThiHinhAnh();

    function fileSelect(data) {
        setHinhDaiDien(data.target.value);
        const fd = new FormData();
        fd.append("image", data.target.files[0]);
        axios.post("http://phatnguyen.nikinpham.com/be/test.php", fd).then((res) => {
            // console.log(res);
        });
        const url =
            "http://phatnguyen.nikinpham.com/be/img/" + data.target.files[0].name;
        setUrl(url);
    }

    function capnhat() {
        const id = User.UserID;
        const HinhDaiDien = imageUrl;
        const LanDauDangNhap = "0";
        let data = { SoDienThoai, HinhDaiDien, LanDauDangNhap, CauHoiBiMat };
        // console.log(data)
        if (!SoDienThoai && !HinhDaiDien && !CauHoiBiMat) {
            alert("Vui lòng điền thông tin trước khi đăng nhập")
        } else if (!SoDienThoai) {
            seterrorSoDienThoai("không được để trống số điện thoại")
            seterrorHinhAnh("")
        } else if (SoDienThoai.length !== 10) {
            seterrorSoDienThoai("Số điện thoại phải là 10 số")
        } else if (!HinhDaiDien) {
            seterrorSoDienThoai("")
            seterrorHinhAnh("không được để trống hình đại diện")
        } else if (!CauHoiBiMat) {
            seterrorSoDienThoai("")
            seterrorHinhAnh("")
            seterrorCauHoiBiMat("Vui lòng trả lời câu hỏi bí mật")
        } else {
            let url = `http://phatnguyen.nikinpham.com/be/public/index.php/api/user/capnhatlandau/${id}`;
            fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(data)
            }).then((result) => {
                // console.log("Result: ", result)
                result.json()
                    .then((response) => {
                        // console.warn("response: ", response)
                        alert("Cập nhật thành công")
                        window.location.assign("/");
                    })
            })
        }
    }
    return (
        <>
            <Navbar />
            <div className="outer">
                <div className="inner mt-3 mb-3 pt-3 pb-3" style={{ width: "50rem" }}>
                    <form>
                        <h3>Cập nhật thông tin</h3>
                        <div className="form-group">
                            <label>Cập nhật số điện thoại:</label>
                            <input style={{ width: "30%" }} type="text" className="form-control" placeholder="nhập số diện thoại"
                                value={SoDienThoai} name="SoDienThoai"
                                onChange={(data) => { setSoDienThoai(data.target.value) }}
                            />
                            <span className="text-danger" style={{ fontSize: "15px" }} >{errorSoDienThoai}</span>
                        </div>

                        <div className="form-group">
                            <label>Cập nhật hình đại diện:</label>
                            <div>
                                <img
                                    className="img-thumbnail"
                                    style={{ width: "220px", height: "220px" }}
                                    ref={imageRef}
                                    src={result}
                                    alt=""
                                /> <br />
                                <input
                                    id="files"
                                    className="d-none"
                                    type="file"
                                    name="HinhAnh"
                                    accept="image/*"
                                    value={HinhDaiDien}
                                    onChange={(data) => {
                                        setHinhDaiDien(data.target.value);
                                        uploader(data);
                                        fileSelect(data);
                                    }} />
                                <span>
                                    <label htmlFor="files"><i className="fa fa-folder-open-o"></i> &nbsp;Cập nhật hình đại diện</label>
                                </span> <br />
                                <span className="text-danger">{errorHinhAnh}</span>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Câu hỏi bí mật: <strong>Thú cưng bạn đã từng nuôi?</strong></label> <br />

                            <input type="text" className="form-control" placeholder="nhập câu trả lời"
                                value={CauHoiBiMat} name="CauHoiBiMat"
                                onChange={(data) => { setCauHoiBiMat(data.target.value) }}
                            />
                            <pre>Trả lời câu hỏi trên, chúng tôi sẽ hỏi lại khi bạn <strong>quên mật khẩu.</strong></pre>
                            <span className="text-danger" style={{ fontSize: "15px" }} >{errorCauHoiBiMat}</span>
                        </div>

                        <button type="button" className="btn btn-dark btn-lg btn-block" onClick={capnhat}>Cập nhập</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )

}
export default CapNhatThongTin;