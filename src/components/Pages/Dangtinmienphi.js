import React, { useEffect } from 'react';
import Dangtin from '../DangTin/Dangtin';
import Navbar from '../TrangChu/Navbar';
import Footer from '../TrangChu/Footer';
import './pages.css';
function Dangtinmienphi() {
    useEffect(() => {
        document.title = 'Đăng tin miễn phí';
    },[])

        return (
            <>
                <Navbar />
                <Dangtin />
                <Footer />
            </>
        )
}
export default Dangtinmienphi;

