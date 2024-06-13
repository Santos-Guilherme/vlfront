import React, { useState, useEffect } from 'react';
import './index.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SideMenu from '../../components/SideMenu';
import CardEmpresa from '../../components/CardEmpresa';
import EmpresasCadastro from '../../components/EmpresasCadastro';
import { listarEmpresas, removerEmpresa, buscarEmpresaPorNome, buscarEmpresaPorTagId, buscarEmpresaPorId } from '../../Api/empresaApi';
import { listarServidoresPorEmpresa } from '../../Api/servidorApi';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { listarTags } from '../../Api/tagApi';
import { useNavigate } from 'react-router-dom';

export default function Empresas() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const [filterNome, setFilterNome] = useState('');
    const [filterTagId, setFilterTagId] = useState('');
    const [filterId, setFilterId] = useState('');
    const [tags, setTags] = useState([]);
    const [noResultsMessage, setNoResultsMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        listaEmpresas();
        listarTodasTags();
    }, []);

    const listaEmpresas = async () => {
        try {
            const listaDeEmpresas = await listarEmpresas();
            setCompanies(listaDeEmpresas);
            setFilteredCompanies(listaDeEmpresas);
            setNoResultsMessage('');
        } catch (error) {
            toast.error('Erro ao buscar empresas');
        }
    };

    const listarTodasTags = async () => {
        try {
            const tagsDisponiveis = await listarTags();
            setTags(tagsDisponiveis);
        } catch (error) {
            toast.error('Erro ao buscar tags');
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleEditCompany = (id) => {
        navigate(`/empresas/${id}`);
    };

    const handleDeleteCompany = async (id) => {
        try {
            const servidoresDaEmpresa = await listarServidoresPorEmpresa(id);
            if (servidoresDaEmpresa.length > 0) {
                toast.error('Não é possível deletar a empresa. Existem servidores associados a ela.');
                return;
            }

            confirmAlert({
                title: 'Confirmar Exclusão',
                message: 'Tem certeza que deseja excluir esta empresa?',
                buttons: [
                    {
                        label: 'Sim',
                        onClick: async () => {
                            await removerEmpresa(id);
                            const updatedCompanies = companies.filter(company => company.id !== id);
                            setCompanies(updatedCompanies);
                            applyFilters(updatedCompanies);
                            toast.success('Empresa removida com sucesso');
                        }
                    },
                    {
                        label: 'Não',
                        onClick: () => { }
                    }
                ]
            });

        } catch (error) {
            toast.error('Erro ao deletar empresa');
        }
    };

    const handleFilterNomeChange = async (e) => {
        const nome = e.target.value.trim();
        setFilterNome(nome);

        if (nome === '') {
            applyFilters(companies);
        } else {
            try {
                const filtered = await buscarEmpresaPorNome(nome);
                applyFilters(filtered);
                if (filtered.length === 0) {
                    setNoResultsMessage('Nenhuma empresa encontrada com este nome.');
                } else {
                    setNoResultsMessage('');
                }
            } catch (error) {
                console.log("Erro ao filtrar empresas por nome");
            }
        }
    };

    const handleFilterTagIdChange = async (e) => {
        const tagId = e.target.value;
        setFilterTagId(tagId);

        if (tagId === '') {
            applyFilters(companies);
        } else {
            try {
                const filtered = await buscarEmpresaPorTagId(tagId);
                applyFilters(filtered);
                if (filtered.length === 0) {
                    setNoResultsMessage('Nenhuma empresa encontrada com esta tag.');
                } else {
                    setNoResultsMessage('');
                }
            } catch (error) {
                toast.error('Erro ao filtrar empresas por ID da Tag');
            }
        }
    };

    const handleFilterIdChange = async (e) => {
        const id = e.target.value.trim();
        setFilterId(id);

        if (id === '') {
            listarEmpresas();
        } else {
            try {
                const empresa = await buscarEmpresaPorId(id);
                if (empresa) {
                    applyFilters([empresa]);
                    setNoResultsMessage('');
                } else {
                    applyFilters([]);
                    setNoResultsMessage('Nenhuma empresa encontrada com este ID.');
                }
            } catch (error) {
                toast.error('Erro ao buscar empresa por ID');
            }
        }
    };

    const applyFilters = (filtered) => {
        setFilteredCompanies(filtered);
    };

    return (
        <div className='Empresas'>
            <Header />
            <div className='content-empresas'>
                <SideMenu />
                <div className='info-empresas'>
                    <div className='content-titulo'>
                        <div></div>
                        <div>
                            <h2>Empresas</h2>
                        </div>
                        <div>
                            <button onClick={handleOpenModal} className='button-cadastroEmpresas'>Cadastrar</button>
                        </div>
                    </div>
                    <div className='filters'>
                        <input
                            type="text"
                            placeholder="Filtrar por nome"
                            value={filterNome}
                            onChange={handleFilterNomeChange}
                        />
                        <select
                            value={filterTagId}
                            onChange={handleFilterTagIdChange}
                        >
                            <option value="">Filtrar por Tag</option>
                            {tags.map(tag => (
                                <option key={tag.id} value={tag.id}>{tag.nome}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="Filtrar por ID da Empresa"
                            value={filterId}
                            onChange={handleFilterIdChange}
                        />
                    </div>
                    {noResultsMessage ? (
                        <div className="no-results-message">
                            {noResultsMessage}
                        </div>
                    ) : (
                        <div className='profile-list'>
                            {filteredCompanies.map((company, index) => (
                                <CardEmpresa
                                    key={index}
                                    id={company.id}
                                    image={company.logo}
                                    nomeEmpresa={company.nome}
                                    cnpj={company.cnpj}
                                    setorEmpresa={company.nome_tag}
                                    onEdit={handleEditCompany}
                                    onDelete={() => handleDeleteCompany(company.id)} // Passando a função com id diretamente
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
            <ToastContainer />
            <EmpresasCadastro isOpen={isModalOpen} onClose={handleCloseModal} updateParent={listarEmpresas} />
        </div>
    );
}
