import React, { useState } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

const SideMenu = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isServidoresOpen, setIsServidoresOpen] = useState(true);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleServidoresMenu = () => {
        setIsServidoresOpen(!isServidoresOpen);
    };

    return (
        <div className='SideMenu'>
            <div className={`side-menu ${isOpen ? 'open' : 'close'}`}>
                <h2>Menu</h2>
                <ul>
                    <li onClick={toggleServidoresMenu}>Servidores</li>
                    {isServidoresOpen && (
                        <ul className='sub-menu'>
                            <Link to="/servidores"><li>Servidores Alugados</li></Link>
                            <Link to="/servidores/all"><li>Todos os Servidores</li></Link>
                        </ul>
                    )}
                    <Link to="/empresas"><li>Empresas</li></Link>
                    <Link to="/tags"><li>Tags</li></Link>
                </ul>
            </div>
            <div className='menu'>
                <button className="menu-toggle" onClick={toggleMenu}>
                    {isOpen ? 'X' : '☰'}
                </button>
            </div>
        </div>
    );
};

export default SideMenu;
