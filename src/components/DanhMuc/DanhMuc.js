import React, { Component } from 'react'
import { Col, Media, Form } from 'react-bootstrap';
// import img from '../images/3.jpeg'
import { Link } from 'react-router-dom';

export default class DanhMuc extends Component {
    state = {
        isLoading: true,
        phongtro: [],
        error: null
    };

    handleChange = (e) => {
        const value = e.target.value
        if (value === 'oghep') {
            this.oghep()
        } else if (value === 'canho') {
            this.canho()
        } else if (value === 'nhanguyencan') {
            this.nhanguyencan()
        } else if (value === 'trobinhdan') {
            this.trobinhdan()
        }
    }

    oghep() {
        fetch(`http://phatnguyen.nikinpham.com/be/public/index.php/api/danhmuc/oghep`)
            .then(response => response.json())
            .then(data =>
                this.setState({
                    phongtro: data,
                    isLoading: false,
                })
            )
            .catch(error => this.setState({ error, isLoading: false }));
    }

    canho() {
        fetch(`http://phatnguyen.nikinpham.com/be/public/index.php/api/danhmuc/canho`)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                this.setState({
                    phongtro: data,
                    isLoading: false,
                })

            })
            .catch(error => this.setState({ error, isLoading: false }));
    }

    nhanguyencan() {
        fetch(`http://phatnguyen.nikinpham.com/be/public/index.php/api/danhmuc/nhanguyencan`)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                this.setState({
                    phongtro: data,
                    isLoading: false,
                })

            })
            .catch(error => this.setState({ error, isLoading: false }));
    }

    trobinhdan() {
        fetch(`http://phatnguyen.nikinpham.com/be/public/index.php/api/danhmuc/trobinhdan`)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                this.setState({
                    phongtro: data,
                    isLoading: false,
                })

            })
            .catch(error => this.setState({ error, isLoading: false }));
    }

    componentDidMount() {
        this.oghep();
    }

    render() {
        const { isLoading, phongtro, error } = this.state;
        // console.log(this.state)
        return (
            <React.Fragment>
                <Col sm={5} className="ml-5">
                    <Form.Row>
                        <Form.Group className="">
                            <Form.Label style={{ width: "200px" }}>S???p x???p m???c ?????nh</Form.Label>
                            <select onChange={this.handleChange} className="form-control custom-select">
                                <option value="oghep">??? gh??p</option>
                                <option value="canho">C??n h???</option>
                                <option value="trobinhdan">Tr??? b??nh d??n</option>
                                <option value="nhanguyencan">Nh?? nguy??n c??n</option>
                            </select>
                        </Form.Group>
                    </Form.Row>
                </Col>
                {error ? <p>{error.message}</p> : null}
                {!isLoading ? (
                    phongtro.map(phongtros => {
                        const { TieuDe, MoTa, HinhAnh, TenDanhMuc, TrangThai } = phongtros;
                        var a = TieuDe.match(/.{1,50}/g);
                        var b = MoTa.match(/.{1,120}/g);
                        // console.log(DienTich)
                        return (
                            <Col sm={12} className="mb-3 pl-0 border border-danger p-2" key={phongtros.PhongTroID}>
                                <Media>
                                    <img
                                        width={300}
                                        height={200}
                                        className="mr-3"
                                        src={HinhAnh}
                                        alt="Generic placeholder"
                                    />
                                    <Media.Body>
                                        <Link to={{ pathname: `/chitiet/${phongtros.PhongTroID}`, query: { id: phongtros.PhongTroID } }}>
                                            <h5 className="text-uppercase" style={{ 'marginTop': '10px' }}>{a[0] + "..."}</h5>
                                        </Link>
                                        <p className="text-uppercase">
                                            <i className="fa fa-audio-description"></i> &nbsp; {b[0] + "..."}
                                        </p>
                                        <p>
                                            <i className="fa fa-list-alt"></i> &nbsp;
                                            <strong>{TenDanhMuc}</strong>
                                        </p>
                                        <p>
                                            <i className="fa fa-star text-danger"></i> &nbsp;
                                            <strong className="text-danger">{TrangThai}</strong>
                                        </p>
                                    </Media.Body>
                                </Media>
                            </Col>
                        );
                    })
                ) : (
                    <h3>Loading...</h3>
                )}
            </React.Fragment>
        );

    }
}
