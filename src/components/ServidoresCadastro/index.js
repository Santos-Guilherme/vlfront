import React, { useState, useEffect } from 'react';
import './index.scss';
import { salvarServidor } from '../../Api/servidorApi';
import { listarEmpresas } from '../../Api/empresaApi';

const ESTADOS_API_URL = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

export default function ServidoresCadastro({ isOpen, onClose, onSave }) {
    const [form, setForm] = useState({
        especificacoes: '',
        localizacao: '',
        status: '',
        empresa_id: '',
        historicoManutencao: '',
        estado: ''
    });

    const [empresas, setEmpresas] = useState([]);
    const [estados, setEstados] = useState([]);

    useEffect(() => {
        const fetchEmpresas = async () => {
            try {
                const listaDeEmpresas = await listarEmpresas();
                setEmpresas(listaDeEmpresas);
            } catch (error) {
                console.error('Erro ao buscar empresas:', error.message);
            }
        };

        const fetchEstados = async () => {
            try {
                const response = await fetch(ESTADOS_API_URL);
                const data = await response.json();
                setEstados(data);
            } catch (error) {
                console.error('Erro ao buscar estados:', error.message);
            }
        };

        fetchEmpresas();
        fetchEstados();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleEmpresaChange = (e) => {
        const { value } = e.target;
        if (value === 'null') {
            setForm({ ...form, empresa_id: null, status: 'Desativado' });
        } else {
            setForm({ ...form, empresa_id: value, status: '' });
        }
    };

    const handleStatusChange = (e) => {
        const { value } = e.target;
        setForm({ ...form, status: value });
    };

    const handleEstadoChange = (e) => {
        const { value } = e.target;
        setForm({ ...form, estado: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { especificacoes, status, empresa_id, estado } = form;
            const localizacaoCompleta = `${estado}, Brasil`;
            const dataHoraCadastro = new Date().toLocaleString();
            const historico_manutencao = `Configuração inicial feita em ${dataHoraCadastro}`;
            const novoServidor = await salvarServidor({ especificacoes, localizacao: localizacaoCompleta, status, empresa_id, historico_manutencao });
            onSave(novoServidor);
            onClose();
            setForm({
                especificacoes: '',
                localizacao: '',
                status: '',
                empresa_id: '',
                historicoManutencao: '',
                estado: ''
            });
        } catch (error) {
            console.error('Erro ao salvar servidor:', error.message);
        }
    };

    const handleCancel = () => {
        setForm({
            especificacoes: '',
            localizacao: '',
            status: '',
            empresa_id: '',
            historicoManutencao: '',
            estado: ''
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="ServidoresCadastro">
            <div className="servidores-cadastro-content">
                <button className="close-button" onClick={handleCancel}>X</button>
                <h2>Cadastrar Servidor</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Especificações:
                        <input name="especificacoes" value={form.especificacoes} onChange={handleChange} required />
                    </label>
                    <label>
                        Estado:
                        <select name="estado" value={form.estado} onChange={handleEstadoChange} required>
                            <option value="">Selecione o Estado</option>
                            {estados.map(estado => (
                                <option key={estado.id} value={estado.sigla}>{estado.nome}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Empresa:
                        <select name="empresa_id" value={form.empresa_id} onChange={handleEmpresaChange}>
                            <option value="null">Desativado</option>
                            {empresas.map(empresa => (
                                <option key={empresa.id} value={empresa.id}>{empresa.nome}</option>
                            ))}
                        </select>
                    </label>
                    {form.empresa_id && form.empresa_id !== 'null' && (
                        <label>
                            Status:
                            <select name="status" value={form.status} onChange={handleStatusChange} required>
                                <option value="">Selecione</option>
                                <option value="Online">Online</option>
                                <option value="Offline">Offline</option>
                                <option value="Em Manutenção">Em Manutenção</option>
                            </select>
                        </label>
                    )}
                    <button type="submit">Salvar</button>
                    <button type="button" onClick={handleCancel}>Cancelar</button>
                </form>
            </div>
        </div>
    );
}
