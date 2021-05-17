import React from 'react';

function Footer() {
	return (
		<>
			<div className="footer">
				<div className="container">
					<div className="row footer-grids">
						<div className="col-md-4 footer-grid">
							<h3>Thông tin website</h3>
							<p>Bạn có thế đăng bài viết về phòng trọ để người khác dễ dàng tìm thấy và liên lạc để thuê trọ</p>
							<p>Có rất nhiều danh mục được sắp xếp sẵn. Bạn có thể lựa chọn danh mục mà bạn muốn thuê</p>
							<p>Website cho phép bạn tìm kiếm thông tin phòng trọ theo những dữ liệu bạn cung cấp</p>

						</div>
						<div className="col-md-4 footer-grid">
							<h3>Thông tin liên lạc</h3>
							<ul>
								<li><i className="fa fa-location-arrow" aria-hidden="true"></i>101 Mai Xuân Thưởng - Vĩnh Hoà - TP. Nha Trang</li>
								<li><i className="fa fa-envelope" aria-hidden="true"></i><a href="mailto:nguyenthanhphat9991@gmail.com">nguyenthanhphat9991@gmail.com</a></li>
								<li><i className="fa fa-phone" aria-hidden="true"></i>+84 976 696 179</li>
							</ul>
						</div>
						<div className="col-md-4 footer-grid footer-grid1">
							<h3>Điều hướng</h3>
							<ul>
								<li><a href="/#trangchu" className="scroll">Trang chủ</a></li>
								<li><a href="/#timkiem" className="scroll">Tìm kiếm</a></li>
								<li><a href="/#thongtinphongtro" className="scroll">Thông tin phòng trọ</a></li>
								<li><a href="/#thongtinwebsite" className="scroll">Chức năng của website</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div className="copy-right">
				<div className="container">
					<p>&copy; 2021 K4 Trường Đại Học Thông Tin Liên Lạc | ĐHCN4A - Created by <a href="https://www.facebook.com/profile.php?id=100036945978349">Nguyễn Thanh Phát</a></p>
					<ul className="social-icons2">
						<li><a href="https://www.facebook.com/profile.php?id=100036945978349" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook"></i></a></li>
						<li><a href="https://www.youtube.com/channel/UC5YPkfGtAU65J1r5_jNQibQ/featured"  target="_blank" rel="noopener noreferrer"><i className="fa fa-youtube"></i></a></li>
						<li><a href="https://www.instagram.com/a1glasses/"  target="_blank" rel="noopener noreferrer"><i className="fa fa-instagram"></i></a></li>
						<li><a href= "mailto:nguyenthanhphat9991@gmail.com" ><i className="fa fa-google"></i></a></li>
					</ul>
				</div>
			</div>
		</>
	)
}
export default Footer;
