import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './admin.css';
function QuanLyUser() {


    const [users, setusers] = useState([])
    const [users1, setusers1] = useState([])
    const [load, setload] = useState([])

    // const [baocao, setbaocao] = useState([])



    //trang hiện tại là trang 1
    const [CurrentPage, setCurrentPage] = useState(1);
    //số lượng trên 1 trang là 8
    const [ItemsPerPage] = useState(7);

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


    const [VaiTro, setVaiTro] = useState("");
    const [UserID, setUserID] = useState("");
    const [keyTimKiem, setkeyTimKiem] = useState("");
    const [errorVaiTro, seterrorVaiTro] = useState("");

    useEffect(() => {
        get_User()
        loadData()
    }, [])

    async function loadData() {
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        };
        await axios.get("http://phatnguyen.nikinpham.com/be/public/index.php/api/auth/home", config)
            .then(response => {
                setload(response.data[0].data)
            },
                err => {
                    // console.log(err)
                }
            )
    }

    async function get_User() {
        try {
          const res = await fetch(`http://phatnguyen.nikinpham.com/be/public/index.php/api/user/selectall`);
          const json = await res.json();
          setusers(json)
        } catch (err) {
        //   console.error('err', err);
        }
      }

    function clickTimKiem() {
        if (keyTimKiem.length < 3) {
            return null;
        }
        else {
            let urlTimKiem = `http://phatnguyen.nikinpham.com/be/public/index.php/api/user/timkiem/${keyTimKiem}`;
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
                            <tr key={item.UserID}>
                                <td>{ItemsPerPage * (CurrentPage-1) + i+1}</td>
                                <td>{item.HoVaTen}</td>
                                <td >{item.Email}</td>
                                <td>{item.SoDienThoai}</td>
                                <td>{item.VaiTro}</td>
                                <td style={{ width: "200px"}}>
                                    <a onClick={() => selectUser(item.UserID)} href="/#" data-toggle="modal" data-target="#sua" className="sua"><i style={{ fontSize: "15px" }} className="fa fa-edit"></i>Sửa</a>
                                    <Link to="/admin" onClick={() => deleteUser(item.UserID)} className="delete" ><i style={{ fontSize: "15px" }} className="fa fa-remove">Xoá</i></Link>
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
                            <tr key={item.UserID}>
                                <td>{i*CurrentPage + 1}</td>
                                <td>{item.HoVaTen}</td>
                                <td >{item.Email}</td>
                                <td>{item.SoDienThoai}</td>
                                <td>{item.VaiTro}</td>
                                <td style={{ width: "200px" }}>
                                    <a onClick={() => selectUser(item.UserID)} href="/#" data-toggle="modal" data-target="#sua" className="sua"><i style={{ fontSize: "15px" }} className="fa fa-edit"></i>Sửa</a>
                                    <Link to="/admin" onClick={() => deleteUser(item.UserID)} className="delete" ><i style={{ fontSize: "15px" }} className="fa fa-remove">Xoá</i></Link>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            )
        }
    }

    function dangxuat() {
        localStorage.removeItem("token")
        window.location = '/dangnhap';
    }

    function deleteBaoCao(PhongTroID) {
        // console.log("PhongTroID",PhongTroID)
        const url = `http://phatnguyen.nikinpham.com/be/public/index.php/api/baocao/deleteBaoCao/${PhongTroID}`
            fetch(url, {
                method: 'DELETE'
            }).then((result) => {
                result.json().then((resp) => {
                })
                get_User()
            })
    }

    async function get_baocao(UserID) {
        const url = `http://phatnguyen.nikinpham.com/be/public/index.php/api/phongtro/thongtinphongtro/${UserID}`
        try {
            const res = await fetch(url);
            const json = await res.json();
            // setbaocao(json)
            // console.log("baocao", json)
            if(json){
                console.log("xử lý xoá đánh giá")
                for (let i = 0; i < json.length ; i++) {
                    console.log("i", json[i].PhongTroID)
                     deleteBaoCao(json[i].PhongTroID)
                }
            } else {
                // console.log("k làm gì ")
            }
        } catch (err) {
        //   console.error('err', err);
        }
    }

    async function deleteBaiDang(PhongtroID) {
        let a = [PhongtroID];
        const url = `http://phatnguyen.nikinpham.com/be/public/index.php/api/user/deletebaiviet/${a}`
            await fetch(url, {
                method: 'DELETE'
            }).then((result) => {
                result.json().then((resp) => {
                    alert('Bạn đã xoá thành công')
                })
                get_User()
            })

    }

    async function deleteUser(UserID) {
        let a = UserID;
        get_baocao(a)
            if (a === load.UserID){
                const url = `http://phatnguyen.nikinpham.com/be/public/index.php/api/user/delete/${a}`
                if (window.confirm("Bạn có chắc chắc xoá không?")) {
                    deleteBaiDang(a)
                    try{
                        await fetch(url, {
                            method: 'DELETE'
                        }).then((result) => {
                            result.json().then((resp) => {
                                alert("Cập nhật thành công")
                            })
                            dangxuat();
                        })
                    }catch(error) {
                        // console.error(error)
                    }
                } 
                else {
                    alert('Bạn đã huỷ thao tác xoá')
                }   
            } else {
                const url = `http://phatnguyen.nikinpham.com/be/public/index.php/api/user/delete/${a}`
                if (window.confirm("Bạn có chắc chắc xoá không?")) {
                    deleteBaiDang(a)
                    await fetch(url, {
                        method: 'DELETE'
                    }).then((result) => {
                        result.json().then((resp) => {
                            alert('Bạn đã xoá thành công')
                            if (!load.UserID) {
                                window.location = '/dangnhap';
                            } else {
                                get_User()
                            }
                        })
                        
                    })
                }
                else {
                    alert('Bạn đã huỷ thao tác xoá')
                }
            }
    }

    async function selectUser(userID) {
        try {
            const res = await fetch(`http://phatnguyen.nikinpham.com/be/public/index.php/api/user/selectone/${userID}`);
            const json = await res.json();
            // console.log('json', json)
                setVaiTro(json.VaiTro);
                setUserID(json.UserID);
          } catch (err) {
            // console.error('err', err);
          }
    }

    async function update_user() {
        if (!VaiTro) {
            const checkRongVaiTro = "Vui lòng không để trống vai trò";
            seterrorVaiTro(checkRongVaiTro)
        }
        else {
            let id = UserID;
            let url = `http://phatnguyen.nikinpham.com/be/public/index.php/api/user/update/${id}`
            let item = { VaiTro }
            // console.log(url, item)
            await fetch(url, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            }).then((result) => {
                result.json().then((resp) => {
                    alert("Cập nhật thành công")
                    get_User()
                    window.location.reload();
                })
            })
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
                                <h2>Quản Lý   <b>Người Dùng</b></h2>
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
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Rolo</th>
                                <th style={{ width: "200px" }}>Action</th>
                            </tr>
                        </thead>
                        {renderData(CurrentItems)}
                    </table>

                </div>
                <div className="modal fade" id="sua" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-dark" id="exampleModalLabel">Sửa thông tin người dùng</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" onLoad={() => { selectUser(UserID) }}>
                                <div className="form-group text-dark">
                                    <div className="col-xs-12">
                                        <label><h4>Vai trò cần thay đổi</h4></label>
                                        <input type="text" className="form-control"
                                            id="VaiTro" placeholder="Cập nhật trạng thái phòng trọ của bạn"
                                            value={VaiTro} name="VaiTro"
                                            onChange={(data) => { setVaiTro(data.target.value) }}
                                        />
                                        <span className="text-danger" style={{ fontSize: "15px" }}>{errorVaiTro}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                                <button onClick={() => update_user()} type="button" className="btn btn-primary">Thay đổi</button>
                            </div>
                        </div>
                    </div>
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
export default QuanLyUser
