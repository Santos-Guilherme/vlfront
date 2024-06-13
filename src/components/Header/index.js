import React from 'react';
import './index.scss';
import { Link, useNavigate } from 'react-router-dom';
import isAuthenticated from '../../auth';

export default function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    return (
        <div className='Header'>
            <div className='content-header'>
                <div className='div-header'>
                    <Link to="/"><img className='logo' src='/assets/images/logo.png' alt='logo' /></Link>
                </div>
                <div className='div-header div-content'>
                    <Link to="/">Home</Link>
                    <Link to="/sobre">Sobre</Link>
                </div>
                <div className='div-header'>
                    {isAuthenticated() ? (
                        <div className='div-logado'>
                            <Link to="/servidores">Admin</Link>
                            <button onClick={handleLogout} className="logout-button">Sair</button>
                        </div>
                    ) : (
                        <Link to="/login" className='button-login'>Login</Link>
                    )}
                </div>
            </div>
        </div>
    );
}
