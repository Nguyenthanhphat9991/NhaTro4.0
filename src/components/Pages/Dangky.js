import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import Navbar from '../TrangChu/Navbar';
import Footer from '../TrangChu/Footer';

import './pages.css';

function Dangky() {


    useEffect(() => {
        document.title = 'Đăng ký';
    },[])


    const [HoVaTen, setHoVaTen] = useState("");
    const [Email, setEmail] = useState("");
    const [MatKhau, setMatKhau] = useState("");
    const [NhapLaiMatKhau, setNhapLaiMatKhau] = useState("");
    const [SoDienThoai] = useState("0000000000");
    const [HinhDaiDien] = useState("http://phatnguyen.nikinpham.com/be/img/avatar.jpeg");

    const [LanDauDangNhap] = useState("1");
    const [VaiTro] = useState("user");

    const [errorHoVaTen, seterrorHoVaTen] = useState("");
    const [errorEmail, seterrorEmail] = useState("");
    const [errorMatKhau, seterrorMatKhau] = useState("");
    const [errorNhapLaiMatKhau, seterrorNhapLaiMatKhau] = useState("");

    function dangki() {
        var filter = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        let url = 'http://phatnguyen.nikinpham.com/be/public/index.php/api/auth/dangki';
        let data = { HoVaTen, Email, MatKhau, SoDienThoai, HinhDaiDien, VaiTro,LanDauDangNhap };

        if (!HoVaTen && !Email && !MatKhau && !NhapLaiMatKhau) {
            alert("Vui lòng điền đầy đủ thông tin")
            const checkHoVaTen = "Vui lòng không để trống họ và tên ";
            seterrorHoVaTen(checkHoVaTen)
            const checkRongEmail = "Vui lòng không để trống email";
            seterrorEmail(checkRongEmail)
            const checkRongMatKhau = "Vui lòng không để mật khẩu";
            seterrorMatKhau(checkRongMatKhau)
            const checkRongNhapLaiMatKhau = "Vui lòng không để mật khẩu";
            seterrorMatKhau(checkRongNhapLaiMatKhau)
        } else if (!HoVaTen && !Email) {
            if (MatKhau.length < 8) {
                const checkHoVaTen = "Vui lòng không để trống họ và tên ";
                seterrorHoVaTen(checkHoVaTen)
                const checkRongEmail = "Vui lòng không để trống email";
                seterrorEmail(checkRongEmail)
                const checkRongMatKhau = "Mật khẩu có độ dài lớn hơn 8 kí tự";
                seterrorMatKhau(checkRongMatKhau)
            } else if (NhapLaiMatKhau !== MatKhau) {
                const checkRongMatKhau = "Mật khẩu không khớp";
                seterrorMatKhau(checkRongMatKhau)
                const checkRongNhapLaiMatKhau = "Mật khẩu không khớp";
                seterrorNhapLaiMatKhau(checkRongNhapLaiMatKhau)
            } else {
                const checkHoVaTen = "Vui lòng không để trống họ và tên ";
                seterrorHoVaTen(checkHoVaTen)
                const checkRongEmail = "Vui lòng không để trống email";
                seterrorEmail(checkRongEmail)
                const checkRongMatKhau = "";
                seterrorMatKhau(checkRongMatKhau)
            }
        } else if (!Email && !MatKhau) {
            const checkHoVaTen = "";
            seterrorHoVaTen(checkHoVaTen)
            const checkRongEmail = "Vui lòng không để trống email";
            seterrorEmail(checkRongEmail)
            const checkRongMatKhau = "Vui lòng không để mật khẩu";
            seterrorMatKhau(checkRongMatKhau)
        } else if (!HoVaTen && !MatKhau) {
            if (!filter.test(Email)) {
                const checkHoVaTen = "Vui lòng không để trống họ và tên ";
                seterrorHoVaTen(checkHoVaTen)
                const checkRongEmail = "Vui lòng điền đúng Email";
                seterrorEmail(checkRongEmail)
                const checkRongMatKhau = "Vui lòng không để mật khẩu";
                seterrorMatKhau(checkRongMatKhau)
            } else {
                const checkHoVaTen = "Vui lòng không để trống họ và tên ";
                seterrorHoVaTen(checkHoVaTen)
                const checkRongEmail = "";
                seterrorEmail(checkRongEmail)
                const checkRongMatKhau = "Vui lòng không để mật khẩu";
                seterrorMatKhau(checkRongMatKhau)
            }
        } else if (!HoVaTen) {
            if (!filter.test(Email) && MatKhau.length < 8) {
                const checkHoVaTen = "Vui lòng không để trống họ và tên ";
                seterrorHoVaTen(checkHoVaTen)
                const checkRongEmail = "Vui lòng điền đúng Email";
                seterrorEmail(checkRongEmail)
                const checkRongMatKhau = "Mật khẩu có độ dài lớn hơn 8 kí tự";
                seterrorMatKhau(checkRongMatKhau)
            } else if (MatKhau.length < 8) {
                const checkRongMatKhau = "Mật khẩu có độ dài lớn hơn 8 kí tự";
                seterrorMatKhau(checkRongMatKhau)
            } else if (NhapLaiMatKhau !== MatKhau) {
                const checkRongMatKhau = "Mật khẩu không khớp";
                seterrorMatKhau(checkRongMatKhau)
                const checkRongNhapLaiMatKhau = "Mật khẩu không khớp";
                seterrorNhapLaiMatKhau(checkRongNhapLaiMatKhau)
            } else {
                const checkHoVaTen = "Vui lòng không để trống họ và tên ";
                seterrorHoVaTen(checkHoVaTen)
                const checkRongEmail = "";
                seterrorEmail(checkRongEmail)
                const checkRongMatKhau = "";
                seterrorMatKhau(checkRongMatKhau)
                const checkRongNhapLaiMatKhau = "";
                seterrorMatKhau(checkRongNhapLaiMatKhau)
            }
        } else if (!Email) {
            if (MatKhau.length < 8) {
                const checkRongMatKhau = "Mật khẩu có độ dài lớn hơn 8 kí tự";
                seterrorMatKhau(checkRongMatKhau)
            } else if (NhapLaiMatKhau !== MatKhau) {
                const checkRongMatKhau = "Mật khẩu không khớp";
                seterrorMatKhau(checkRongMatKhau)
                const checkRongNhapLaiMatKhau = "Mật khẩu không khớp";
                seterrorNhapLaiMatKhau(checkRongNhapLaiMatKhau)
            } else {
                const checkHoVaTen = "";
                seterrorHoVaTen(checkHoVaTen)
                const checkRongMatKhau = "";
                seterrorMatKhau(checkRongMatKhau)
                const checkRongNhapLaiMatKhau = "";
                seterrorNhapLaiMatKhau(checkRongNhapLaiMatKhau)
                const checkRongEmail = "Vui lòng không để trống email";
                seterrorEmail(checkRongEmail)

            }
        } else if (!MatKhau) {
            if (!filter.test(Email)) {
                const checkHoVaTen = "";
                seterrorHoVaTen(checkHoVaTen)
                const checkRongEmail = "Vui lòng điền đúng Email";
                seterrorEmail(checkRongEmail)
                const checkRongMatKhau = "Vui lòng không để trống mật khẩu";
                seterrorMatKhau(checkRongMatKhau)
            } else {
                const checkHoVaTen = "";
                seterrorHoVaTen(checkHoVaTen)
                const checkRongEmail = "";
                seterrorEmail(checkRongEmail)
                const checkRongMatKhau = "Vui lòng không để trống mật khẩu";
                seterrorMatKhau(checkRongMatKhau)
            }
        } else if (MatKhau.length < 8) {
            const checkHoVaTen = "";
            seterrorHoVaTen(checkHoVaTen)
            const checkRongEmail = "";
            seterrorEmail(checkRongEmail)
            const checkRongMatKhau = "Mật khẩu có độ dài lớn hơn 8 kí tự";
            seterrorMatKhau(checkRongMatKhau)
        } else if (MatKhau !== NhapLaiMatKhau) {
            const checkHoVaTen = "";
            seterrorHoVaTen(checkHoVaTen)
            const checkRongEmail = "";
            seterrorEmail(checkRongEmail)
            const checkRongMatKhau = "Mật khẩu không khớp";
            seterrorMatKhau(checkRongMatKhau)
            const checkRongNhapLaiMatKhau = "Mật khẩu không khớp";
            seterrorNhapLaiMatKhau(checkRongNhapLaiMatKhau)
        } else if (!filter.test(Email)) {
            const checkRongEmail = "Vui lòng điền đúng Email";
            seterrorEmail(checkRongEmail)
        } else {
            fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(data)
            }).then((result) => {
                result.json()
                    .then((response) => {
                        // console.warn("response: ", response.message)
                        alert(response.message)
                        if (response.status === 400) {
                            window.location = '/dangki';
                        } else {
                            window.location = '/dangnhap';
                        }
                    })
            })
        }
    }
    return (
        <>
            <Navbar />
            <div className="outer">
                <div className="inner mt-3 mb-3 pt-3 pb-3">
                    <form>
                        <h3>Đăng kí</h3>
                        <div className="form-group">
                            <label>Họ và tên</label>
                            <input type="text" className="form-control" placeholder="nhập họ và tên"
                                value={HoVaTen} name="HoVaTen"
                                onChange={(data) => { setHoVaTen(data.target.value) }}
                            />
                            <span className="text-danger" style={{ fontSize: "15px" }} >{errorHoVaTen}</span>
                        </div>

                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" className="form-control" placeholder="nhập email"
                                value={Email} name="Email"
                                onChange={(data) => { setEmail(data.target.value) }}
                            />
                            <span className="text-danger" style={{ fontSize: "15px" }} >{errorEmail}</span>
                        </div>

                        <div className="form-group">
                            <label>Mật khẩu</label>
                            <input type='password' required className="form-control" placeholder="nhập mật khẩu"
                                value={MatKhau} name="MatKhau"
                                onChange={(data) => { setMatKhau(data.target.value) }}
                            />
                            <span className="text-danger" style={{ fontSize: "15px" }} >{errorMatKhau}</span>

                        </div>

                        <div className="form-group">
                            <label>Nhập lại mật khẩu</label>
                            <input type='password' className="form-control" placeholder="nhập lại mật khẩu"
                                value={NhapLaiMatKhau} name="NhapLaijMatKhau"
                                onChange={(data) => { setNhapLaiMatKhau(data.target.value) }}
                            />
                            <span className="text-danger" style={{ fontSize: "15px" }} >{errorNhapLaiMatKhau}</span>
                        </div>
                        <button type="button" className="btn btn-dark btn-lg btn-block" onClick={dangki}>Đăng kí</button>
                        <p className="forgot-password text-right">
                            Đã có tài khoản đăng nhập <Link to="/dangnhap">tại đây</Link>
                        </p>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default Dangky;