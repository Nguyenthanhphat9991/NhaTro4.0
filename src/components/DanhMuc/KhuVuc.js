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
        if (value === 'vinhhoa') {
            this.vinhhoa()
        } else if (value === 'vinhhai') {
            this.vinhhai()
        }
    }

    vinhhoa() {
        fetch(`http://phatnguyen.nikinpham.com/be/public/index.php/api/khuvuc/vinhhoa`)
            .then(response => response.json())
            .then(data =>
                this.setState({
                    phongtro: data,
                    isLoading: false,
                })
            )
            .catch(error => this.setState({ error, isLoading: false }));
    }

    vinhhai() {
        fetch(`http://phatnguyen.nikinpham.com/be/public/index.php/api/khuvuc/vinhhai`)
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
        this.vinhhai();
    }

    render() {
        const { isLoading, phongtro, error } = this.state;
        // console.log(this.state)
        return (
            <React.Fragment>
                <Col sm={5} className="ml-5">
                    <Form.Row>
                        <Form.Group>
                            <Form.Label style={{ width: "200px" }}>Sắp xếp mặc định</Form.Label>
                            <select onChange={this.handleChange} className="form-control custom-select">
                                <option value="vinhhai">Vĩnh Hải</option>
                                <option value="vinhhoa">Vĩnh Hoà</option>
                            </select>
                        </Form.Group>
                    </Form.Row>
                </Col>
                {error ? <p>{error.message}</p> : null}
                {!isLoading ? (
                    phongtro.map(phongtros => {
                        const { TieuDe, MoTa, HinhAnh, TenKhuVuc, TrangThai } = phongtros;
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
                                            <i className="fa fa-map-marker"></i> &nbsp;
                                            <strong>{TenKhuVuc}</strong>
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
