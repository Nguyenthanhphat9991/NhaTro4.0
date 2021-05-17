import React from 'react';

const AboutUs = () => {
    function dangtinmienphi() {
        if (localStorage.getItem("token")) {
            window.location = '/dangtinmienphi';
        } else {
            if (window.confirm('Để đăng tin bạn cần đăng nhập, bạn có muốn đăng nhập?')) {
                window.location = '/dangnhap';
            }
            else {
                window.location.reload();
            }
        }
    }

    return (
        <>
            <div style={{ backgroundColor: "#f2f2f2" }} id="thongtinwebsite" className="about mt-5">
                <div className="container" >
                    <div className="about-top contact-top">
                        <h3 className="heading  text-center" style={{ color: "#83BFA6" }}>Chức năng của website</h3>
                    </div>
                    <div className="about-bottom pb-3">
                        <div className="row abt">
                            <div className="col-1 about-left text-right ">
                                <span className="fa fa-gratipay" aria-hidden="true"></span>
                            </div>
                            <div className="col-11 about-right pl-4">
                                <a href="/#" onClick={dangtinmienphi}><h4>Đăng tin miễn phí</h4></a>
                                <p>Bạn có thế đăng bài viết về phòng trọ để người khác dễ dàng tìm thấy và liên lạc để thuê trọ</p>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                        <div className="row abt">
                            <div className="col-1 about-left text-right">
                                <span className="fa fa-gratipay" aria-hidden="true"></span>
                            </div>
                            <div className="col-11 about-right pl-4">
                                <a href="/danhmucchothue"><h4>Lựa chọn danh mục</h4></a>
                                <p>Có rất nhiều danh mục được sắp xếp sẵn. Bạn có thể lựa chọn danh mục mà bạn muốn thuê</p>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                        <div className="row abt">
                            <div className="col-1 about-left text-right">
                                <span className="fa fa-gratipay" aria-hidden="true"></span>
                            </div>
                            <div className="col-11 about-right pl-4">
                                <a href="#timkiem"><h4>Tìm kiếm trực tiếp</h4></a>
                                <p>Website cho phép bạn tìm kiếm thông tin phòng trọ theo những dữ liệu bạn cung cấp</p>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutUs;