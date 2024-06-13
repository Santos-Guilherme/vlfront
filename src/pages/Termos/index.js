import React from 'react';
import './index.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Termo() {
    return (
        <div className='Termo'>
            <Header />
            <section className='secao1'>
                <h1>Termos e Condições</h1>
            </section>
            <section className='secao2'>
                <div>
                    <h2>1. Introdução</h2>
                    <p>
                        Bem-vindo à Visionary Labs. Estes termos e condições descrevem as regras e regulamentos para o uso do site da Visionary Labs.
                    </p>
                </div>
                <div>
                    <h2>2. Direitos de Propriedade Intelectual</h2>
                    <p>
                        Salvo disposição em contrário, a Visionary Labs e/ou seus licenciados possuem os direitos de propriedade intelectual de todo o material no site.
                    </p>
                </div>
                <div>
                    <h2>3. Restrições</h2>
                    <p>
                        Você está expressamente restrito de todas as seguintes ações:
                        <ul>
                            <li>Publicar qualquer material do site em qualquer outra mídia;</li>
                            <li>Vender, sublicenciar e/ou comercializar qualquer material do site;</li>
                            <li>Usar este site de maneira que seja prejudicial, ou que possa ser prejudicial, a este site;</li>
                            <li>Usar este site de maneira contrária às leis e regulamentos aplicáveis;</li>
                        </ul>
                    </p>
                </div>
                <div>
                    <h2>4. Conteúdo do Usuário</h2>
                    <p>
                        Em certas áreas deste site, os usuários podem verificar informações da empresa, assim como solicitar contato, buscando informações ou enviando feedbacks.
                    </p>
                </div>
                <div>
                    <h2>5. Isenção de Responsabilidade</h2>
                    <p>
                        Na máxima extensão permitida pela lei aplicável, excluímos todas as representações, garantias e condições relativas ao nosso site e ao uso deste site.
                    </p>
                </div>
                <div>
                    <h2>6. Alterações aos Termos</h2>
                    <p>
                        A Visionary Labs está autorizada a revisar estes termos a qualquer momento, conforme achar adequado, e, ao usar este site, espera-se que você revise esses termos regularmente.
                    </p>
                </div>
                <div>
                    <h2>7. Contato</h2>
                    <p>
                        Se você tiver alguma dúvida sobre estes Termos, entre em contato conosco através do email: contato@visionarylabs.com.
                    </p>
                </div>
            </section>
            <Footer />
        </div>
    );
}
