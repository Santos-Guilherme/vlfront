import React from 'react';
import './styles/reset.css';
import './styles/fonts.css';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Login from './pages/Login';
import Empresas from './pages/Empresas';
import Termo from './pages/Termos';
import Segmentos from './pages/Segmentos';
import ServidoresAlugados from './pages/ServidoresAlugados';
import Servidores from './pages/Servidores';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

import EditarEmpresa from './pages/EditarEmpresa';
import EditarServidores from './pages/EditarServidores';
import NotFound from './pages/NotFound';
import PrivateRoute from './privateRoutes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path='/sobre' element={<Sobre />} />
        <Route path="/regulamento" element={<Termo />} />
        <Route path='/login' element={<Login />} />

        <Route path='/servidores' element={<PrivateRoute element={ServidoresAlugados} />} />
        <Route path="/servidores/all" element={<PrivateRoute element={Servidores} />} />
        <Route path="/empresas" element={<PrivateRoute element={Empresas} />} />
        <Route path="/empresas/:id" element={<PrivateRoute element={EditarEmpresa} />} />
        <Route path="/servidores/:id" element={<PrivateRoute element={EditarServidores} />} />
        <Route path="/tags" element={<PrivateRoute element={Segmentos} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
