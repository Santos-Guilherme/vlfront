import axios from 'axios';
import { API_ADDRESS } from './constant';

export const salvarEmpresa = async (empresa) => {
    try {
        const response = await axios.post(`${API_ADDRESS}/empresas`, empresa);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao salvar empresa');
    }
};

export const listarEmpresas = async () => {
    try {
        const response = await axios.get(`${API_ADDRESS}/empresas`);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao listar empresas');
    }
};

export const buscarEmpresaPorId = async (id) => {
    try {
        const response = await axios.get(`${API_ADDRESS}/empresas/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao buscar empresa por ID');
    }
};

export const atualizarEmpresa = async (id, empresa) => {
    try {
        const response = await axios.put(`${API_ADDRESS}/empresas/${id}`, empresa);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao atualizar empresa');
    }
};

export const removerEmpresa = async (id) => {
    try {
        const response = await axios.delete(`${API_ADDRESS}/empresas/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao remover empresa');
    }
};

export const atualizarLogoEmpresa = async (idEmpresa, formData) => {
    try {
        const response = await axios.put(`${API_ADDRESS}/empresas/logo/${idEmpresa}`, formData);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao atualizar logo da empresa');
    }
};

// Nova função para buscar empresa por CNPJ
export const buscarEmpresaPorCnpj = async (cnpj) => {
    try {
        const response = await axios.get(`${API_ADDRESS}/empresas/cnpj/${cnpj}`);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao buscar empresa por CNPJ');
    }
};

// Nova função para buscar empresa por nome
export const buscarEmpresaPorNome = async (nome) => {
    try {
        const response = await axios.get(`${API_ADDRESS}/empresas/nome/${nome}`);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao buscar empresa por nome');
    }
};

export const buscarEmpresasVisiveis = async (nome) => {
    try {
        const response = await axios.get(`${API_ADDRESS}/empresas/visivel/true`);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao buscar empresas visiveis');
    }
};

// Nova função para buscar empresa por ID da tag
export const buscarEmpresaPorTagId = async (tagId) => {
        const response = await axios.get(`${API_ADDRESS}/empresas/tag/${tagId}`);
        console.log(response.data)
        return response.data;
    
};
