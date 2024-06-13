import React from 'react';
import './index.scss';
import { API_ADDRESS } from '../../Api/constant';

export default function CardEmpresa({ id, image, cnpj, nomeEmpresa, setorEmpresa, onEdit, onDelete }) {
    return (
        <div className="CardEmpresa">
            <img src={`${API_ADDRESS}/${image}`} alt={nomeEmpresa} className='profile-image' />
            <div className='profile-details'>
                <h3>Id: {id}</h3>
                <h3>{nomeEmpresa}</h3>
                <p>{setorEmpresa}</p>
                <p>CNPJ: {cnpj}</p>
                <button onClick={() => onEdit(id)}>Editar</button>
                <button onClick={() => onDelete(id)}>Deletar</button>
            </div>
        </div>
    );
}
