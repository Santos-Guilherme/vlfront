import React, { useState, useEffect } from 'react';
import './index.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SideMenu from '../../components/SideMenu';
import CardServidor from '../../components/CardServidor';
import ServidoresCadastro from '../../components/ServidoresCadastro';
import { listarServidores, atualizarServidor, removerServidor, listarServidoresDesativados, listarServidoresPorEmpresa } from '../../Api/servidorApi';
import { listarEmpresas } from '../../Api/empresaApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Servidores() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [servers, setServers] = useState([]);
    const [filteredServers, setFilteredServers] = useState([]);
    const [filterEmpresaId, setFilterEmpresaId] = useState('');
    const [empresas, setEmpresas] = useState([]);

    useEffect(() => {
        listarTodosServidores();
        fetchEmpresas();
    }, []);

    const listarTodosServidores = async () => {
        try {
            const listaDeServidores = await listarServidores();
            setServers(listaDeServidores);
            setFilteredServers(listaDeServidores);
        } catch (error) {
            toast.error('Erro ao buscar servidores');
        }
    };

    const fetchEmpresas = async () => {
        try {
            const listaDeEmpresas = await listarEmpresas();
            setEmpresas(listaDeEmpresas);
        } catch (error) {
            toast.error('Erro ao buscar empresas');
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveServer = async (novoServidor) => {
        try {
            setServers([...servers, novoServidor]);
            toast.success('Servidor cadastrado com sucesso');
        } catch (error) {
            toast.error('Erro ao cadastrar servidor');
        }
    };

    const handleEditServer = async (id, serverName, serverLocation, serverStatus) => {
        try {
            await atualizarServidor(id, { especificacoes: serverName, localizacao: serverLocation, status: serverStatus });
            const updatedServers = servers.map(server =>
                server.id === id ? { ...server, especificacoes: serverName, localizacao: serverLocation, status: serverStatus } : server
            );
            setServers(updatedServers);
            applyFilters(updatedServers);
            toast.success('Servidor atualizado com sucesso');
        } catch (error) {
            toast.error('Erro ao atualizar servidor');
        }
    };

    const handleDeleteServer = async (id) => {
        try {
            const serverToDelete = servers.find(server => server.id === id);
            if (serverToDelete && serverToDelete.status.toLowerCase() === 'online') {
                toast.error('Não é possível deletar um servidor online.');
                return;
            }

            confirmAlert({
                title: 'Confirmação',
                message: 'Você tem certeza que deseja deletar este servidor?',
                buttons: [
                    {
                        label: 'Sim',
                        onClick: async () => {
                            await removerServidor(id);
                            const updatedServers = servers.filter(server => server.id !== id);
                            setServers(updatedServers);
                            applyFilters(updatedServers);
                            toast.success('Servidor removido com sucesso');
                        }
                    },
                    {
                        label: 'Não',
                        onClick: () => {}
                    }
                ]
            });
        } catch (error) {
            toast.error('Erro ao deletar servidor');
        }
    };

    const handleFilterEmpresaChange = async (e) => {
        const value = e.target.value;

        if (value === 'desativado') {
            try {
                const servidoresDesativados = await listarServidoresDesativados();
                setFilteredServers(servidoresDesativados);
            } catch (error) {
                toast.error('Erro ao buscar servidores desativados');
            }
        } else {
            const empresaId = parseInt(value, 10);
            if (empresaId) {
                try {
                    const servidoresPorEmpresa = await listarServidoresPorEmpresa(empresaId);
                    setFilteredServers(servidoresPorEmpresa);
                } catch (error) {
                    toast.error('Erro ao buscar servidores por empresa');
                }
            } else {
                setFilteredServers(servers);
            }
        }

        setFilterEmpresaId(value);
    };

    const applyFilters = (filtered) => {
        setFilteredServers(filtered);
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
                            <h2>Servidores</h2>
                        </div>
                        <div>
                            <button onClick={handleOpenModal} className='button-cadastroServidor'>Cadastrar</button>
                        </div>
                    </div>
                    <div className='filters'>
                        <label>
                            Empresa:
                            <select name="empresa_id" value={filterEmpresaId} onChange={handleFilterEmpresaChange}>
                                <option value="">Todas</option>
                                <option value="desativado">Desativado</option>
                                {empresas.map(empresa => (
                                    <option key={empresa.id} value={empresa.id}>{empresa.nome}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div className='profile-list'>
                        {filteredServers.map((server, index) => (
                            <CardServidor
                                key={index}
                                id={server.id}
                                nome={server.especificacoes}
                                localizacao={server.localizacao}
                                status={server.status}
                                onEdit={handleEditServer}
                                onDelete={handleDeleteServer}
                                empresa={server.empresa_nome}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
            <ToastContainer />
            <ServidoresCadastro isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveServer} />
        </div>
    );
}
