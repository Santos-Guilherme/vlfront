import React, { useState, useEffect } from 'react';
import './index.scss';
import { useParams } from 'react-router-dom';
import { listarTags } from '../../Api/tagApi';
import { buscarEmpresaPorId, atualizarEmpresa, atualizarLogoEmpresa } from '../../Api/empresaApi';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SideMenu from '../../components/SideMenu';
import { Link } from 'react-router-dom';

export default function EmpresasEdit({ match, history }) {
    const { empresaId } = useParams();
    const [form, setForm] = useState({
        nome: '',
        setor: '',
        cnpj: '',
        logo: '',
        aparecer_home: false,
    });
    const [segmentos, setSegmentos] = useState([]);
    const [logoPreview, setLogoPreview] = useState(null);

    useEffect(() => {
        const listarSegmentos = async () => {
            try {
                const listaDeSegmentos = await listarTags();
                setSegmentos(listaDeSegmentos);
            } catch (error) {
                console.error('Erro ao buscar segmentos:', error.message);
            }
        };

        const listarEmpresas = async () => {
            try {
                const empresa = await buscarEmpresaPorId(empresaId);
                setForm({
                    nome: empresa.nome,
                    setor: empresa.setor,
                    cnpj: empresa.cnpj,
                    logo: empresa.logo,
                    aparecer_home: empresa.aparecer_home,
                });
                setLogoPreview(empresa.logo);
            } catch (error) {
                console.error('Erro ao buscar empresa:', error.message);
            }
        };

        listarSegmentos();
        if (empresaId) {
            listarEmpresas();
        }
    }, [empresaId]);

    const handleChange = (e) => {
        const { name, value, files, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        if (name === 'logo') {
            setForm({ ...form, logo: files[0] });
            setLogoPreview(URL.createObjectURL(files[0]));
        } else {
            setForm({ ...form, [name]: newValue });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await atualizarEmpresa(empresaId, form);
            if (form.logo && form.logo !== logoPreview) {
                await atualizarLogoEmpresa(empresaId, form.logo);
            }
            history.push('/empresas');
        } catch (error) {
            console.error('Erro ao atualizar empresa:', error.message);
        }
    };

    const handleCancel = () => {
        setForm({
            nome: '',
            setor: '',
            cnpj: '',
            logo: '',
            aparecer_home: false,
        });
        history.push('/empresas');
    };

    const { nome, setor, cnpj, aparecer_home } = form;

    return (
        <div className="EmpresasEdit">
            <Header />
            <div className="content-empresas-edit">
                <SideMenu />
                <div className="info-empresas-edit">
                    <div className="content-titulo">
                        <Link to="/empresas" className="back-button">Voltar</Link>
                        <h2>Editar Empresa</h2>
                    </div>
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
                            <input type="file" name="logo" accept="image/*" onChange={handleChange} />
                        </label>
                        {logoPreview && (
                            <div className="logo-preview">
                                <h3>Preview da Logo</h3>
                                <img src={logoPreview} alt="Preview" />
                            </div>
                        )}
                        <label>
                            Aparecer na Home:
                            <input type="checkbox" name="aparecer_home" checked={aparecer_home} onChange={handleChange} />
                        </label>
                        <button type="submit">Salvar</button>
                        <button type="button" onClick={handleCancel}>Cancelar</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}
