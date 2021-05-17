import React, { useEffect, useState } from 'react';
import Navbar from '../TrangChu/Navbar';
import Footer from '../TrangChu/Footer';
function QuenMatKhau() {

    useEffect(() => {
        document.title = 'Quên mật khẩu';
    })

    const [KiemTraEmail, setKiemTraEmail] = useState("")

    // const [UserID, setUserID] = useState("");

    const [Email, setEmail] = useState("");
    const [CauTraLoi, setCauTraLoi] = useState("");

    const [erroEmail, seterrorEmail] = useState("");
    const [errorCauTraLoi, seterrorCauTraLoi] = useState("");


    function checkEmail() {
        let url = 'http://phatnguyen.nikinpham.com/be/public/index.php/api/user/cauhoibimat';
        let data = { Email };
        // console.log(data)
        var filter = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!Email) {
            seterrorEmail("Không để trống email")
        } else if (!filter.test(Email)) {
            seterrorEmail("Định dạng email không đúng!!!")
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
                        // console.warn("response: ", response)
                        setKiemTraEmail(response)
                    })
            })
        }
    }

    function kiemtracauhoi() {
        const id = KiemTraEmail.UserID
        // console.log(CauTraLoi, id)
        if (!CauTraLoi) {
            seterrorCauTraLoi("Vui lòng nhập câu trả lời để hệ thống kiểm tra")
        } else {
            if (CauTraLoi === KiemTraEmail.CauHoiBiMat) {
                alert("Trả lời chính xác")
                window.location = `/matkhaumoi/${id}`;
            } else {
                seterrorCauTraLoi("")
                alert("Trả lời không chính xác, bạn vui lòng thử lại!!!")
            }
        }
    }


    return (
        <>
            <Navbar />
            <div className="outer">
                <div className="inner mt-3 mb-3 pt-3 pb-3" style={{ width: "50rem" }}>
                    <form>
                        <div className="main-content">
                            <div className="header">
                                <h3 style={{ textAlign: "center" }}><strong>Quên mật khẩu.</strong></h3><hr />
                            </div>
                        </div>

                        <div className="form-group mb-5">
                            <label>Nhập email của bạn:</label>
                            <input style={{ width: "60%" }} type="text" className="form-control" placeholder="nhập email của bạn"
                                value={Email} name="Email"
                                onChange={(data) => { setEmail(data.target.value) }}
                            />
                            <span className="text-danger" style={{ fontSize: "15px" }} >{erroEmail}</span>
                            <button onClick={checkEmail}
                                style={{ float: "right" }}
                                type="button"
                                className="btn btn-primary mt-2" >Kiểm tra Email</button>
                        </div>
                        {
                            KiemTraEmail.status === 200
                                ?
                                <>
                                    <hr />
                                    <div className="form-group mt-5">
                                        <pre className="text">Thú cưng bạn đã từng nuôi?</pre>
                                        <label>Nhập câu trả lời của bạn của bạn</label>
                                        <input type="text"
                                            className="form-control"
                                            placeholder="Điền câu trả lời của bạn vào đây..."
                                            value={CauTraLoi} name="CauTraLoi"
                                            onChange={(data) => { setCauTraLoi(data.target.value) }} />
                                        <span className="text-danger" style={{ fontSize: "15px" }} >{errorCauTraLoi}</span>
                                        <button
                                            style={{ float: "right" }}
                                            type="button"
                                            className="btn btn-primary mt-2" onClick={kiemtracauhoi}>Kiểm tra câu hỏi</button>
                                    </div><br />

                                </>
                                : KiemTraEmail.message
                        }
                        <a className="mt-5" style={{ textDecoration: "none", float: "right", color: "#187FAB" }} data-toggle="tooltip"
                            title="đăng nhập" href="/dangnhap">
                            Quay lại trang đăng nhập
                </a>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default QuenMatKhau;