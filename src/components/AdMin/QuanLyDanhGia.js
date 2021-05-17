import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './admin.css';
function QuanLyDanhGia() {
    const [users, setusers] = useState([])
    const [users1, setusers1] = useState([])

    //trang hiện tại là trang 1
    const [CurrentPage, setCurrentPage] = useState(1);
    //số lượng trên 1 trang là 8
    const [ItemsPerPage] = useState(5);

    const [pageNumberLimit] = useState(5);
    const [maxpageNumberLimit, setmaxpageNumberLimit] = useState(5);
    const [minpageNumberLimit, setminpageNumberLimit] = useState(0);

    const indexOfLastItem = CurrentPage * ItemsPerPage
    const indexOfFirstItem = indexOfLastItem - ItemsPerPage


    const CurrentItems = users.slice(indexOfFirstItem, indexOfLastItem)
    const pages = [];
    for (let i = 1; i <= Math.ceil(users.length / ItemsPerPage); i++) {
        pages.push(i);
    }

    function clickItemPagination(e) {
        setCurrentPage(Number(e.target.id))
    }
    const renderPagination = pages.map((number) => {
        if (number < maxpageNumberLimit + 1 && number > minpageNumberLimit) {
            return (
                <li key={number} id={number} onClick={clickItemPagination} className={CurrentPage === number ? "active" : null}>
                    {number}
                </li>
            )
        } else {
            return (
                null
            )
        }
    })

    const [keyTimKiem, setkeyTimKiem] = useState("");

    useEffect(() => {
        get_User()
    })
    async function get_User() {
        const urlUser = `http://phatnguyen.nikinpham.com/be/public/index.php/api/baocao/selectall`;
        await axios.get(urlUser)
            .then(response => {
                setusers(response.data)
            })
    }

    function clickTimKiem() {
        if (keyTimKiem.length < 3) {
            return null;
        }
        else {
            let urlTimKiem = `http://phatnguyen.nikinpham.com/be/public/index.php/api/baocao/timkiembaocao/${keyTimKiem}`;
            axios.get(urlTimKiem)
                .then(response => {
                    setusers1(response.data)
                })
        }
    }

    const renderData = (Users) => {
        if ((!users1) || (keyTimKiem.length === 0)) {
            return (
                <tbody style={{ fontSize: "12px" }}>
                    {
                        Users.map((item, i) => 
                            <tr key={item.BaoCaoID}>
                                <td>{ItemsPerPage * (CurrentPage-1) + i+1}</td>
                                <td>{item.TieuDe}</td>
                                <td>{item.NoiDungBaoCao}</td>
                                <td>{item.HoVaTen}</td>
                                <td>{item.Email}</td>
                                <td style={{ width: "200px"}}>
                                    <Link target="_blank"  to={{pathname: `/chitiet/${item.PhongTroID}`}} className="xem"><i style={{ fontSize: "15px" }} className="fa fa-location-arrow"></i>Xem</Link>
                                    <Link to="/admin" onClick={() => deleteBaoCao(item.PhongTroID)} className="delete" ><i style={{ fontSize: "15px" }} className="fa fa-remove">Xoá</i></Link>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            )
        } else if ((users1.length === 0) && (keyTimKiem)) {
            return (
                <div> không tìm thấy dữ liệu cho từ khoá {keyTimKiem}</div>
            )
        } else if (users1.length > 0) {
            return (
                <tbody style={{ fontSize: "12px" }}>
                    {
                        users1.map((item, i) =>
                            <tr key={item.PhongtroID}>
                                <td>{ItemsPerPage * (CurrentPage-1) + i+1}</td>
                                <td>{item.TieuDe}</td>
                                <td>{item.NoiDungBaoCao}</td>
                                <td>{item.HoVaTen}</td>
                                <td>{item.Email}</td>
                                <td style={{ width: "200px" }}>
                                    <Link target="_blank"  to={{pathname: `/chitiet/${item.PhongTroID}`}} className="xem"><i style={{ fontSize: "15px" }} className="fa fa-location-arrow"></i>Xem</Link>
                                    <Link to="/admin" onClick={() => deleteBaoCao(item.PhongTroID)} className="delete" ><i style={{ fontSize: "15px" }} className="fa fa-remove">Xoá</i></Link>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            )
        }
    }


    function deleteBaoCao(PhongtroID) {
        let a = [PhongtroID];
        const url = `http://phatnguyen.nikinpham.com/be/public/index.php/api/phongtro/delete/${a}`
        if (window.confirm("Bạn có chắc chắc xoá không?")) {
            fetch(url, {
                method: 'DELETE'
            }).then((result) => {
                result.json().then((resp) => {
                    alert('Bạn đã xoá thành công')
                })
                get_User()
            })
        }
        else {
            alert('Bạn đã huỷ thao tác xoá')
        }
    }

    const prePage = () => {
        setCurrentPage(CurrentPage - 1)
        if ((CurrentPage - 1) % pageNumberLimit === 0) {
            setmaxpageNumberLimit(maxpageNumberLimit - pageNumberLimit)
            setminpageNumberLimit(minpageNumberLimit - pageNumberLimit)
        }
    }
    const nextPage = () => {
        setCurrentPage(CurrentPage + 1)
        if (CurrentPage + 1 > maxpageNumberLimit) {
            setmaxpageNumberLimit(maxpageNumberLimit + pageNumberLimit)
            setminpageNumberLimit(minpageNumberLimit + pageNumberLimit)
        }
    }



    return (
        <>
            < div className="quanlyuser table-responsive mt-2" >
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-6">
                                <h2>Quản Lý   <b>Nội dung đánh giá</b></h2>
                            </div>
                            <div className="col-sm-6">
                                <div className="input-group">
                                    <input type="search" className="form-control rounded" placeholder="Tìm kiếm" aria-label="Search"
                                        aria-describedby="search-addon"
                                        name="keyTimKiem"
                                        value={keyTimKiem}
                                        onChange={(data) => { setkeyTimKiem(data.target.value) }}
                                    />
                                    <button onClick={() => clickTimKiem()} type="button" className="btn btn-primary ml-1">Tìm kiếm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <table style={{ 'fontSize': "12px", 'height': "400px", 'display': 'block' }} className="table table-striped table-hover" >
                        <thead style={{ ontSize: "14px" }}>
                            <tr >
                                <th>STT</th>
                                <th>Tiêu đề</th>
                                <th>Nội dung báo cáo</th>
                                <th>Họ và tên</th>
                                <th>Email</th>
                                <th style={{ width: "200px" }}>Hành Động</th>
                            </tr>
                        </thead>
                        {renderData(CurrentItems)}
                    </table>

                </div>
            </div >
            <div className="center">
                <ul className="pagination">
                    <li>
                        <button
                            onClick={prePage}
                            disabled={CurrentPage === pages[0] ? true : false}
                        >
                            &laquo;
                        </button>
                    </li>
                    {renderPagination}
                    <li>
                        <button style={{}}
                            onClick={nextPage}
                            disabled={CurrentPage === pages[pages.length - 1] ? true : false}
                        >  &raquo;
                        </button>
                    </li>
                </ul>
            </div>
        </>

    )
}
export default QuanLyDanhGia