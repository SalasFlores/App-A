import React from 'react';
import { Link } from 'react-router-dom';

const Cliente = ({ index, id, name, lastname, business, email, phone, onDelete }) => (
    <tr>
        <th scope="row">{index +1}</th>
        <td>{`${name} ${lastname}`}</td>
        <td>{email}</td>
        <td>{business}</td>
        <td>{phone}</td>
        <td>
            <Link to={`/clientes/${id}/editar`}
                className="btn btn-success mr-1"
                role="button"
                aria-pressed="true"
            >
                Editar
            </Link> 
            <button
                type="button"
                className="btn btn-danger"
                onClick={() => { onDelete(id); }}
            >
                Eliminar
            </button>
        </td>
    </tr>
);

export default Cliente;