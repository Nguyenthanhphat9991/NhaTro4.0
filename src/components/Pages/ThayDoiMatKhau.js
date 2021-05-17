import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from '../TrangChu/Navbar';
import Footer from '../TrangChu/Footer';
import axios from 'axios';
import './pages.css';
function ThayDoiMatKhau() {
    const { id } = useParams()

    const [UserInfo, setUserInfo] = useState([]);


    useEffect(() => {
        document.title = 'Thay đổi mật khẩu';
        get_User()
    })

    async function get_User() {
        const urlUser = `http://phatnguyen.nikinpham.com/be/public/index.php/api/user/selectone/${id}`;
        await axios.get(urlUser)
            .then(response => {
                setUserInfo(response.data)
                // console.log(UserInfo)
            })
    }

    const [MatKhauCu, setMatKhauCu] = useState("");
    const [MatKhauMoi, setMatKhauMoi] = useState("");
    const [NhapLaiMatKhauMoi, setNhapLaiMatKhauMoi] = useState("");

    const [errorMatKhauCu, seterrorsetMatKhauCu] = useState("");
    const [errorMatKhauMoi, seterrorMatKhauMoi] = useState("");
    const [errorNhapLaiMatKhauMoi, setsetNhapLaiMatKhauMoi] = useState("");


    function doimatkhau() {
        const MatKhau = MatKhauMoi;
        let url = `http://phatnguyen.nikinpham.com/be/public/index.php/api/user/thaydoimatkhau/${id}`;
        let data = { MatKhau };

        if (!MatKhauCu && !MatKhauMoi) {
            alert("Vui lòng điền thông tin trước khi thay đổi mật khẩu")
        } else if (!MatKhauCu) {
            seterrorMatKhauMoi("")
            seterrorsetMatKhauCu("Vui lòng không để trống mật khẩu cũ")
            setsetNhapLaiMatKhauMoi("")
        } else if (!MatKhauMoi) {
            seterrorsetMatKhauCu("")
            seterrorMatKhauMoi("Vui lòng nhập mật khẩu mới")
            setsetNhapLaiMatKhauMoi("")
        } else {
            if (MatKhauMoi < 8) {
                seterrorsetMatKhauCu("")
                seterrorMatKhauMoi("Mật khẩu có độ dài 8 kí tự trở lên")
                setsetNhapLaiMatKhauMoi("")
            } else if (MatKhauMoi !== NhapLaiMatKhauMoi) {
                seterrorsetMatKhauCu("")
                seterrorMatKhauMoi("Mật khẩu không khớp")
                setsetNhapLaiMatKhauMoi("Mật khẩu không khớp")
            } else if (MatKhauCu !== UserInfo.MatKhau) {
                seterrorMatKhauMoi("")
                seterrorsetMatKhauCu("Mật khẩu cũ không chính xác")
                setsetNhapLaiMatKhauMoi("")
            } else {
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
                            alert("Thay đổi mật khẩu thành công")
                            window.location.assign("/");
                        })
                })
            }
        }
    }
    return (
        <>
            <Navbar />
            <div className="outer">
                <div className="inner mt-3 mb-3 pt-3 pb-3">
                    <form>
                        <h3>Đổi mật khẩu mới</h3>

                        <div className="form-group">
                            <div className="col-xs-12">
                                <label><h4>Mật khẩu cũ</h4></label>
                                <input type="password" className="form-control" name="MatKhauCu" id="MatKhauCu" placeholder="nhập mật khẩu cũ"
                                    value={MatKhauCu}
                                    onChange={(data) => { setMatKhauCu(data.target.value) }}
                                />
                                <span className="text-danger">{errorMatKhauCu}</span>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-xs-12">
                                <label><h4>Mật khẩu mới</h4></label>
                                <input type="password" className="form-control" name="MatKhauMoi" id="MatKhauMoi" placeholder="nhập mật khẩu mới"
                                    value={MatKhauMoi}
                                    onChange={(data) => { setMatKhauMoi(data.target.value) }}
                                />
                                <span className="text-danger">{errorMatKhauMoi}</span>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-xs-12">
                                <label><h4>Nhập lại mật khẩu mới</h4></label>
                                <input type="password" className="form-control" name="NhapLaiMatKhauMoi" id="NhapLaiMatKhauMoi" placeholder="nhập lại mật khẩu mới"
                                    value={NhapLaiMatKhauMoi}
                                    onChange={(data) => { setNhapLaiMatKhauMoi(data.target.value) }}
                                />
                                <span className="text-danger">{errorNhapLaiMatKhauMoi}</span>
                            </div>
                        </div>

                        <button type="button" className="btn btn-dark btn-lg btn-block" onClick={doimatkhau}>Đăng nhập</button>
                        <p className="forgot-password text-right">
                            không muốn thay đổi, quay về trang chủ <Link to="/">tại đây</Link>
                        </p>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )

}
export default ThayDoiMatKhau;