import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Timkiem() {
    const [keyTimKiem, setkeyTimKiem] = useState("");
    const [KetQuaTimKiem, setKetQuaTimKiem] = useState([])



    const inputEvent = (event) => {
        const data = event.target.value;
        setkeyTimKiem(data)
        console.log(keyTimKiem);
    }

    function clickTimKiem() {
        if (keyTimKiem.length === 0) {
            return null;
        } else {
            let urlTimKiem = `http://phatnguyen.nikinpham.com/be/public/index.php/api/phongtro/timkiemphongtro/${keyTimKiem}`;
            axios.get(urlTimKiem)
                .then(response => {
                    setKetQuaTimKiem(response.data)
                })
        }
    }

    useEffect(() => {
        clickTimKiem()
    })

    const noidungtimkiem = [];
    for (var i = 0; i < KetQuaTimKiem.length; i++) {
        const tieude = KetQuaTimKiem[i].TieuDe.match(/.{1,20}/g);
        const moTa = KetQuaTimKiem[i].MoTa.split('-');
        console.log(moTa[0])
        noidungtimkiem.push(
            <Link to={{ pathname: `/chitiet/${KetQuaTimKiem[i].PhongTroID}` }}>
                <div className="p-2 row  ml-0 mr-0 mt-1 border border-primary">
                    <div className="col-3">
                        <img src={KetQuaTimKiem[i].HinhAnh} className="card-img-top " alt="..." style={{
                            display: "block",
                            marginLeft: "auto",
                            marginRight: "auto",
                            width: "100%",
                            height: "100px"
                        }} />
                    </div>
                    <div className="col-9">
                        <div className="p-2 row">
                            <strong className="ml-2 text-dark ">{tieude}</strong>
                        </div>
                        <div className="p-2 row">
                            <strong style={{ "fontFamily": "cursive" }} className="ml-2 ">{moTa[0]}</strong>
                        </div>
                        <div className="p-2 row">
                            <div className="col">Diện tích: <strong>{KetQuaTimKiem[i].DienTich} m²</strong></div>
                            <div className="col">Giá phòng: <strong>{KetQuaTimKiem[i].Gia}</strong></div>
                        </div>
                    </div>
                </div>
            </Link >
        );
    }

    return (
        <>
            <div style={{ backgroundColor: "#f2f2f2" }} className="container-fluid" id="timkiem">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-9">
                        <div className="SectionTimKiemCard p-2 mt-3 mb-3">
                            <h3 className="heading  text-center" style={{ color: "#83BFA6" }}>Bạn nhập thông tin muốn tìm kiếm ở đây</h3>
                            <div className="d-flex justify-content-center px-5">
                                <div className="search">
                                    <input type="text" className="search-input"
                                        placeholder="Tìm kiếm" aria-label="Search"
                                        aria-describedby="search-addon"
                                        value={keyTimKiem}
                                        onChange={inputEvent} />
                                    <a href="/#" className="search-icon"> <i className="fa fa-search"></i> </a> </div>
                            </div>
                            <div className="ketqua row mt-1 g-1 px-4mb-1 ">
                                {
                                    keyTimKiem.length === 0
                                        ?
                                        ("")
                                        :
                                        (
                                            <div className="ketqua  p-2 " style={{
                                                height: "300px",
                                                overflow: "scroll",
                                            }}>
                                                {
                                                    KetQuaTimKiem.length > 0
                                                        ?
                                                        noidungtimkiem
                                                        :
                                                        <div>không tìm thấy kết quả tìm kiếm cho từ khoá <strong>{keyTimKiem}</strong></div>
                                                }
                                            </div>
                                        )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="container mb-5" style={{ 'width': '70%' }}>
                <div className="row">
                    <div className="col-sm-12" >
                        <div className="input-group">
                            <input type="search" className="form-control rounded"
                                placeholder="Tìm kiếm" aria-label="Search"
                                aria-describedby="search-addon"
                                value={keyTimKiem}
                                onChange={inputEvent}
                            />
                        </div>
                        {
                            keyTimKiem.length === 0 
                            ?
                                ("")
                            : 
                                (
                                    <div className="ketqua" style={{
                                        height: "200px",
                                        overflow: "scroll",
                                    }}>
                                        {
                                                    KetQuaTimKiem.length > 0 
                                                    ? 
                                                        noidungtimkiem
                                                    :
                                                        <div>không tìm thấy kết quả tìm kiếm cho từ khoá <strong>{keyTimKiem}</strong></div>
                                        }
                                    </div>
                                )
                        }
                        

                    </div>
                </div>
            </div> */}
        </>

    )
}
export default Timkiem