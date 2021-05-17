// import { Link } from 'react-router-dom'
// import React, { useEffect, useState } from 'react'
// import axios from 'axios';
// import './css.css';
// function QuanLyCacBaiViet() {
//     const [SoDienThoai, setSoDienThoai] = useState("");
//     const [TrangThai, setTrangThai] = useState("");
//     const [phongtro, setphongtro] = useState("")

//     const [errorSoDienThoai, seterrorSoDienThoai] = useState("")
//     const [errorTrangThai, seterrorTrangThai] = useState("")

//     const [phongtroID, setphongtroID] = useState("")

//     let content = null


//     useEffect(() => {
//         get_phongtro()
//     })
//     async function get_phongtro() {
//         const urlPhongTro = `http://localhost:8888/backend/public/index.php/api/user/userQuanLy/1`;
//         await axios.get(urlPhongTro)
//             .then(response => {
//                 setphongtro(response.data)
//             })
//     }

//     function submit() {
//         // const UserID = phongtro[0].UserID
//         // const UserID1 = phongtro[1].PhongTroID
//         console.log(SoDienThoai, TrangThai)
//         if (!SoDienThoai && !TrangThai) {
//             alert("Dữ liệu cần thay đổi không được để trống")
//             const checkRongSoDienThoai = "Vui lòng không để trống số điện thoại ";
//             seterrorSoDienThoai(checkRongSoDienThoai)
//             const checkRongTrangThai = "Vui lòng không để trống trạng thái phòng trọ";
//             seterrorTrangThai(checkRongTrangThai)
//         } else if (!SoDienThoai) {
//             alert("Dữ liệu cần thay đổi không được để trống")
//             const checkRongSoDienThoai = "Vui lòng không để trống số điện thoại ";
//             seterrorSoDienThoai(checkRongSoDienThoai)
//         } else if (SoDienThoai.length !== 10) {
//             alert("Kiểm tra lại số điện thoại")
//             const checkRongSoDienThoai = "Vui lòng cập nhật số điện thoại có 10 số";
//             seterrorSoDienThoai(checkRongSoDienThoai)
//         } else if (!TrangThai) {
//             alert("Dữ liệu cần thay đổi không được để trống")
//             const checkRongTrangThai = "Vui lòng không để trống trạng thái phòng trọ";
//             seterrorTrangThai(checkRongTrangThai)
//         } else {
//             // let urlUpdate = `http://localhost:8888/backend/public/index.php/api/phongtro/user_update/${phongtro[i].PhongTroID}`;
//             // let data = { SoDienThoai, TrangThai, UserID};
//             // console.log(data,urlUpdate,phongtroID)
//             // fetch(urlUpdate, {
//             //     method: 'PUT',
//             //     headers: {
//             //         "Content-Type": "application/json",
//             //         "Accept": "application/json",
//             //     },
//             //     body: JSON.stringify(data)
//             // }).then((result) => {
//             //     console.log("Result: ", result)
//             //     result.json()
//             //         .then((response) => {
//             //             console.warn("response: ", response)
//             //             alert("Thay đổi thành công")
//             //             window.location.reload();
//             //         })
//             // })
//         }
//     }
//     if (phongtro) {
//         var noidungbaocao = [];
//         for (var i = 0; i < phongtro.length; i++) {
//             const key = phongtro[i].PhongTroID
//             noidungbaocao.push(
//                 <tr key={key}>
//                     <td>{phongtro[i].PhongTroID}</td>
//                     <td>{phongtro[i].TieuDe}</td>
//                     <td>{phongtro[i].SoDienThoai}</td>
//                     <td>{phongtro[i].TrangThai}</td>
//                     <td style={{ width: "200px" }}>
//                         <Link to={{ pathname: `/chitiet/${phongtro[i].PhongTroID}`, query: { id: phongtro[i].PhongTroID } }}
//                             className="view"><i style={{ fontSize: "11px" }} class="fa fa-angle-double-right"></i>Xem</Link>
//                         <a href="/#" data-toggle="modal" data-target="#sua" className="edit"><i style={{ fontSize: "11px" }} className="fa fa-edit"></i>Sửa</a>
//                         <a href="/#" className="delete" ><i style={{ fontSize: "11px" }} className="fa fa-trash">Xoá</i></a>
//                     </td>
//                 </tr>
//            );
//         }
//         return (
//             <>
//                 <div className=" quanlybaiviet table-responsive">
//                     <div className="table-wrapper">
//                         <div className="table-title">
//                             <div className="row">
//                                 <div className="col-sm-6">
//                                     <h2>Quản Lý <b>Bài Viết</b></h2>
//                                 </div>
//                                 <div className="col-sm-6 text-right">
//                                     <Link style={{
//                                         "color": "rgb(0, 0, 0)",
//                                         "float": "right",
//                                         "fontSize": "13px",
//                                         "minWidth": "50px",
//                                         "borderRadius": "2px",
//                                         "border": "none",
//                                         "outline": "none !important",
//                                         "marginLeft": "10px"
//                                     }} to="/dangtinmienphi" className="btn btn-success" ><i className="fa fa-plus"></i> <span>Thêm bài viết mới</span></Link>
//                                 </div>
//                             </div>
//                         </div>
//                         <table className="table table-striped table-hover">
//                             <thead style={{ "overflowY": "scroll", fontSize: "14px" }}>
//                                 <tr >
//                                     <th>STT</th>
//                                     <th>Tiêu đề</th>
//                                     <th>Số điện thoại</th>
//                                     <th>Trạng thái</th>
//                                     <th style={{ width: "200px" }}>Hành động</th>
//                                 </tr>
//                             </thead>
//                             <tbody style={{ fontSize: "12px" }}>
//                                 {noidungbaocao}
//                             </tbody>

//                         </table>
//                     </div>
//                 </div>

//                 <div class="modal fade" id="sua" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
//                     <div class="modal-dialog" role="document">
//                         <div class="modal-content">
//                             <div class="modal-header">
//                                 <h5 class="modal-title" id="exampleModalLabel">Sửa thông tin</h5>
//                                 <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//                                     <span aria-hidden="true">&times;</span>
//                                 </button>
//                             </div>
//                             <div class="modal-body">
//                                 <div className="form-group">
//                                     <div className="col-xs-12">
//                                         <label><h4>Số điện thoại</h4></label>
//                                         <input type="text" className="form-control"
//                                             id="SoDienThoai" placeholder="Cập nhật lại số điện thoại"
//                                             value={SoDienThoai} name="SoDienThoai"
//                                             onChange={(data) => { setSoDienThoai(data.target.value) }}
//                                         />
//                                         <span className="text-danger" style={{ fontSize: "15px" }} >{errorSoDienThoai}</span>
//                                     </div>
//                                 </div>
//                                 <div className="form-group">
//                                     <div className="col-xs-12">
//                                         <label><h4>Trạng thái</h4></label>
//                                         <input type="text" className="form-control"
//                                             id="TrangThai" placeholder="Cập nhật trạng thái phòng trọ của bạn"
//                                             value={TrangThai} name="TrangThai"
//                                             onChange={(data) => { setTrangThai(data.target.value) }}
//                                         />
//                                         <span className="text-danger" style={{ fontSize: "15px" }}>{errorTrangThai}</span>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div class="modal-footer">
//                                 <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
//                                 <button onClick={submit} type="button" class="btn btn-primary">Thay đổi</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </>
//         )
//     }
//     return (
//         <div>
//             <h1>{content}</h1>
//         </div>
//     )
// }
// export default QuanLyCacBaiViet
