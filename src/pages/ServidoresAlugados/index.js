import React, { useState, useEffect } from 'react';
import './index.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SideMenu from '../../components/SideMenu';
import ServidorStatus from '../../components/ServidorStatus';
import { listarServidoresAtivados, listarServidoresAtivadosPorStatus, atualizarServidor } from '../../Api/servidorApi';

export default function ServidoresAlugados() {
    const [servidores, setServidores] = useState([]);
    const [selectedServer, setSelectedServer] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('');

    const fetchServidores = async () => {
        try {
            const servidoresAtivos = await listarServidoresAtivados();
            setServidores(servidoresAtivos);
        } catch (error) {
            console.error('Erro ao buscar servidores:', error);
        }
    };

    useEffect(() => {
        
        fetchServidores();
    }, []);

    const handleStatusChange = async (e) => {
        const status = e.target.value;
        setSelectedStatus(status);

        try {
            if (status) {
                const servidoresFiltrados = await listarServidoresAtivadosPorStatus(status);
                setServidores(servidoresFiltrados);
            } else {
                const servidoresAtivos = await listarServidoresAtivados();
                setServidores(servidoresAtivos);
            }
        } catch (error) {
            console.error('Erro ao filtrar servidores por status:', error);
        }
    };

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'online':
                return 'status-online';
            case 'offline':
                return 'status-offline';
            case 'em manutenção':
                return 'status-em-manutencao';
            default:
                return '';
        }
    };

    const handleUpdate = (server) => {
        setSelectedServer(server);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedServer(null);
        fetchServidores();
    };

    const handleSaveServer = async (updatedServer) => {
        try {
            await atualizarServidor(updatedServer.id, updatedServer); 
            console.log('Servidor atualizado:', updatedServer);
            setIsModalOpen(false);
            setSelectedServer(null);
            fetchServidores();
        } catch (error) {
            console.error('Erro ao salvar servidor:', error);
        }
    };

    return (
        <div className='Servidores'>
            <Header />
            <div className='content-servidores'>
                <SideMenu />
                <div className='info-servidores'>
                    <div className='content-titulo'>
                        <div></div>
                        <div>
                            <h2>Lista de Servidores em Uso</h2>
                        </div>
                        <div>
                            <select value={selectedStatus} onChange={handleStatusChange}>
                                <option value="">Todos os Status</option>
                                <option value="Online">Online</option>
                                <option value="Offline">Offline</option>
                                <option value="Em Manutenção">Em Manutenção</option>
                            </select>
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Especificações</th>
                                <th>Localização</th>
                                <th>Status</th>
                                <th>Empresa</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {servidores.map((servidor) => (
                                <tr key={servidor.id}>
                                    <td>{servidor.id}</td>
                                    <td>{servidor.especificacoes}</td>
                                    <td>{servidor.localizacao}</td>
                                    <td>
                                        <span className={`status-indicator ${getStatusClass(servidor.status)}`}></span>
                                        {servidor.status}
                                    </td>
                                    <td>{servidor.empresa_nome || 'Desativado'}</td>
                                    <td>
                                        <button onClick={() => handleUpdate(servidor)}>Atualizar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
            {isModalOpen && (
                <ServidorStatus
                    server={selectedServer}
                    onClose={handleCloseModal}
                    onSave={handleSaveServer}
                />
            )}
        </div>
    );
}
