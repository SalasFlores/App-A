import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import firebase from 'firebase';

const AgregarCliente = (props) => {
    //component state
    const [cliente, setCliente] = useState({
        name: '',
        lastname: '',
        email: '',
        business: '',
        phone: ''
    }); 

    const handleChange = (e) => {
        setCliente({
            ...cliente, // copia del cliente actual
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // guardar cliente
        guardarCliente();
    };

    const guardarCliente = () => {
        // axiosCliente.post('/customers', cliente)
        firebase.database().ref('/customers/')
        .push(cliente)
        .then(res => {
                Swal.fire(
                    'Agregar cliente',
                    'Cliente agregado correctamente',
                    'success'
                  );
                  props.history.push('/clientes');
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
        >
            <div className="form-group">
                <label htmlFor="name">Nombre:</label>
                <input 
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Ingresar nombre"
                    defaultValue={cliente.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="lastname">Apellidos:</label>
                <input 
                    type="text"
                    className="form-control"
                    name="lastname"
                    placeholder="Ingresar apellidos"
                    defaultValue={cliente.lastname}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input 
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Ingresar email"
                    defaultValue={cliente.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="business">Empresa:</label>
                <input 
                    type="text"
                    className="form-control"
                    name="business"
                    placeholder="Ingresar nombre de empresa"
                    defaultValue={cliente.business}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="phone">Teléfono:</label>
                <input 
                    type="phone"
                    className="form-control"
                    name="phone"
                    placeholder="Ingresar teléfono"
                    defaultValue={cliente.phone}
                    onChange={handleChange}
                />
            </div>
            <button
                type="submit"
                className="btn btn-primary"

            >Guardar Cliente</button>
        </form>
    );
};

export default withRouter(AgregarCliente);