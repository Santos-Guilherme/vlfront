import React from 'react';
import './index.scss';
import { useNavigate } from 'react-router-dom';

export default function CardServidor({ id, nome, localizacao, status, empresa, onDelete }) {

    const navigate = useNavigate();


    const getStatusColor = () => {
        if (status) {
            switch (status.toLowerCase()) {
                case 'online':
                    return 'green';
                case 'em manutenção':
                    return 'yellow';
                case 'desativado':
                    return 'grey';
                case 'offline':
                    return 'red';
                default:
                    return 'grey';
            }
        } else {
            return 'grey';
        }
    };

    const handleEditClick = () => {
        navigate(`/servidores/${id}`);
    }

    return (
        <div className="CardServidor">
            <div className='profile-details'>
                <div>
                    <h3>{nome}</h3>
                    <p>Localização: {localizacao}</p>
                    <p>{empresa ?? "Desativado"}</p>
                    <p>Status: {status}</p>
                    <div className='status-indicator' style={{ backgroundColor: getStatusColor() }}></div>
                </div>
                <div>
                    <button onClick={handleEditClick}>Editar</button>
                    <button onClick={() => onDelete(id)}>Deletar</button>
                </div>
            </div>
        </div>
    );
}
