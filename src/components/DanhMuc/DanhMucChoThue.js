import React from 'react';
import { Nav, Col, Tab } from 'react-bootstrap';

import GiaPhong from './GiaPhong';
import DienTich from './DienTich';
import DanhMuc from './DanhMuc';
import KhuVuc from './KhuVuc';



export default function DanhMucChoThue() {
    return (
        <div style={{ backgroundColor: "#f2f2f2" }} className="mt-5 ml-1 mr-2 row">
            <Tab.Container defaultActiveKey="giaphong">
                <Col className="pt-3 " sm={3} >
                    <div className="border border-info rounded p-3">
                    <h3 className="heading  text-center" style={{ color: "#83BFA6" }}>Các mục đã được lọc sẵn</h3>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="giaphong">Giá Phòng</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="dientich">Diện Tích</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="danhmuc">Danh Mục</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="khuvuc">Khu Vực</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    </div>
                </Col>
                <Col className="pt-3" sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="giaphong">
                            <GiaPhong />
                        </Tab.Pane>
                        <Tab.Pane eventKey="dientich">
                            <DienTich />
                        </Tab.Pane>
                        <Tab.Pane eventKey="danhmuc">
                            <DanhMuc />
                        </Tab.Pane>
                        <Tab.Pane eventKey="khuvuc">
                            <KhuVuc />
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Tab.Container>
        </div>
    );
}
