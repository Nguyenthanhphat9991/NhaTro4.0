import './admin.css';
import React, { useEffect, useState } from 'react';
import avatar from '../Image/avatar.jpeg'
function ThongTinTongQuan() {
    const [soLuongUser, setSoLuongUser] = useState([])
    const [soLuongBaiViet, setSoLuongBaiViet] = useState([])
    const [soLuongDanhGia, setSoLuongDanhGia] = useState([])


    useEffect(() => {
        SoluongNguoiDung()
        SoluongBaiViet()
        SoLuongDanhGia()
    }, [])


    async function SoluongNguoiDung() {
        try {
            const res = await fetch(`http://phatnguyen.nikinpham.com/be/public/index.php/api/user/soluongthanhvien`);
            const jsonNguoiDung = await res.json();
            setSoLuongUser(jsonNguoiDung[0].UserID)
        } catch (err) {
            // console.error('err', err);
        }
    }

    async function SoluongBaiViet() {
        try {
            const res = await fetch(`http://phatnguyen.nikinpham.com/be/public/index.php/api/phongtro/soluongbaiviet`);
            const jsonBaiViet = await res.json();
            setSoLuongBaiViet(jsonBaiViet[0].PhongTroID)
        } catch (err) {
            // console.error('err', err);
        }
    }

    async function SoLuongDanhGia() {
        try {
            const res = await fetch(`http://phatnguyen.nikinpham.com/be/public/index.php/api/baocao/soluongdanhgia`);
            const jsonDanhGia = await res.json();
            setSoLuongDanhGia(jsonDanhGia[0].BaoCaoID)
        } catch (err) {
            // console.error('err', err);
        }
    }
    const ViewThongTinTongQuan = () => {
        return (
            <>
                <div className="card-group mt-2 mr-4 ">
                    <div className="card ml-2 bg-info text-white">
                        <a href="/#">
                            <div className="card-body">
                                <h5 className="card-title">Số lượng người dùng</h5>
                                <p className="card-text">Số lượng thành viên đã tham gia vào hệ thống (kể cả người dùng và quản trị viên)</p>
                            </div>
                            <div className="card-footer">
                                <small>Số lượng: <strong>{soLuongUser}</strong></small>
                            </div>
                        </a>
                    </div>
                    <div className="card ml-2 bg-secondary text-white">
                        <div className="card-body">
                            <h5 className="card-title">Số lượng phòng trọ</h5>
                            <p className="card-text">Số lượng phòng trọ hiện có trên hệ thống (kể cả còn phòng và hết phòng)</p>
                        </div>
                        <div className="card-footer">
                            <small>Số lượng: <strong>{soLuongBaiViet}</strong></small>
                        </div>
                    </div>
                    <div className="card ml-2 mr-2  bg-warning text-white">
                        <div className="card-body">
                            <h5 className="card-title">Số lượng đánh giá</h5>
                            <p className="card-text">Số lượng nội dung đã đánh giá vào cho hệ thống</p>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">Số lượng: <strong>{soLuongDanhGia}</strong></small>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const TopNguoiDangBai = () => {
        return (
            <>
                <div className="orders mt-5">
                    <div className="row" style={{ backgroundColor: "#fff" }}>
                        <div className="col-8">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="box-title">Top 4 nguowif cos baif dang nhieeuf nhaat </h4>
                                </div>
                                <div className="card-body">
                                    <table className="table table-hover">
                                        <thead className="thead-light">
                                            <tr>
                                                <th scope="col">STT</th>
                                                <th scope="col">Hinh dai Dien</th>
                                                <th scope="col">Ho Va Ten</th>
                                                <th scope="col">So luong Bai Dang</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="serial">1.</td>
                                                <td className="avatar">
                                                    <div className="round-img justify-content-center">
                                                        <a href="/#"><img style={{ width: "5rem" }} className="rounded-circle" src={avatar} alt="" /></a>
                                                    </div>
                                                </td>
                                                <td> #5465 </td>
                                                <td>  <span className="name">Johnny Stephens</span> </td>
                                            </tr>

                                            <tr>
                                                <td className="serial">1.</td>
                                                <td className="avatar">
                                                    <div className="round-img justify-content-center">
                                                        <a href="/#"><img style={{ width: "5rem" }} className="rounded-circle" src={avatar} alt="" /></a>
                                                    </div>
                                                </td>
                                                <td> #5465 </td>
                                                <td>  <span className="name">Johnny Stephens</span> </td>
                                            </tr>
                                            <tr>
                                                <td className="serial">1.</td>
                                                <td className="avatar">
                                                    <div className="round-img justify-content-center">
                                                        <a href="/#"><img style={{ width: "5rem" }} className="rounded-circle" src={avatar} alt="" /></a>
                                                    </div>
                                                </td>
                                                <td> #5465 </td>
                                                <td>  <span className="name">Johnny Stephens</span> </td>
                                            </tr>
                                            <tr>
                                                <td className="serial">1.</td>
                                                <td className="avatar">
                                                    <div className="round-img justify-content-center">
                                                        <a href="/#"><img style={{ width: "5rem" }} className="rounded-circle" src={avatar} alt="" /></a>
                                                    </div>
                                                </td>
                                                <td> #5465 </td>
                                                <td>  <span className="name">Johnny Stephens</span> </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
    return (
        <>
            <ViewThongTinTongQuan />
            <TopNguoiDangBai />
        </>
    )
}
export default ThongTinTongQuan