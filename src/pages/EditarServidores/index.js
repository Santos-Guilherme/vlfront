import React, { useState, useEffect } from 'react';
import './index.scss';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { atualizarServidor, buscarServidorPorId } from '../../Api/servidorApi';
import { listarEmpresas } from '../../Api/empresaApi'; 
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SideMenu from '../../components/SideMenu';

const ESTADOS_API_URL = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

export default function EditarServidores() {
    const { id } = useParams();
    const [especificacoes, setEspecificacoes] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [localizacao, setLocalizacao] = useState('');
    const [estado, setEstado] = useState('');
    const [empresas, setEmpresas] = useState([]);
    const [empresaId, setEmpresaId] = useState(null);
    const [status, setStatus] = useState('');
    const [historicoManutencao, setHistoricoManutencao] = useState('');
    const [estados, setEstados] = useState([]);

    useEffect(() => {
        const listarServidor = async () => {
            try {
                const servidor = await buscarServidorPorId(id);
                setEspecificacoes(servidor.especificacoes);
                setLocalizacao(servidor.localizacao);
                setEstado(servidor.localizacao.split(', ')[0]);
                setEmpresaId(servidor.empresa_id);
                setStatus(servidor.status);
                setHistoricoManutencao(servidor.historico_manutencao);
            } catch (error) {
                toast.error('Erro ao buscar servidor');
            }
        };

        const listarEstados = async () => {
            try {
                const response = await fetch(ESTADOS_API_URL);
                const data = await response.json();
                setEstados(data);
            } catch (error) {
                toast.error('Erro ao buscar estados');
            }
        };

        const listarTodasEmpresas = async () => {
            try {
                const data = await listarEmpresas();
                setEmpresas(data);
            } catch (error) {
                toast.error('Erro ao buscar empresas');
            }
        };

        listarServidor();
        listarEstados();
        listarTodasEmpresas();
    }, [id]);

    const handleUpdate = async () => {
        if (!especificacoes || !estado || !empresaId) {
            toast.error('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        if (empresaId !== 'Desativado' && !status) {
            toast.error('Por favor, selecione um status para a empresa ativa.');
            return;
        }

        try {
            const dados = {
                especificacoes,
                localizacao: `${estado}, Brasil`,
                status,
                empresa_id: empresaId === 'Desativado' ? null : empresaId,
                historico_manutencao: historicoManutencao
            };
            if (empresaId === 'Desativado') {
                dados.status = 'Desativado';
            }
            await atualizarServidor(id, dados);
            toast.success('Servidor atualizado com sucesso');
        } catch (error) {
            toast.error('Erro ao atualizar servidor');
        }
    };

    return (
        <div className="EditarServidores">
            <Header />
            <div className="content-editarservidores">
                <SideMenu />
                <div className="info-editarservidores">
                    <h2>Editar Servidor</h2>
                    <div className="content-forms">
                        <label htmlFor="especificacoes">Especificações</label>
                        <textarea
                            id="especificacoes"
                            value={especificacoes}
                            onChange={(e) => setEspecificacoes(e.target.value)}
                            placeholder="Especificações"
                        />
                        <label htmlFor="estado">Estado</label>
                        <select
                            id="estado"
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                        >
                            <option value="">Selecione um Estado</option>
                            {estados.map(uf => (
                                <option key={uf.sigla} value={uf.nome}>
                                    {uf.nome}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="empresa">Empresa</label>
                        <select
                            id="empresa"
                            value={empresaId}
                            onChange={(e) => setEmpresaId(e.target.value)}
                        >
                            <option value="">Selecione uma Empresa</option>
                            <option value="Desativado">Desativado</option>
                            {empresas.map(empresa => (
                                <option key={empresa.id} value={empresa.id}>
                                    {empresa.nome}
                                </option>
                            ))}
                        </select>
                        {empresaId && empresaId !== 'Desativado' && (
                            <>
                                <label htmlFor="status">Status</label>
                                <select
                                    id="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="">Selecione um Status</option>
                                    <option value="Online">Online</option>
                                    <option value="Offline">Offline</option>
                                    <option value="Em Manutenção">Em Manutenção</option>
                                </select>
                            </>
                        )}
                        <label htmlFor="historicoManutencao">Histórico de Manutenção</label>
                        <textarea
                            id="historicoManutencao"
                            value={historicoManutencao}
                            onChange={(e) => setHistoricoManutencao(e.target.value)}
                            placeholder="Histórico de Manutenção"
                        />
                        <button onClick={handleUpdate}>Salvar</button>
                    </div>
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </div>
    );
}
