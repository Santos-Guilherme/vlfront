import React, { useState, useEffect } from 'react';
import './index.scss';
import { salvarEmpresa, atualizarLogoEmpresa } from '../../Api/empresaApi';
import { listarTags } from '../../Api/tagApi';

export default function EmpresasCadastro({ isOpen, onClose, updateParent }) {
    const [form, setForm] = useState({
        nome: '',
        setor: '',
        cnpj: '',
        logo: '',
        aparecer_home: false
    });

    const [segmentos, setSegmentos] = useState([]);
    const [logoPreview, setLogoPreview] = useState(null);
    const [logoError, setLogoError] = useState('');

    useEffect(() => {
        const fetchSegmentos = async () => {
            try {
                const listaDeSegmentos = await listarTags();
                setSegmentos(listaDeSegmentos);
            } catch (error) {
                console.error('Erro ao buscar segmentos:', error.message);
            }
        };

        fetchSegmentos();
    }, []);

    const handleChange = (e) => {
        const { name, value, files, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        
        if (name === 'logo') {
            const file = files[0];
            if (file) {
                setLogoPreview(URL.createObjectURL(file));
                setLogoError('');
            }
            setForm({ ...form, logo: file });
        } else {
            setForm({ ...form, [name]: newValue });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.logo) {
            setLogoError('Por favor, selecione um logo para a empresa.');
            return;
        }

        const empresa = await salvarEmpresa(form);
        const formData = new FormData();
        formData.append('logo', form.logo);

        try {
            await atualizarLogoEmpresa(empresa.id, formData);
            updateParent();
        } catch (error) {
            console.error('Erro ao atualizar logo da empresa:', error);
        }
        onClose();
        resetForm();
    };

    const resetForm = () => {
        setForm({
            nome: '',
            setor: '',
            cnpj: '',
            logo: '',
            aparecer_home: false
        });
        setLogoPreview(null);
        setLogoError('');
    };

    const handleCancel = () => {
        resetForm();
        onClose();
    };

    const { nome, setor, cnpj, aparecer_home } = form;

    if (!isOpen) return null;

    return (
        <div className="EmpresasCadastro">
            <div className="cadastro-content">
                <button className="close-button" onClick={handleCancel}>X</button>
                <h2>Cadastrar Empresa</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Nome da Empresa:
                        <input type="text" name="nome" value={nome} onChange={handleChange} required />
                    </label>
                    <label>
                        Setor:
                        <select name="setor" value={setor} onChange={handleChange} required>
                            <option value="">Selecione</option>
                            {segmentos.map(segmento => (
                                <option key={segmento.id} value={segmento.id}>{segmento.nome}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        CNPJ:
                        <input type="text" name="cnpj" value={cnpj} onChange={handleChange} required />
                    </label>
                    <label>
                        Logo:
                        <input className="img-edit-empresa" type="file" accept="image/*" onChange={handleChange} name="logo" required />
                    </label>
                    {logoPreview && (
                        <div className="logo-preview">
                            <h3>Preview da Logo</h3>
                            <img src={logoPreview} alt="Preview" />
                        </div>
                    )}
                    {logoError && <p className="error-message">{logoError}</p>}
                    <label>
                        Aparecer na Home:
                        <input type="checkbox" name="aparecer_home" checked={aparecer_home} onChange={handleChange} />
                    </label>
                    <button type="submit">Salvar</button>
                    <button type="button" onClick={handleCancel}>Cancelar</button>
                </form>
            </div>
        </div>
    );
}
