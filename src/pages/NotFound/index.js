import React from 'react';
import './index.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function NotFound () {
    return (
        <div className="NotFound">
            <Header />
                <img alt='Página não encontrada' src='/assets/images/notfoundimg.png'></img>
            <Footer />
        </div>
    );
};
