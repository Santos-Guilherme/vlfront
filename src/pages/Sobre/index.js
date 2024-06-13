import React from 'react';
import './index.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Sobre() {
    return (
        <div className='Sobre'>
            <Header />
            <section className='secao1'>
                <h1>Sobre</h1>
            </section>
            <section className='conteudo'>
                <div className='paragrafo'>
                    <p>Na Visionary Labs, transformamos ideias em inovação e inovação em impacto. Fundada com o propósito de ser um catalisador de transformação tecnológica, nossa missão é fornecer soluções de desenvolvimento de ponta para empresas que desejam se destacar em um mercado competitivo.</p>
                </div>
                <div className='paragrafo'>
                    <p>Somos mais do que uma empresa de tecnologia; somos visionários que veem o potencial de cada ideia e a transformam em realidade. Acreditamos no poder da tecnologia para impulsionar a transformação e estamos comprometidos em moldar o futuro da indústria tecnológica.</p>
                </div>
                <div className='paragrafo'>
                    <p>Nossa equipe é composta por profissionais apaixonados e experientes que compartilham uma visão comum: a de inovar continuamente. Desde desenvolvedores e designers até estrategistas de negócios, todos na Visionary Labs trabalham em sinergia para entregar projetos que não apenas atendem, mas superam as expectativas de nossos clientes.</p>
                </div>
                <div className='paragrafo'>
                    <p>Especializamo-nos no desenvolvimento de soluções customizadas que vão desde aplicativos móveis e sistemas de gerenciamento até plataformas complexas de e-commerce e soluções de inteligência artificial. Cada projeto é tratado como único, garantindo que cada solução seja adaptada às necessidades específicas de nossos clientes.</p>
                </div>
                <div className='paragrafo'>
                    <p>Estamos sempre na vanguarda das tecnologias emergentes, buscando constantemente maneiras de melhorar e inovar. Nos comprometemos com a excelência em tudo o que fazemos, desde o primeiro contato até o suporte pós-lançamento. Acreditamos no poder da colaboração, tanto internamente quanto com nossos clientes, para alcançar os melhores resultados. Operamos com transparência e honestidade, construindo relacionamentos de confiança a longo prazo.</p>
                </div>
                <div className='paragrafo'>
                    <p>Junte-se a nós nesta jornada para moldar o futuro da indústria tecnológica. Se você tem uma ideia inovadora ou um desafio complexo, estamos aqui para ajudar. Na Visionary Labs, sua visão é nossa missão.</p>
                </div>
            </section>
            <Footer />
        </div>
    );
}
