// open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security

import './App.css';
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Trangchu from './components/Pages/Trangchu';
import Dangtinmienphi from './components/Pages/Dangtinmienphi';
import Danhmucchothue from './components/Pages/Danhmucchothue';
import Khongtimthay from './components/Pages/Khongtimthay';
import Chitiet from './components/Pages/Chitiet';
import Dangky from './components/Pages/Dangky';
import Dangnhap from './components/Pages/Dangnhap';
import Thongtinchutro from './components/Pages/Thongtinchutro';
import AdMin from './components/Pages/AdMin';
import CapNhatThongTin from './components/Pages/CapNhatThongTin';
import ThayDoiMatKhau from './components/Pages/ThayDoiMatKhau';
import QuenMatKhau from './components/Pages/QuenMatKhau';
import MatKhauMoi from './components/Pages/MatKhauMoi';


function App() {

  return (
    <div>
      <Switch>
        <Route exact path="/" component={Trangchu} />
        <Route exact path="/capnhatthongtin" component={CapNhatThongTin} />
        <Route exact path="/thaydoimatkhau/:id" component={ThayDoiMatKhau} />
        <Route exact path="/quenmatkhau" component={QuenMatKhau} />
        <Route path="/dangtinmienphi" component={Dangtinmienphi} />
        <Route path="/matkhaumoi/:id" component={MatKhauMoi} />

        <Route path="/danhmucchothue" component={Danhmucchothue}/>
        <Route path="/chitiet/:id" component={Chitiet} />
        <Route path="/dangnhap" component={Dangnhap} />
        <Route path="/dangky" component={Dangky} />
        <Route path="/thongtinchutro" component={Thongtinchutro} />
        <Route path="/admin" component={AdMin} />
        <Route path="/thongtincanhan/:id" component={Thongtinchutro} />
        <Route path="/quanlycacbaiviet/:id" component={Thongtinchutro} />


        <Route component={Khongtimthay} />
      </Switch>
    </div>
  );
}

export default App;
