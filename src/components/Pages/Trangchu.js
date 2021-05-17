import React, { useEffect } from 'react';
import Phongtro from '../TrangChu/Phongtro';
import Timkiem from '../TrangChu/Timkiem';
import Navbar from '../TrangChu/Navbar';
import Footer from '../TrangChu/Footer';
import Banner from '../TrangChu/Banner';
import ContactInfo from '../TrangChu/ContactInfo';
import AboutUs from '../TrangChu/AboutUs';
import './pages.css';

function Trangchu() {

    useEffect(() => {
        document.title = 'Trang chủ';
    },[])

    return (
        <>
            <Navbar />
            <div className="container-fluid">
                <div className="row">
                    <Banner />
                    <Timkiem />
                    <Phongtro />
                    <AboutUs />
                    <ContactInfo />
                </div>
            </div>
            <Footer />
        </>
    )
}
export default Trangchu;