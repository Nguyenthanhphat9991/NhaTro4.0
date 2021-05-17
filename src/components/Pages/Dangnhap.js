import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../TrangChu/Navbar';
import Footer from '../TrangChu/Footer';
import axios from 'axios';
import './pages.css';
function Dangnhap() {

    useEffect(() => {
        document.title = 'Đăng nhập';
        // loadData()
    },[])

    // const [User, setUser] = useState([]);

    const [Email, setEmail] = useState("");
    const [MatKhau, setMatKhau] = useState("");


    const [seterrorEmail] = useState("");
    const [seterrorMatKhau] = useState("");

    async function loadData() {
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        };
        axios.get("http://phatnguyen.nikinpham.com/be/public/index.php/api/auth/home", config)
            .then(response => {
                // setUser(response.data[0].data)
                if ((response.data[0].data.LanDauDangNhap === "1")) {
                    window.location = '/capnhatthongtin';
                } else {
                    window.location = '/';
                }
                // console.log(response.data[0].data.LanDauDangNhap)
            },
                err => {
                    // console.log(err)
                }
            )
    }

    function dangnhap() {
        if (!Email || !MatKhau) {
            alert("Vui lòng điền thông tin trước khi đăng nhập")
        } else {
            let url = 'http://phatnguyen.nikinpham.com/be/public/index.php/api/auth/dangnhap';
            let data = { Email, MatKhau };
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
                        if (response.status === 200) {
                            localStorage.setItem("token", response.token)
                            alert(response.message)
                            loadData()
                        } else {
                            alert(response.message)
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
                        <h3>Đăng nhập</h3>

                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" className="form-control" placeholder="nhập email"
                                value={Email} name="Email"
                                onChange={(data) => { setEmail(data.target.value) }}
                            />
                            <span className="text-danger" style={{ fontSize: "15px" }} >{seterrorEmail}</span>
                        </div>

                        <div className="form-group">
                            <label>Mật khẩu</label>
                            <input type="password"  autoComplete="on" className="form-control" placeholder="nhập mật khẩu"
                                value={MatKhau} name="MatKhau"
                                onChange={(data) => { setMatKhau(data.target.value) }}
                            />
                            <span className="text-danger" style={{ fontSize: "15px" }} >{seterrorMatKhau}</span>
                        </div>

                        <button type="button" className="btn btn-dark btn-lg btn-block" onClick={dangnhap}>Đăng nhập</button>
                        <p className="forgot-password text-right">
                            Chưa có tài khoản vui lòng đăng kí <Link to="/dangky">tại đây</Link>
                        </p>
                        <p  className="text-right mt-3 ">
                            <Link to="/quenmatkhau">Quên mật khẩu</Link>
                        </p>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )

}
export default Dangnhap;