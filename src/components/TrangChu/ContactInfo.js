import React from 'react';
const ContactInfo = () => {
    return (
        < >
            <div style={{ paddingRight: "0px", paddingLeft: "0px" }} className="contact mt-5 mb-2" id="contact" >
                <iframe title="Địa chỉ nơi hệ thống được quản lý" id="thongtinlienhe" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.4957155371085!2d109.19421021481496!3d12.282367591310793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317067fbaf7bad35%3A0x85d89679ce550ec4!2zMTAxIE1haSBYdcOibiBUaMaw4bufbmcsIFbEqW5oIEjhuqNpLCBUaMOgbmggcGjhu5EgTmhhIFRyYW5nLCBLaMOhbmggSMOyYSA2NTAwMDA!5e0!3m2!1sen!2s!4v1620633320978!5m2!1sen!2s"
                    frameBorder="0" style={{ "border": "0" }} allowFullScreen >
                </iframe>
                <div className="container">
                    <h3 className="pt-2 ">Thông tin liên hệ</h3>
                    <div className="row mt-3">
                        <div className="col-md-4 contact-grid">
                            <i className="fa fa-home" aria-hidden="true"></i>
                            <h4>Địa chỉ</h4>
                            <p>101 Mai Xuân Thưởng, phường Vĩnh Hải<span>Nha Trang</span></p>
                        </div>
                        <div className="col-md-4 contact-grid">
                            <i className="fa fa-envelope" aria-hidden="true"></i>
                            <h4>Mail</h4>
                            <p>nguyenthanhphat9991@gmail.com</p>
                        </div>
                        <div className="col-md-4 contact-grid">
                            <i className="fa fa-phone" aria-hidden="true"></i>
                            <h4>Số điện thoại</h4>
                            <p>+84 976 696 179</p>
                        </div>
                    </div>
                    <div className="clearfix"> </div>
                </div>
            </div>
        </>
    )
}

export default ContactInfo;