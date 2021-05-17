import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuanLyCacBaiViet from './QuanLyCacBaiViet'
import './css.css';

function ThongTinCaNhan() {

    const [HinhAnh, setHinhAnh] = useState("");
    const [imageUrl, setUrl] = useState();
    const imageRef = React.useRef();


    const [HoVaTen, setHoVaTen] = useState("");
    const [SoDienThoai, setSoDienThoai] = useState("");
    const [setEmail] = useState("");
    const [MatKhauHienTai, setMatKhauHienTai] = useState("");

    const [MatKhauMoi] = useState("");
    const [NhapLaiMatKhauMoi] = useState("");

    const [errorHoVaTen] = useState("");

    const [errorSoDienThoai, seterrorSoDienThoai] = useState("");
    const [errorHinhAnh] = useState("");
    const [errorMatKhauHienTai, seterrorMatKhauHienTai] = useState("");

    const [ThongBao, setThongBao] = useState("");

    const [User, setUser] = useState([]);
    const [UserInfo, setUserInfo] = useState([]);


    useEffect(() => {
        loadData()
        get_User()
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
                    // // console.log(err)
                }
            )
    }

    async function get_User() {
        const urlUser = `http://phatnguyen.nikinpham.com/be/public/index.php/api/user/selectone/${User}`;
        await axios.get(urlUser)
            .then(response => {
                setUserInfo(response.data)
            })
    }

    function HienThiHinhAnh() {
        const [result, setResult] = React.useState(UserInfo.HinhDaiDien);
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
        setHinhAnh(data.target.value);
        const fd = new FormData();
        fd.append("image", data.target.files[0]);
        // // console.log(data.target.files[0])
        axios.post("http://phatnguyen.nikinpham.com/be/imageAvatar.php", fd).then((res) => {
            // console.log(res);
        });
        const url =
            "http://phatnguyen.nikinpham.com/be/img/" + data.target.files[0].name;
        // console.log("url: ", url);
        setUrl(url);
    }

    function submit() {
        const hovaten = UserInfo.HoVaTen
        const sodienthoai = UserInfo.SoDienThoai

        const hinhdaidien = UserInfo.HinhDaiDien
        const matkhau = UserInfo.MatKhau

        const HinhAnh = imageUrl;
        const matkhauhientai = UserInfo.MatKhau

        // console.log(HoVaTen, SoDienThoai, MatKhauMoi, NhapLaiMatKhauMoi, HinhAnh)

        if (!HoVaTen && !MatKhauMoi && !SoDienThoai && !HinhAnh && !NhapLaiMatKhauMoi) {
            alert("Vui lòng điền đầy đủ thông tin trước khi cập nhật")
        } else if (!HoVaTen && !SoDienThoai && !HinhAnh) {
            const hinhdaidien = UserInfo.HinhDaiDien
            // const id = 1
            let urlUpdate = `http://phatnguyen.nikinpham.com/be/public/index.php/api/user/update_to_profile/${User}`;
            const MatKhau = MatKhauMoi;
            const HinhDaiDien = hinhdaidien;
            const HoVaTen = hovaten;
            const SoDienThoai = sodienthoai;
            let data = { HoVaTen, MatKhau, SoDienThoai, HinhDaiDien };
            if (MatKhauHienTai !== matkhauhientai) {
                const checkMatKhauHienTai = "Mật khẩu không đúng!!!";
                seterrorMatKhauHienTai(checkMatKhauHienTai)
            } else {
                fetch(urlUpdate, {
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
                            alert("Thay đổi thành công")
                            window.location.reload();
                        })
                })
            }

        } else if (!HoVaTen && !SoDienThoai && !MatKhauMoi && !NhapLaiMatKhauMoi) {
            // const id = 1
            let urlUpdate = `http://phatnguyen.nikinpham.com/be/public/index.php/api/user/update_to_profile/${User}`;
            const MatKhau = matkhau;
            const HinhDaiDien = imageUrl;
            const HoVaTen = hovaten;
            const SoDienThoai = sodienthoai;
            let data = { HoVaTen, MatKhau, SoDienThoai, HinhDaiDien };
            if (MatKhauHienTai !== matkhauhientai) {
                const checkMatKhauHienTai = "Mật khẩu không đúng!!!";
                seterrorMatKhauHienTai(checkMatKhauHienTai)
            } else {
                fetch(urlUpdate, {
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
                            alert("Thay đổi thành công")
                            window.location.reload();
                        })
                })
            }
        } else if (!HoVaTen && !HinhAnh && !MatKhauMoi && !NhapLaiMatKhauMoi) {
            // const id = 1
            let urlUpdate = `http://phatnguyen.nikinpham.com/be/public/index.php/api/user/update_to_profile/${User}`;
            const MatKhau = UserInfo.MatKhau;
            const HinhDaiDien = hinhdaidien;
            const HoVaTen = hovaten;
            let data = { HoVaTen, MatKhau, SoDienThoai, HinhDaiDien };
            if (SoDienThoai.length !== 10) {
                const checksodienthoai = "Số điện thoại phải chứa 10 chữ số"
                seterrorSoDienThoai(checksodienthoai)
            } else if (MatKhauHienTai !== matkhauhientai) {
                const checkMatKhauHienTai = "Mật khẩu không đúng!!!";
                seterrorMatKhauHienTai(checkMatKhauHienTai)
            } else {
                fetch(urlUpdate, {
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
                            alert("Thay đổi thành công")
                            window.location.reload();
                        })
                })
            }
        } else if (!SoDienThoai && !MatKhauMoi && !NhapLaiMatKhauMoi && !HinhAnh) {
            let urlUpdate = `http://phatnguyen.nikinpham.com/be/public/index.php/api/user/update_to_profile/${User}`;
            const MatKhau = UserInfo.MatKhau;
            const HinhDaiDien = hinhdaidien;
            // const HoVaTen = hovaten;
            const SoDienThoai = sodienthoai;
            let data = { HoVaTen, MatKhau, SoDienThoai, HinhDaiDien };
            if (MatKhauHienTai !== matkhauhientai) {
                const checkMatKhauHienTai = "Mật khẩu không đúng!!!";
                seterrorMatKhauHienTai(checkMatKhauHienTai)
            } else {
                fetch(urlUpdate, {
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
                            alert("Thay đổi thành công")
                            window.location.reload();
                        })
                })
            }
        } else if (!HoVaTen && !HinhAnh) {
            const hinhdaidien = UserInfo.HinhDaiDien
            // const id = 1
            let urlUpdate = `http://phatnguyen.nikinpham.com/be/public/index.php/api/user/update_to_profile/${User}`;
            const MatKhau = MatKhauMoi;
            const HinhDaiDien = hinhdaidien;
            const HoVaTen = hovaten;
            let data = { HoVaTen, MatKhau, SoDienThoai, HinhDaiDien };
            if (SoDienThoai.length !== 10) {
                const checksodienthoai = "Số điện thoại phải chứa 10 chữ số"
                seterrorSoDienThoai(checksodienthoai)
            } else if (MatKhauHienTai !== matkhauhientai) {
                const checkMatKhauHienTai = "Mật khẩu không đúng!!!";
                seterrorMatKhauHienTai(checkMatKhauHienTai)
            } else {
                fetch(urlUpdate, {
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
                            alert("Thay đổi thành công")
                            window.location.reload();
                        })
                })
            }
        } else if (!HoVaTen && !SoDienThoai) {
            // const id = 1
            let urlUpdate = `http://phatnguyen.nikinpham.com/be/public/index.php/api/user/update_to_profile/${User}`;
            const MatKhau = MatKhauMoi;
            const SoDienThoai = sodienthoai;
            const HinhDaiDien = HinhAnh;
            const HoVaTen = hovaten;
            let data = { HoVaTen, MatKhau, SoDienThoai, HinhDaiDien };
            if (MatKhauHienTai !== matkhauhientai) {
                const checkMatKhauHienTai = "Mật khẩu không đúng!!!";
                seterrorMatKhauHienTai(checkMatKhauHienTai)
            } else {
                fetch(urlUpdate, {
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
                            alert("Thay đổi thành công")
                            window.location.reload();
                        })
                })
            }
        } else if (!HoVaTen && !MatKhauMoi && !NhapLaiMatKhauMoi) {
            // const id = 1
            let urlUpdate = `http://phatnguyen.nikinpham.com/be/public/index.php/api/user/update_to_profile/${User}`;
            const MatKhau = UserInfo.MatKhau;
            const HoVaTen = hovaten;
            const HinhDaiDien = imageUrl;
            // const SoDienThoai = sodienthoai;
            let data = { HoVaTen, MatKhau, SoDienThoai, HinhDaiDien };
            // console.log(data)
            if (SoDienThoai.length !== 10) {
                const checksodienthoai = "Số điện thoại phải chứa 10 chữ số"
                seterrorSoDienThoai(checksodienthoai)
            } else if (MatKhauHienTai !== matkhauhientai) {
                const checkMatKhauHienTai = "Mật khẩu không đúng!!!";
                seterrorMatKhauHienTai(checkMatKhauHienTai)
            } else {
                fetch(urlUpdate, {
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
                            alert("Thay đổi thành công")
                            window.location.reload();
                        })
                })
            }
        } else if (!SoDienThoai && !HinhAnh) {
            // const id = 1
            let urlUpdate = `http://phatnguyen.nikinpham.com/be/public/index.php/api/user/update_to_profile/${User}`;
            const MatKhau = MatKhauMoi;
            const HinhDaiDien = hinhdaidien;
            const SoDienThoai = sodienthoai;
            // HinhDaiDien = hinhdaidien
            let data = { HoVaTen, MatKhau, SoDienThoai, HinhDaiDien };
            // console.log(data)
            if (MatKhauHienTai !== matkhauhientai) {
                const checkMatKhauHienTai = "Mật khẩu không đúng!!!";
                seterrorMatKhauHienTai(checkMatKhauHienTai)
            } else {
                fetch(urlUpdate, {
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
                            alert("Thay đổi thành công")
                            window.location.reload();
                        })
                })
            }
        } else if (!SoDienThoai && !MatKhauMoi && !NhapLaiMatKhauMoi) {
            let urlUpdate = `http://phatnguyen.nikinpham.com/be/public/index.php/api/user/update_to_profile/${User}`;
            const MatKhau = matkhau;
            const SoDienThoai = sodienthoai;
            const HinhDaiDien = imageUrl;
            // const HoVaTen = hovaten;
            let data = { HoVaTen, MatKhau, SoDienThoai, HinhDaiDien };
            // console.log(data)
            if (MatKhauHienTai !== matkhauhientai) {
                const checkMatKhauHienTai = "Mật khẩu không đúng!!!";
                seterrorMatKhauHienTai(checkMatKhauHienTai)
            } else {
                fetch(urlUpdate, {
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
                            alert("Thay đổi thành công")
                            window.location.reload();
                        })
                })
            }
        } else if (!HinhAnh && !MatKhauMoi & !NhapLaiMatKhauMoi) {
            // const id = 1
            let urlUpdate = `http://phatnguyen.nikinpham.com/be/public/index.php/api/user/update_to_profile/${User}`;
            const MatKhau = UserInfo.MatKhau;
            const HinhDaiDien = hinhdaidien;
            // const HoVaTen = hovaten;
            let data = { HoVaTen, MatKhau, SoDienThoai, HinhDaiDien };
            // console.log(data)
            if (SoDienThoai.length !== 10) {
                const checksodienthoai = "Số điện thoại phải chứa 10 chữ số"
                seterrorSoDienThoai(checksodienthoai)
            } else if (MatKhauHienTai !== matkhauhientai) {
                const checkMatKhauHienTai = "Mật khẩu không đúng!!!";
                seterrorMatKhauHienTai(checkMatKhauHienTai)
            } else {
                fetch(urlUpdate, {
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
                            alert("Thay đổi thành công")
                            window.location.reload();
                        })
                })
            }
        } else if (!HoVaTen) {
            // const id = 1
            let urlUpdate = `http://phatnguyen.nikinpham.com/be/public/index.php/api/user/update_to_profile/${User}`;
            const MatKhau = MatKhauMoi;
            const HinhDaiDien = imageUrl;
            const HoVaTen = hovaten;
            let data = { HoVaTen, MatKhau, SoDienThoai, HinhDaiDien };
            // console.log(data)
            if (SoDienThoai.length !== 10) {
                const checksodienthoai = "Số điện thoại phải chứa 10 chữ số"
                seterrorSoDienThoai(checksodienthoai)
            } else if (MatKhauHienTai !== matkhauhientai) {
                const checkMatKhauHienTai = "Mật khẩu không đúng!!!";
                seterrorMatKhauHienTai(checkMatKhauHienTai)
            } else{
                fetch(urlUpdate, {
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
                            alert("Thay đổi thành công")
                            window.location.reload();
                        })
                })
            }
        } else if (!SoDienThoai) {
            // const id = 1
            let urlUpdate = `http://phatnguyen.nikinpham.com/be/public/index.php/api/user/update_to_profile/${User}`;
            const MatKhau = MatKhauMoi;
            const HinhDaiDien = imageUrl;
            // const HoVaTen = hovaten;
            const SoDienThoai = sodienthoai;
            let data = { HoVaTen, MatKhau, SoDienThoai, HinhDaiDien };
            // console.log(data)
            if (MatKhauHienTai !== matkhauhientai) {
                const checkMatKhauHienTai = "Mật khẩu không đúng!!!";
                seterrorMatKhauHienTai(checkMatKhauHienTai)
            } else {
                fetch(urlUpdate, {
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
                            alert("Thay đổi thành công")
                            window.location.reload();
                        })
                })
            }
        } else if (!MatKhauMoi) {
            // const id = 1
            let urlUpdate = `http://phatnguyen.nikinpham.com/be/public/index.php/api/user/update_to_profile/${User}`;
            const MatKhau = matkhau;
            const HinhDaiDien = imageUrl;
            // const HoVaTen = hovaten;
            // const SoDienThoai = sodienthoai;
            let data = { HoVaTen, MatKhau, SoDienThoai, HinhDaiDien };
            // console.log(data)
            if (SoDienThoai.length !== 10) {
                const checksodienthoai = "Số điện thoại phải chứa 10 chữ số"
                seterrorSoDienThoai(checksodienthoai)
            } else if (MatKhauHienTai !== matkhauhientai) {
                const checkMatKhauHienTai = "Mật khẩu không đúng!!!";
                seterrorMatKhauHienTai(checkMatKhauHienTai)
            } else {
                fetch(urlUpdate, {
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
                            alert("Thay đổi thành công")
                            window.location.reload();
                        })
                })
            }
        } else if (!HinhAnh) {
            // const id = 1
            let urlUpdate = `http://phatnguyen.nikinpham.com/be/public/index.php/api/user/update_to_profile/${User}`;
            const MatKhau = MatKhauMoi;
            const HinhDaiDien = hinhdaidien;
            let data = { HoVaTen, MatKhau, SoDienThoai, HinhDaiDien };
            // console.log(data)
            if (SoDienThoai.length !== 10) {
                const checksodienthoai = "Số điện thoại phải chứa 10 chữ số"
                seterrorSoDienThoai(checksodienthoai)
            } else if (MatKhauHienTai !== matkhauhientai) {
                const checkMatKhauHienTai = "Mật khẩu không đúng!!!";
                seterrorMatKhauHienTai(checkMatKhauHienTai)
            } else {
                fetch(urlUpdate, {
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
                            alert("Thay đổi thành công")
                            window.location.reload();
                        })
                })
            }
        } else {
            let urlUpdate = `http://phatnguyen.nikinpham.com/be/public/index.php/api/user/update_to_profile/${User}`;
            // console.log(urlUpdate)
            const MatKhau = MatKhauMoi;
            const HinhDaiDien = HinhAnh;
            let data = { HoVaTen, MatKhau, SoDienThoai, HinhDaiDien };
            if (MatKhauHienTai !== matkhauhientai) {
                const checkMatKhauHienTai = "Mật khẩu không đúng!!!";
                seterrorMatKhauHienTai(checkMatKhauHienTai)
            } else {
                fetch(urlUpdate, {
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
                            alert("Thay đổi thành công")
                            window.location.reload();
                        })
                })
            }
        }
    }

    function hienThongBao() {
        const mess = "Nếu không muốn thay đổi dữ liệu có thể để trống hoặc nhập lại thông tin cũ"
        setThongBao(mess)
    }
    function anThongBao() {
        const mess = null
        setThongBao(mess)
    }
    return (<>
        <div className="row">
            <div className="col-sm-4 img-thumbnail">
                <div>
                    <img
                        className="img-thumbnail"
                        style={{ width: "220px", height: "220px" }}
                        ref={imageRef}
                        src={UserInfo.HinhDaiDien}
                        alt=""
                    />
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
                        value={HinhAnh}
                        onChange={(data) => {
                            setHinhAnh(data.target.value);
                            uploader(data);
                            fileSelect(data);
                        }} />
                    <span>
                        <label htmlFor="files"><i className="fa fa-camera"></i> &nbsp;Thay đổi hình đại diện</label>
                    </span> <br />
                    <span className="text-danger">{errorHinhAnh}</span>
                </div>
                <ul className="list-group">
                    <li className="list-group-item text-muted">Thông tin cá nhân &nbsp;<i className="fa fa-info-circle"></i></li>
                    <li className="list-group-item text-right"><span className="pull-left"><strong>Họ và tên</strong></span>{UserInfo.HoVaTen}</li>
                    <li className="list-group-item text-right"><span className="pull-left"><strong>Số điện thoại</strong></span>{UserInfo.SoDienThoai}</li>
                    <li className="list-group-item text-right"><span className="pull-left"><strong>Email liên hệ</strong></span>{UserInfo.Email}</li>
                </ul>
            </div>
            <div className="pl-2 col-sm-8 img-thumbnail">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" href="#thaydoithongtin">Thay đổi thông tin cá nhân</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#quanlybaidang">Quản lý các bài đăng</a>
                    </li>
                </ul>
                <div className="tab-content" >
                    <div id="thaydoithongtin" className="container tab-pane active text-left mt-2">
                        <form className="form">
                            <div onMouseMove={hienThongBao} onMouseLeave={anThongBao} className="float-right"><span><i className="fa fa-warning text-warning"></i></span>&nbsp;
                                <span className="text-info">{ThongBao}</span>
                            </div>
                            <div className="form-group">
                                <div className="col-xs-12">
                                    <label><h4>Họ và Tên</h4></label>
                                    <input type="text"
                                        className="form-control"
                                        id="HoVaTen"
                                        placeholder="Thay đổi họ và tên"
                                        name="HoVaTen" value={HoVaTen}
                                        onChange={(data) => { setHoVaTen(data.target.value) }}
                                    />
                                    <span className="text-danger">{errorHoVaTen}</span>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-xs-12">
                                    <label><h4>Số điện thoại</h4></label>
                                    <input type="text" className="form-control"
                                        id="SoDienThoai" placeholder="Thay đổi số điện thoại"
                                        name="SoDienThoai" value={SoDienThoai}
                                        onChange={(data) => { setSoDienThoai(data.target.value) }}
                                    />
                                    <span className="text-danger">{errorSoDienThoai}</span>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-xs-12">
                                    <label><h4>Email</h4></label>
                                    <input type="email" className="form-control" id="Email" placeholder="Email của bạn"
                                        value={UserInfo.Email} name="Email" disabled
                                        onChange={(data) => { setEmail(data.target.value) }}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-xs-12">
                                    <label><h4>Mật khẩu hiện tại</h4></label>
                                    <input type="password" className="form-control" name="MatKhauHienTai" id="MatKhauHienTai" placeholder="Nhập mật khẩu hiện tại"
                                        value={MatKhauHienTai}
                                        onChange={(data) => { setMatKhauHienTai(data.target.value) }}
                                    />
                                    <span className="text-danger">{errorMatKhauHienTai}</span>
                                </div>
                            </div>
                            {/* <div className="form-group">
                                <div className="col-xs-12">
                                    <label><h4>Mật khẩu</h4></label>
                                    <input type="password" className="form-control" name="MatKhauMoi" id="MatKhauMoi" placeholder="nhập mật khẩu"
                                        value={MatKhauMoi}
                                        onChange={(data) => { setMatKhauMoi(data.target.value) }}
                                    />
                                    <span className="text-danger">{errorMatKhauMoi}</span>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-xs-12">
                                    <label><h4>Nhập lại mật khẩu</h4></label>
                                    <input type="password" className="form-control" name="NhapLaiMatKhauMoi" id="NhapLaiMatKhauMoi" placeholder="nhập lại mật khẩu"
                                        value={NhapLaiMatKhauMoi}
                                        onChange={(data) => { setNhapLaiMatKhauMoi(data.target.value) }}
                                    />
                                    <span className="text-danger">{errorNhapLaiMatKhauMoi}</span>
                                </div>
                            </div> */}

                            <div className="form-group">
                                <div className="col-xs-6">
                                    <button onClick={submit} className="btn btn-lg btn-success pull-right" type="button"><i className="fa fa-save"></i> &nbsp; Lưu thông tin</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div id="quanlybaidang" className="container tab-pane fade mt-2">
                        <h3><QuanLyCacBaiViet /></h3>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default ThongTinCaNhan
