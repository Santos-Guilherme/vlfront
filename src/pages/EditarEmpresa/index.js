import React, { useState, useEffect } from 'react';
import './index.scss';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { atualizarEmpresa, atualizarLogoEmpresa, buscarEmpresaPorId } from '../../Api/empresaApi';
import { listarTags } from '../../Api/tagApi';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SideMenu from '../../components/SideMenu';
import { API_ADDRESS } from '../../Api/constant';

export default function EditarEmpresa() {
    const { id } = useParams();
    const [nome, setNome] = useState('');
    const [setor, setSetor] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [aparecerHome, setAparecerHome] = useState(false);
    const [logo, setLogo] = useState(null);
    const [preview, setPreview] = useState(null);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const carregarEmpresa = async () => {
            try {
                const empresa = await buscarEmpresaPorId(id);
                setNome(empresa.nome);
                setSetor(empresa.setor);
                setCnpj(empresa.cnpj);
                setAparecerHome(empresa.aparecer_home);
                setPreview(`${API_ADDRESS}/${empresa.logo}`);
            } catch (error) {
                toast.error('Erro ao buscar empresa');
            }
        };

        const carregarTags = async () => {
            try {
                const tags = await listarTags();
                setTags(tags);
            } catch (error) {
                toast.error('Erro ao buscar tags');
            }
        };

        carregarEmpresa();
        carregarTags();
    }, [id]);

    const Atualizar = async () => {
        if (!nome || !setor || !cnpj) {
            toast.error('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        try {
            const dados = { nome, setor, cnpj, aparecer_home: aparecerHome };
            await atualizarEmpresa(id, dados);
            if (logo) {
                const formData = new FormData();
                formData.append('logo', logo);
                await atualizarLogoEmpresa(id, formData);
            }
            toast.success('Empresa atualizada com sucesso');
        } catch (error) {
            toast.error('Erro ao atualizar empresa');
        }
    };

    const MudarLogo = (e) => {
        const file = e.target.files[0];
        setLogo(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    return (
        <div className="EditarEmpresa">
            <Header />
            <div className="content-editarempresa">
                <SideMenu />
                <div className="info-editarempresa">
                    <h2>Editar Empresa</h2>
                    <div className="content-forms">
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            id="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Nome"
                        />
                        <label htmlFor="setor">Setor</label>
                        <select
                            id="setor"
                            value={setor}
                            onChange={(e) => setSetor(e.target.value)}
                        >
                            <option value="">Selecione um Setor</option>
                            {tags.map(tag => (
                                <option key={tag.id} value={tag.id}>
                                    {tag.nome}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="cnpj">CNPJ</label>
                        <input
                            type="text"
                            id="cnpj"
                            value={cnpj}
                            onChange={(e) => setCnpj(e.target.value)}
                            placeholder="CNPJ"
                        />
                        <label htmlFor="aparecerHome">Aparecer na Home</label>
                        <input
                            type="checkbox"
                            id="aparecerHome"
                            checked={aparecerHome}
                            onChange={(e) => setAparecerHome(e.target.checked)}
                        />
                        <label htmlFor="logo">Logo</label>
                        <input
                            type="file"
                            id="logo"
                            onChange={MudarLogo}
                            accept="image/*"
                        />
                        <div className="preview-container">
                            <img src={preview} alt="Pré-visualização" className="preview-image" />
                        </div>
                        <button onClick={Atualizar}>Salvar</button>
                    </div>
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </div>
    );
}
