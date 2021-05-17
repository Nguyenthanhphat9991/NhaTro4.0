import React, { useEffect } from 'react';
import Navbar from '../TrangChu/Navbar';
import Footer from '../TrangChu/Footer';
import './pages.css';
function Khongtimthay() {
    useEffect(() => {
        document.title ='lỗi không tìm thấy trang!!!';
    },[])

        return (
            <>
                <Navbar />
                <div>
                    <div className="container">
                        <div className="NotFound">
                            <p>PAGE NOT FOUND</p>
                            <h1>404</h1>
                            <a href="/" className="hvr-overline-from-center">Về trang chủ</a>
                        </div>
                    </div>
                </div>
                <Footer />

            </>

        )
}
export default Khongtimthay;