import React, { useState } from 'react';
import './index.scss';

export default function ServidorStatus({ server, onClose, onSave }) {
    const [updatedServer, setUpdatedServer] = useState({ ...server });
    const [comentario, setComentario] = useState('');

    useState(() => {
        if (server.historico_manutencao) {
            setComentario(server.historico_manutencao);
        }
    }, [server]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedServer({ ...updatedServer, [name]: value });
    };

    const handleSave = () => {
        const historicoManutencao = `${comentario} - ${new Date().toLocaleString()}`;
        onSave({ ...updatedServer, historico_manutencao: historicoManutencao });
    };

    return (
        <div className='ServidorStatus'>
            <div className='modal-content'>
                <h2>Atualizar Servidor</h2>
                <div className='form-group'>
                    <label>Especificações</label>
                    <input
                        name='especificacoes'
                        value={updatedServer.especificacoes}
                        onChange={handleChange}
                        readOnly
                    />
                </div>
                <div className='form-group'>
                    <label>Localização</label>
                    <input
                        type='text'
                        name='localizacao'
                        value={updatedServer.localizacao}
                        onChange={handleChange}
                        readOnly
                    />
                </div>
                <div className='form-group'>
                    <label>Status</label>
                    <select
                        name='status'
                        value={updatedServer.status}
                        onChange={handleChange}
                    >
                        <option value='Online'>Online</option>
                        <option value='Offline'>Offline</option>
                        <option value='Em Manutenção'>Em Manutenção</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label>Comentário</label>
                    <textarea
                        name='comentario'
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                    />
                </div>
                <div className='modal-actions'>
                    <button onClick={onClose}>Cancelar</button>
                    <button onClick={handleSave}>Salvar</button>
                </div>
            </div>
        </div>
    );
};
