import React from 'react';
import { Carousel } from 'react-bootstrap';

import image1 from '../Image/banner1.jpg';
import image2 from '../Image/banner2.jpg';
import image3 from '../Image/banner3.jpg';

const Banner = () => {
  return (
    <Carousel style={{
      paddingRight: "0px", paddingLeft: "0px"
    }} fade={true} pause={false}>

      <Carousel.Item interval={2000} style={{
        height: "300px"
      }}>
        <img tyle={{
          "position": "absolute",
          "top": "0",
          "left": "0",
          "minHeight": "300px",
        }}
          className="d-block w-100"
          src={image1}
          alt="First slide"
        />
        <Carousel.Caption style={{
          "maxWidth": "100%",
          "width": "100%",
          "backgroundColor": "rgba(0, 0, 0, 0.3)",
          "left": "0px",
        }} className="text-white font-weight-bold">
          <h3>Cầu nối giữa người cho thuê và người cần thuê</h3>
          <p>Giúp cho người cần thuê dễ dàng tìm thấy phòng trọ mà mình muốn chọn.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={2000} style={{
        height: "300px"
      }}>
        <img tyle={{
          "position": "absolute",
          "top": "0",
          "left": "0",
          "minHeight": "300px"
        }}
          className="d-block w-100"
          src={image2}
          alt="First slide"
        />
        <Carousel.Caption style={{
          "maxWidth": "100%",
          "width": "100%",
          "backgroundColor": "rgba(0, 0, 0, 0.3)",
          "left": "0px",
        }} className="text-white font-weight-bold">
          <h3>Đăng bài và quản lý bài đăng một cách dễ dàng</h3>
          <p>Giúp cho người cho thuê có thể dễ dàng chỉnh sửa thông tin cá nhân hay thay đổi thông tin phòng trọ.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={2000} style={{
        height: "300px"
      }}>
        <img tyle={{
          "position": "absolute",
          "top": "0",
          "left": "0",
          "minHeight": "300px"
        }}
          className="d-block w-100"
          src={image3}
          alt="First slide"
        />
        <Carousel.Caption style={{
          "maxWidth": "100%",
          "width": "100%",
          "backgroundColor": "rgba(0, 0, 0, 0.3)",
          "left": "0px",
        }} className="text-white font-weight-bold">
          <h3>Có nhiều danh mục để người cần thuê xem và lựa chọn hợp lý</h3>
          <p>Giúp cho người cần thuê dễ dàng lựa chọn được phòng trọ trong số những danh mục được sắp xếp sẵn.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default Banner;