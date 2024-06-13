import React, { useState, useEffect } from 'react';
import './index.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SideMenu from '../../components/SideMenu';
import { listarTags, salvarTag, atualizarTag, removerTag } from '../../Api/tagApi';
import { buscarEmpresaPorTagId } from '../../Api/empresaApi';
import { ToastContainer, toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';

export default function Segmentos() {
    const [segmentos, setSegmentos] = useState([]);
    const [editingSegmentoId, setEditingSegmentoId] = useState(null);
    const [nome, setNome] = useState('');
    const [nomeOriginal, setNomeOriginal] = useState('');

    useEffect(() => {
        const listarSegmentos = async () => {
            try {
                const listaDeTags = await listarTags();
                setSegmentos(listaDeTags);
            } catch (error) {
                console.error('Erro ao buscar segmentos:', error.message);
            }
        };

        listarSegmentos();
    }, []);

    const validarNomeDuplicado = (nome) => {
        return segmentos.some((segmento) => segmento.nome.toLowerCase() === nome.toLowerCase());
    };

    const desenharNome = (name) => {
        return name.trim().split(/\s+/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const handleSaveSegmento = async () => {
        try {
            if (nome.trim() === '') {
                toast.error('Por favor, preencha o nome do segmento.', { position: "top-right", autoClose: 3000 });
                return;
            }

            const nomeCapitalizado = desenharNome(nome);

            if (editingSegmentoId !== null) {
                const segmentoAntigo = segmentos.find(segmento => segmento.id === editingSegmentoId);
                if (segmentoAntigo && segmentoAntigo.nome === nomeCapitalizado) {
                    toast.info('Nome já está salvo', { position: "top-right", autoClose: 3000 });
                    return;
                }
                if (validarNomeDuplicado(nomeCapitalizado)) {
                    toast.error('O nome do segmento já existe', { position: "top-right", autoClose: 3000 });
                    return;
                }
                await atualizarTag(editingSegmentoId, { nome: nomeCapitalizado });
                setEditingSegmentoId(null);
            } else {
                if (validarNomeDuplicado(nomeCapitalizado)) {
                    toast.error('O nome do segmento já existe', { position: "top-right", autoClose: 3000 });
                    return;
                }
                await salvarTag({ nome: nomeCapitalizado });
            }
            setNome('');
            const listaDeTagsAtualizada = await listarTags();
            setSegmentos(listaDeTagsAtualizada);
            toast.success('Segmento salvo com sucesso!', { position: "top-right", autoClose: 3000 });
        } catch (error) {
            console.error('Erro ao salvar segmento:', error.message);
        }
    };

    const handleEditSegmento = (segmento) => {
        setEditingSegmentoId(segmento.id);
        const nomeCapitalizado = desenharNome(segmento.nome);
        setNome(nomeCapitalizado);
        setNomeOriginal(nomeCapitalizado); // Guarda o nome original capitalizado para uso no cancelamento
    };

    const handleCancelEdit = () => {
        setEditingSegmentoId(null);
        setNome(nomeOriginal); // Restaura o nome original capitalizado
    };

    const handleDeleteSegmento = async (id) => {
        const empresasComTag = await buscarEmpresaPorTagId(id);
        if (empresasComTag.length > 0) {
            toast.error('Não é possível deletar a tag. Existem empresas associadas a ela.', { position: "top-right", autoClose: 3000 });
            return;
        }

        confirmAlert({
            title: 'Confirmação de exclusão',
            message: 'Tem certeza que deseja excluir este segmento?',
            buttons: [
                {
                    label: 'Sim',
                    onClick: async () => {
                        try {
                            await removerTag(id);
                            setSegmentos(segmentos.filter((segmento) => segmento.id !== id));
                            toast.success('Segmento deletado com sucesso!', { position: "top-right", autoClose: 3000 });
                        } catch (error) {
                            console.error('Erro ao deletar segmento:', error.message);
                        }
                    }
                },
                {
                    label: 'Não',
                    onClick: () => {}
                }
            ]
        });
    };

    return (
        <div className='Segmentos'>
            <Header />
            <div className='content-segmentos'>
                <SideMenu />
                <div className='info-segmentos'>
                    <div className='content-titulo'>
                        <div></div>
                        <div>
                            <h2>Segmentos</h2>
                        </div>
                        <div></div>
                    </div>
                    <div className='form-segmentos'>
                        <input
                            type="text"
                            placeholder="Nome do segmento"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required // Exige que o campo seja preenchido
                        />
                        {editingSegmentoId !== null && (
                            <div>
                                <button onClick={handleCancelEdit}>Cancelar</button>
                                <button onClick={handleSaveSegmento}>Salvar</button>
                            </div>
                        )}
                        {editingSegmentoId === null && (
                            <button onClick={handleSaveSegmento}>
                                {editingSegmentoId !== null ? 'Atualizar' : 'Salvar'}
                            </button>
                        )}
                    </div>
                    <div className='profile-list'>
                        {segmentos.map((segmento) => (
                            <div className='segmento-item' key={segmento.id}>
                                {editingSegmentoId === segmento.id ? (
                                    <input
                                        type="text"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                    />
                                ) : (
                                    <span>{segmento.nome}</span>
                                )}
                                <div className='segmento-actions'>
                                    {editingSegmentoId === segmento.id ? (
                                        <div>
                                            <button onClick={handleSaveSegmento}>Salvar</button>
                                            <button onClick={handleCancelEdit}>Cancelar</button>
                                        </div>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEditSegmento(segmento)}>Editar</button>
                                            <button onClick={() => handleDeleteSegmento(segmento.id)}>Excluir</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </div>
    );
}
