import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import { buscarEmpresasVisiveis } from '../../Api/empresaApi';
import { API_ADDRESS } from '../../Api/constant';

export default function Home() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [empresasVisiveis, setEmpresasVisiveis] = useState([]);

    useEffect(() => {
        const listarEmpresasVisiveis = async () => {
            try {
                const empresas = await buscarEmpresasVisiveis();
                if (empresas && Array.isArray(empresas)) {
                    setEmpresasVisiveis(empresas.slice(0, 5)); 
                } else {
                    console.error('O resultado de buscarEmpresasVisiveis não é um array válido:', empresas);
                }
            } catch (error) {
                console.error('Erro ao buscar empresas visíveis:', error.message);
            }
        };

        listarEmpresasVisiveis();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.send('service_ez87thj', 'template_vkpouvs', {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
        }, 'pYdfERSSE6s6TWMXx')
        .then((result) => {
            toast.success('Mensagem enviada com sucesso!');
            setFormData({ name: '', email: '', message: '' });
        })
        .catch((error) => {
            toast.error('Erro ao enviar a mensagem, tente novamente.');
        });
    };

    return (
        <div className='Home'>
            <Header />            
            <section className='secao1'>
                <h1>Visionary Labs</h1>
            </section>
            
            <section className='secao2'>
                <div className='image-container'>
                    <img alt='Imagem seção 2' src='/assets/images/home-secao3.jpg' />
                </div>
                <div className='text-container'>
                    <p>
                        Na Visionary Labs, transformamos soluções em desempenho, e desempenho em confiança.
                    </p>
                </div>
            </section>
            <section className='secao3'>
                
                <div className='text-container'>
                    <p>
                        Bem-vindo à Visionary Labs, onde a excelência é nossa prioridade. Somos uma equipe dedicada que entende a importância dos serviços de servidores para o sucesso do seu negócio. Junte-se a nós nesta jornada para construir um futuro tecnológico seguro e estável.
                    </p>
                    <Link to='/sobre'>Saiba mais...</Link>
                </div>
                <div className='image-container'>
                    <img alt='Imagem seção 3' src='/assets/images/home-secao5.png' />
                </div>
            </section>
            <section className='secao4'>
                <div>
                    <h2>Clientes Satisfeitos</h2>
                </div>
                <div className='logos-empresas'>
                    {empresasVisiveis && empresasVisiveis.map(empresa => (
                        <img key={empresa.id} alt={`Logo ${empresa.nome}`} src={`${API_ADDRESS}/${empresa.logo}`} />
                    ))}
                </div>
            </section>
            
            <section className='secao5'>
                <div className='contact-container'>
                    <h2>Entre em Contato</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type='text'
                            name='name'
                            placeholder='Seu Nome'
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type='email'
                            name='email'
                            placeholder='Seu Email'
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            name='message'
                            placeholder='Sua Mensagem'
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                        <button type='submit'>Enviar</button>
                    </form>
                </div>
            </section>
            <Footer />
            <ToastContainer />
        </div>
    );
}
