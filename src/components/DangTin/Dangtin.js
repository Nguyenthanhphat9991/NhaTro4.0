import React, { useEffect, useState } from 'react';
import axios from 'axios';
function Dangtin() {
    const [TieuDe, setTieuDe] = useState("");
    const [MoTa, setMoTa] = useState("");
    const [HinhAnh, setHinhAnh] = useState("");
    const [DiaChi, setDiaChi] = useState("");
    const [Gia, setGia] = useState("");
    const [DienTich, setDienTich] = useState("");
    const [SoDienThoai, setSoDienThoai] = useState("");
    const [TienIch, setTienIch] = useState("");
    const [TrangThai] = useState("còn phòng");
    const [KhuVucID, setKhuVucID] = useState("");
    const [DanhMucID, setDanhMucID] = useState("");

    const [imageUrl, setUrl] = useState();
    const imageRef = React.useRef(null);


    const [User, setUser] = useState([]);
    const [UserID, setUserID] = useState("");


    function HienThiHinhAnh() {
        const [result, setResult] = React.useState("");

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
        axios.post("http://phatnguyen.nikinpham.com/be/test.php", fd).then((res) => {
            // console.log(res);
        });
        const url =
            "http://phatnguyen.nikinpham.com/be/img/" + data.target.files[0].name;
        setUrl(url);
    }
    useEffect(() => {
        loadData()
    })

    async function loadData() {
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        };
        axios.get("http://phatnguyen.nikinpham.com/be/public/index.php/api/auth/home", config)
            .then(response => {
                setUser(response.data[0].data)
                setUserID(User.UserID)
            },
                err => {
                    // console.log(err)
                }
            )
    }
    function submit() {
        const HinhAnh = imageUrl;
        if (!TieuDe || !MoTa || !HinhAnh || !DiaChi || !Gia || !DienTich
            || !SoDienThoai || !TienIch || !KhuVucID || !DanhMucID) {
            alert("Vui lòng điền đầy đủ thông tin")
        } else {
            let url = 'http://phatnguyen.nikinpham.com/be/public/index.php/api/phongtro/create';
            let data = { TieuDe, MoTa, HinhAnh, DiaChi, Gia, DienTich, SoDienThoai, TienIch, TrangThai, UserID, KhuVucID, DanhMucID };
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
                        alert("Đăng bài thành công")
                        window.location = '/';
                    })
            })
        }
    }



    return (
        <div className="container mt-5 mb-5">
            <form>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label>Tiêu đề</label>
                        <input type="text" className="form-control"
                            placeholder="Nhà trọ giá tốt"
                            value={TieuDe} name="TieuDe"
                            onChange={(data) => { setTieuDe(data.target.value) }}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Mô tả</label>
                    <textarea className="form-control" rows="3"
                        placeholder="Hiện tại bên mình còn trống căn hộ mini ..."
                        value={MoTa} name="MoTa"
                        onChange={(data) => { setMoTa(data.target.value) }}
                    ></textarea>

                </div>
                <div className="form-group">
                    <label>Chọn hình ảnh</label>
                    <input
                        style={{ marginBottom: "5px" }}
                        type="file"
                        className="form-control-file"
                        name="HinhAnh"
                        accept="image/*"
                        value={HinhAnh}
                        onChange={(data) => {
                            setHinhAnh(data.target.value);
                            uploader(data);
                            fileSelect(data);
                        }}
                    />
                    {result && (
                        <img
                            style={{ width: "300px", height: "300px", marginTop: "5px" }}
                            ref={imageRef}
                            src={result}
                            alt=""
                        />
                    )}
                </div>
                <div className="form-group">
                    <label>Địa chỉ</label>
                    <input type="text" className="form-control" name="DiaChi"
                        placeholder="75 đường 2 tháng 4"
                        value={DiaChi}
                        onChange={(data) => { setDiaChi(data.target.value) }}
                    />
                </div>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label>Giá phòng</label>
                        <input type="text" className="form-control"
                            name="Gia" placeholder="1.000.000"
                            value={Gia}
                            onChange={(data) => { setGia(data.target.value) }}
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <label>Diện tích</label>
                        <input type="text" className="form-control"
                            name="DienTich" placeholder="30m²"
                            value={DienTich}
                            onChange={(data) => { setDienTich(data.target.value) }}
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <label>Số điện thoại</label>
                        <input type="text" className="form-control"
                            placeholder="0976696179"
                            name="SoDienThoai"
                            value={SoDienThoai}
                            onChange={(data) => { setSoDienThoai(data.target.value) }}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Tiện ích</label>
                    <textarea type="text" className="form-control" name="TienIch"
                        placeholder="Wifi mạnh, giờ giấc tự do"
                        value={TienIch}
                        onChange={(data) => { setTienIch(data.target.value) }}
                    />
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Phường</label>
                        <select name="Phuong" className="form-control custom-select" defaultValue={'DEFAULT'}
                            value={KhuVucID}
                            onChange={(data) => { setKhuVucID(data.target.value) }} >
                            <option value="DEFAULT" >Chọn khu vực cho thuê</option>
                            <option value="1">Vĩnh Hải</option>
                            <option value="2">Vĩnh Hoà</option>
                        </select>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Danh mục</label>
                        <select className="form-control custom-select" name="DanhMucID"
                            defaultValue={'DEFAULT'}
                            value={DanhMucID}
                            onChange={(data) => { setDanhMucID(data.target.value) }}>
                            <option value="DEFAULT" >Chọn danh mục cho thuê</option>
                            <option value="1">Trọ bình dân</option>
                            <option value="2">Ở ghép</option>
                            <option value="3">Nhà nguyên căn</option>
                            <option value="4">Căn hộ</option>
                        </select>
                    </div>
                </div>
                <button onClick={submit} className="btn btn-primary" type="button">Đăng trọ</button>
            </form>
        </div >

    )
}
export default Dangtin;