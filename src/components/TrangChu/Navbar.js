import logo from '../../logo.svg';
import { Link } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Navbar() {

    const [User, setUser] = useState([]);

    useEffect(() => {
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

    function dangxuat() {
        localStorage.removeItem("token")
        alert("đăng xuất thành công")
        window.location = '/dangnhap';
    }

    function dangtinmienphi() {
        if (localStorage.getItem("token")) {
            window.location = '/dangtinmienphi';
        } else {
            if (window.confirm('Để đăng tin bạn cần đăng nhập, bạn có muốn đăng nhập?')) {
                window.location = '/dangnhap';
            }
            else {
                window.location = '/';
            }
        }
    }

    if (localStorage.getItem("token") && (User.VaiTro !== "admin")) {
        return (
            <nav id="trangchu" style={{
                backgroundColor: "#EE6E73"
            }}
                className="navbar navbar-expand-lg navbar-light bg-dark" >
                <Link className="navbar-brand ml-5" to="/">
                    <img src={logo} alt="logo" style={{ width: '35px' }} />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span>
                        <i className="fa fa-bars" style={{ color: '#fff' }}></i>
                    </span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto">
                        <li className="nav-item active">
                            <Link className="nav-link text-white text-uppercase ml-5" to="/">trang chủ &nbsp;<i className="fa fa-home"></i><span className="sr-only"></span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white text-uppercase ml-5" to="/dangtinmienphi">đăng tin miễn phí</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white text-uppercase ml-5" to="/danhmucchothue">danh mục cho thuê</Link>
                        </li>
                    </ul>
                    <div className="nav-link dropdown text-white text-uppercase mr-5">
                        <button
                            style={{
                                backgroundColor: "transparent",
                                borderColor: "transparent"
                            }}
                            className="btn btn-outline-secondary dropdown-toggle text-uppercase mr-5"
                            type="button" id="dropdownMenu2" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            <img className="rounded-circle"
                                src={User.HinhDaiDien} alt="" style={{ width: '35px' }} />&nbsp;
                                {User.HoVaTen}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <Link to={{ pathname: `/thaydoimatkhau/${User.UserID}`, query: { id: User.UserID } }} className="dropdown-item text-uppercase" type="button">Đổi mật khẩu</Link>
                            <Link to={{ pathname: `/thongtincanhan/${User.UserID}`, query: { id: User.UserID } }} className="dropdown-item text-uppercase" type="button">Thông tin cá nhân</Link>

                            <button className="dropdown-item text-uppercase" type="button" onClick={dangxuat}>đăng xuất</button>
                        </div>
                    </div>
                </div>
            </nav>
        )
    } else if (localStorage.getItem("token") && (User.VaiTro === "admin")) {
        return (
            <nav id="trangchu" style={{
                backgroundColor: "#EE6E73"
            }}
                className="navbar navbar-expand-lg navbar-light bg-dark " >
                <Link className="navbar-brand ml-5" to="/">
                    <img src={logo} alt="logo" style={{ width: '35px' }} />
                </Link>
                <button className="navbar-toggler"
                    type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span>
                        <i className="fa fa-bars" style={{ color: '#fff' }}></i>
                    </span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto">
                        <li className="nav-item active">
                            <Link className="nav-link text-white text-uppercase ml-5" to="/">trang chủ &nbsp;<i className="fa fa-home"></i><span className="sr-only"></span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white text-uppercase ml-5" to="/#" onClick={dangtinmienphi} >đăng tin miễn phí</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white text-uppercase ml-5" to="/danhmucchothue">danh mục cho thuê</Link>
                        </li>
                    </ul>
                    <div className=" nav-link dropdown text-white text-uppercase ml-5 mr-5">

                        <button
                            style={{
                                backgroundColor: "transparent",
                                borderColor: "transparent"
                            }}
                            className="btn btn-outline-secondary dropdown-toggle text-uppercase mr-5"
                            type="button" id="dropdownMenu2" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            <img className="rounded-circle"
                                src={User.HinhDaiDien} alt="" style={{ width: '35px' }} />&nbsp;
                                {User.HoVaTen}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <Link to={{ pathname: `/thaydoimatkhau/${User.UserID}`, query: { id: User.UserID } }} className="dropdown-item text-uppercase" type="button">Đổi mật khẩu</Link>
                            <Link to={{ pathname: `/thongtincanhan/${User.UserID}`, query: { id: User.UserID } }} className="dropdown-item text-uppercase" type="button">Thông tin cá nhân</Link>
                            <Link to="/admin" className="dropdown-item text-uppercase">đến trang quản lý</Link>
                            <button className="dropdown-item text-uppercase" type="button" onClick={dangxuat}>đăng xuất</button>
                        </div>
                    </div>
                </div>
            </nav>
        )
    } else {
        return (
            <nav id="trangchu" style={{
                backgroundColor: "#EE6E73"
            }}
                className="navbar navbar-expand-lg navbar-light bg-dark" >
                <Link className="navbar-brand ml-5" to="/">
                    <img src={logo} alt="logo" style={{ width: '35px' }} />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span>
                        <i className="fa fa-bars" style={{ color: '#fff' }}></i>
                    </span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto">
                        <li className="nav-item active">
                            <Link className="nav-link text-white text-uppercase ml-5" to="/">trang chủ &nbsp;<i className="fa fa-home"></i><span className="sr-only"></span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white text-uppercase ml-5" to="/#" onClick={dangtinmienphi} >đăng tin miễn phí</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white text-uppercase ml-5" to="/danhmucchothue">danh mục cho thuê</Link>
                        </li>
                    </ul>
                    <Link to="/dangky" className="nav-link text-white text-uppercase ml-5">đăng kí</Link>
                    <Link to="/dangnhap" className="nav-link text-white text-uppercase ml-5">đăng nhập</Link>
                </div>
            </nav>
        )
    }
}
export default Navbar;
