import React, { useState } from 'react';
import './index.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { buscarLogin } from '../../Api/loginApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const loginData = { "nome": username, "senha": password };
            const response = await buscarLogin(loginData);
            if (response && response.token) {
                localStorage.setItem('authToken', response.token);
                navigate('/servidores');
            } else {
                toast.error('Erro ao realizar login');
            }
        } catch (error) {
            toast.error('Erro ao realizar login');
        }
    };

    return (
        <div className="Login">
            <Header />
            <div className='div-container'>
                <form className="login-form" onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Entrar</button>
                </form>
            </div>
            <Footer />
            <ToastContainer />
        </div>
    );
};

export default Login;
