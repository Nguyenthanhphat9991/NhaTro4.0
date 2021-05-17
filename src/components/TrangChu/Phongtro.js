import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CardGroup, Card } from 'react-bootstrap';

function Phongtro() {
    const [isLoading, setIsLoading] = useState(true)
    const [phongtro, setphongtro] = useState([])
    const [error] = useState(null)

    useEffect(() => {
        getPhongTro()
    }, [])


    async function getPhongTro() {
        try {
            const res = await fetch(`http://phatnguyen.nikinpham.com/be/public/index.php/api/phongtro/dulieutrangchu`);
            const json = await res.json();
            setphongtro(json)
            setIsLoading(false)
        } catch (err) {
            console.error('err', err);
        }
    }

    return (
        <React.Fragment >
            <h3 id="thongtinphongtro" style={{ backgroundColor: "#f2f2f2", color: "#83BFA6" }} className="heading mt-5 mb-0 pt-2 text-center">Phòng trọ mới nhất</h3>
            {error ? <p>{error.message}</p> : null}
            {!isLoading ?
                (
                    phongtro.map(phongtros => {
                        const { TieuDe, MoTa, HinhAnh } = phongtros;
                        let lowercasetext = TieuDe.toLowerCase();
                        var a = lowercasetext.match(/.{1,25}/g);
                        var b = MoTa.match(/.{1,110}/g);
                        return (
                            <CardGroup key={phongtros.PhongTroID} style={{ backgroundColor: "#f2f2f2" }} className="col-lg-4 m-auto mt-0 pb-3" >
                                <Card  className="mt-3 mb-3" style={{ width: '30rem' }}>
                                    <Card.Img style={{
                                        "width": "100 %",
                                        "height": "15vw",
                                        "fit": "cover"
                                    }}
                                        src={HinhAnh} alt={TieuDe} />
                                    <Card.Body>
                                        <Card.Title style={{ 'textTransform': 'capitalize' }}>{a[0] + "..."}</Card.Title>
                                        <Card.Text>
                                            {b[0] + "..."}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Link className="btn btn-outline-primary"
                                            to={{ pathname: `/chitiet/${phongtros.PhongTroID}`, query: { id: phongtros.PhongTroID } }}
                                        >Xem Chi Tiết</Link>
                                    </Card.Footer>
                                </Card>
                            </CardGroup>
                        );
                    })
                ) :
                (
                    <>
                        <div className="col-4">
                        </div>
                        <div className="col-4 text-center mt-3">
                            <div className="spinner-grow text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            <div className="spinner-grow text-secondary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            <div className="spinner-grow text-success" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            <div className="spinner-grow text-danger" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            <div className="spinner-grow text-warning" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            <div className="spinner-grow text-info" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            <div className="spinner-grow text-light" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                        <div className="col-4">
                        </div>
                    </>
                )}
        </React.Fragment>
    );
    // }
}
export default Phongtro;