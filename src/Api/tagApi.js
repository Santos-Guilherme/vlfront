import axios from 'axios';
import { API_ADDRESS } from './constant';

export const salvarTag = async (tag) => {
    try {
        const response = await axios.post(`${API_ADDRESS}/tags`, tag);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao salvar tag');
    }
};

export const listarTags = async () => {
    try {
        const response = await axios.get(`${API_ADDRESS}/tags`);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao buscar tags');
    }
};

export const buscarTagPorId = async (id) => {
    try {
        const response = await axios.get(`${API_ADDRESS}/tags/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao buscar tag por ID');
    }
};

export const atualizarTag = async (id, tag) => {
    try {
        const response = await axios.put(`${API_ADDRESS}/tags/${id}`, tag);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao atualizar tag');
    }
};

export const removerTag = async (id) => {
    try {
        const response = await axios.delete(`${API_ADDRESS}/tags/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao remover tag');
    }
};
