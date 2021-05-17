import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ThongTinTongQuan from '../AdMin/ThongTinTongQuan'
import QuanLyBaiDang from '../AdMin/QuanLyBaiDang'
import QuanLyDanhGia from '../AdMin/QuanLyDanhGia'
import QuanLyUser from '../AdMin/QuanLyUser'
import Khongtimthay from '../Pages/Khongtimthay'
import './pages.css';

function AdMin() {
    const [User, setUser] = useState([]);
    useEffect(() => {
        document.title ='Trang quản lý website';
        loadData()
    },[])

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

    if (localStorage.getItem("token") && (User.VaiTro === "admin")){
        return (
            <div className="row" style={{backgroundColor:"#f8f9fa"}}>
                <div className="col-3">
                    <div className="nav1 nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
                        <a className="nav-link" data-toggle="pill" href="#thongtintongquan">
                            <span className="icon"><i className="fa fa-dashboard" aria-hidden="true"></i></span>
                            <span className="title">QUẢN LÝ WEBSITE</span>
                        </a>
                        <a className="nav-link" data-toggle="pill" href="#quanlynguoidung" >
                            <span className="icon"><i className="fa fa-user-secret" aria-hidden="true"></i></span>
                            <span className="title">Quản lý người dùng</span>
                        </a>
                        <a className="nav-link" data-toggle="pill" href="#quanlyphongtro">
                            <span className="icon"><i className="fa fa-paste" aria-hidden="true"></i></span>
                            <span className="title">Quản lý bài đăng</span>
                        </a>
                        <a className="nav-link" data-toggle="pill" href="#quanlydanhgia">
                            <span className="icon"><i className="fa fa-comments" aria-hidden="true"></i></span>
                            <span className="title">Quản lý đánh giá</span>
                        </a>
                        <Link className="nav-link" target='_blank' to="/">
                            <span className="icon"><i className="fa fa-eye" aria-hidden="true"></i></span>
                            <span className="title">Xem Website</span>
                        </Link>
                        <a className="nav-link" data-toggle="pill" href="/#" onClick={dangxuat} >
                            <span className="icon"><i className="fa fa-comments" aria-hidden="true"></i></span>
                            <span className="title">Đăng xuất</span>
                        </a>
                    </div>
                </div>
                <div className="col-9">
                    {/* <ThongTinTongQuan /> */}
                    <div className="tab-content1 tab-content" id="v-pills-tabContent">
                        <div  className="tab-pane fade show active" id="thongtintongquan" role="tabpanel" aria-labelledby="quanlynguoidung-tab">
                            <ThongTinTongQuan />
                        </div>
    
                        <div className="tab-pane fade" id="quanlynguoidung" role="tabpanel" aria-labelledby="quanlynguoidung-tab">
                            <QuanLyUser />
                        </div>
                        <div className="tab-pane fade" id="quanlyphongtro" role="tabpanel" aria-labelledby="quanlyphongtro-tab">
                            <QuanLyBaiDang />
                        </div>
                        <div className="tab-pane fade" id="quanlydanhgia" role="tabpanel" aria-labelledby="quanlydanhgia-tab">
                            <QuanLyDanhGia />
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return(
            <Khongtimthay  />
        )
    }
    
}
export default AdMin