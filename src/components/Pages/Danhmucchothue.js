import React, { useEffect } from 'react';
import DanhMucChoThue from '../DanhMuc/DanhMucChoThue';
import Navbar from '../TrangChu/Navbar';
import Banner from '../TrangChu/Banner';
import Timkiem from '../TrangChu/Timkiem';

import Footer from '../TrangChu/Footer';
import './pages.css';
function Danhmucchothue() {

    useEffect(() => {
        document.title = 'Danh mục cho thuê';
    },[])


    return (
        <>
            <Navbar />
            <Banner />
            <Timkiem />
            <DanhMucChoThue />
            <Footer />
        </>
    )
}
export default Danhmucchothue;

