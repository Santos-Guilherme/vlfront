import axios from 'axios';
import { API_ADDRESS } from './constant';

export const salvarServidor = async (servidor) => {
    try {
        const response = await axios.post(`${API_ADDRESS}/servidores`, servidor);
        return response.data;
    } catch (error) {
        console.error('Erro ao salvar servidor:', error.message);
        throw error;
    }
};

export const listarServidores = async () => {
    try {
        const response = await axios.get(`${API_ADDRESS}/servidores`);
        return response.data;
    } catch (error) {
        console.error('Erro ao listar servidores:', error.message);
        throw error;
    }
};

export const buscarServidorPorId = async (id) => {
    try {
        const response = await axios.get(`${API_ADDRESS}/servidores/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar servidor por ID:', error.message);
        throw error;
    }
};

export const atualizarServidor = async (id, servidor) => {
    try {
        const response = await axios.put(`${API_ADDRESS}/servidores/${id}`, servidor);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar servidor:', error.message);
        throw error;
    }
};

export const removerServidor = async (id) => {
    try {
        const response = await axios.delete(`${API_ADDRESS}/servidores/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao remover servidor:', error.message);
        throw error;
    }
};

export const listarServidoresPorEmpresa = async (empresaId) => {
    try {
        const response = await axios.get(`${API_ADDRESS}/servidores/empresa/${empresaId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao listar servidores por empresa:', error.message);
        throw error;
    }
};

export const listarServidoresDesativados = async () => {
    try {
        const response = await axios.get(`${API_ADDRESS}/servidores/status/desativado`);
        return response.data;
    } catch (error) {
        console.error('Erro ao listar servidores desativados:', error.message);
        throw error;
    }
};

export const listarServidoresPorStatus = async (status) => {
    try {
        const response = await axios.get(`${API_ADDRESS}/servidores/status/${status}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao listar servidores com status ${status}:`, error.message);
        throw error;
    }
};

export async function listarServidoresAtivados() {
    const response = await axios.get(`${API_ADDRESS}/servidores/status/ativado`);
    return response.data;
}

export async function listarServidoresAtivadosPorStatus(status) {
    const response = await axios.get(`${API_ADDRESS}/servidores/ativado/${status}`);
    return response.data;
}