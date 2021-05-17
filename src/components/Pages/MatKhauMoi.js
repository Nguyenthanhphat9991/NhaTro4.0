import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../TrangChu/Navbar';
import Footer from '../TrangChu/Footer';
import './pages.css';
import { useParams } from 'react-router-dom';

function MatKhauMoi() {
    useEffect(() => {
        document.title = 'Đổi mật khẩu';
    })

    const { id } = useParams()

    const [MatKhauMoi, setMatKhauMoi] = useState("");
    const [NhapLaiMatKhauMoi, setNhapLaiMatKhauMoi] = useState("");

    const [errorMatKhauMoi, seterrorMatKhauMoi] = useState("");
    const [errorNhapLaiMatKhauMoi, setsetNhapLaiMatKhauMoi] = useState("");



    function CapNhatMatKhauMoi() {
        const MatKhau = MatKhauMoi
        let url = `http://phatnguyen.nikinpham.com/be/public/index.php/api/user/thaydoimatkhau/${id}`;
        let data = { MatKhau }
        // console.log(data)
        if (!MatKhauMoi && !NhapLaiMatKhauMoi) {
            alert("Vui lòng điền thông tin trước khi thay đổi mật khẩu")
        } else if (!MatKhauMoi) {
            seterrorMatKhauMoi("Bạn vui lòng nhập mật khẩu mới vào")
            setsetNhapLaiMatKhauMoi("")
        } else if (MatKhauMoi.length < 8) {
            seterrorMatKhauMoi("Mật khẩu có độ dài từ 8 kí tự trở lên")
            setsetNhapLaiMatKhauMoi("")
        } else if (MatKhauMoi !== NhapLaiMatKhauMoi) {
            seterrorMatKhauMoi("Mật khẩu phải trùng nhau")
            setsetNhapLaiMatKhauMoi("Mật khẩu phải trùng nhau")
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
    return (
        <>
            <Navbar />
            <div className="outer">
                <div className="inner mt-3 mb-3 pt-3 pb-3" style={{ width: "30rem" }}>
                    <form>
                        <h3>Thay đổi mật khẩu</h3>

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

                        <button type="button" className="btn btn-dark btn-lg btn-block" onClick={CapNhatMatKhauMoi}>Thay đổi mật khẩu</button>
                        <p className="forgot-password text-right">
                            Bạn không muốn đổi mật khẩu. Quay về trang chủ <Link to="/">tại đây</Link>
                        </p>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )

}
export default MatKhauMoi;