import React from 'react';
import './index.scss';

const Footer = () => {
    return (
        <footer className="Footer">
            <div className="links">
                <a href="/sobre">Sobre</a>
                <a href="/regulamento">Termos e Condições</a>
            </div>
            <div>
                <img src="/assets/images/logo.png" alt="Logo" />
                <p>© 2024 Visionary Labs. Todos os direitos reservados.</p>
            </div>
            <div className="company-info">
                <p>Rua Exemplo, 123 - Cidade, Estado</p>
                <p>Email: contato@visionarylabs.com</p>
                <p>Telefone: (11) 1234-5678</p>
            </div>
        </footer>
    );
};

export default Footer;
