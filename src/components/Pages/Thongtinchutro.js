import React, { useEffect } from 'react'

import ThongTinCaNhan from '../ThongTinChuTro/ThongTinCaNhan'
import Navbar from '../TrangChu/Navbar';
import Footer from '../TrangChu/Footer';
import './pages.css';
function Thongtinchutro() {

    useEffect(() => {
        document.title ='Trang cá nhân người dùng';
    },[])

    return (
        <>
            <Navbar />
            <div className="container-fluid mt-5 mb-5">
                <ThongTinCaNhan />
            </div>
            <Footer />
        </>
    )

}
export default Thongtinchutro;