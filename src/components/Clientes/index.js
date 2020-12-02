import React, { useEffect, useState } from 'react';

import Cliente from './Cliente';

import { Link } from 'react-router-dom';

import firebase from 'firebase';

import Swal from 'sweetalert2';

const Clientes = () => {

    // clientes: state
    // setClientes funcion para actualizar clientes
    const [clientes, setClientes] = useState([]);

    const getClientes = async () => {
        //const response = await axiosClient.get('/customers');
        //console.log(response.data);

        //setClientes(response.data);

        //cargar colección desde firebase
        firebase.database().ref(`/customers`)
        .on(
            'value',
            (snapshot) => {
                // leer los datos
                // callback
                // console.log(snapshot.val());
                //leer registro por registro y agregarlo a la lista
                const clientesList = [];

                snapshot.forEach(item => {
                    //console.log(item.val());
                    const customerItem = {
                        _id: item.key,
                        ...item.val()
                    };
                    //console.log(customerItem);
                    clientesList.push(customerItem);

                });

                // actualizar el state del componente
                setClientes(clientesList);
            },
            (error) => {
                console.log(error);
            }
            );

    };

    const handleDelete = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Un cliente no se puede recuperar",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, eliminar!'
          }).then((result) => {
            if (result.value) {
              deleteCliente(id);
            }
          });
    };

    const deleteCliente = (id) => {
        // axiosClient.delete(`/customers/${id}`)
        firebase.database().ref(`/customers/${id}`)
        .remove()
        .then(res =>{
           Swal.fire(
                'Eliminar cliente',
                'Cliente eliminado',
                'success'
           );
        });
    };

    useEffect(() => {
        getClientes();
    }, [])

    const renderClientes = () => {
        return (
            <tbody>
                {
                    clientes.map((cliente, index) => (
                        <Cliente 
                            key={index}
                            index={index}
                            id={cliente._id}
                            name={cliente.name}
                            lastname={cliente.lastname}
                            email={cliente.email}
                            business={cliente.business}
                            phone={cliente.phone}
                            onDelete={handleDelete}
                        />
                    ))
                }
            </tbody>
        );
    }

    return (
    <table className="table table-striped">
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Cliente</th>
            <th scope="col">Email</th>
            <th scope="col">Empresa</th>
            <th scope="col">Teléfono</th>
            <th>
            <Link to={ '/clientes/nuevo' }
                className="btn btn-info mr-1"
                role="button"
                aria-presed="true"
                >
                    Agregar Cliente
            </Link>
            </th>
        </tr>
        </thead>
        {renderClientes()}
    </table>
    );
};

export default Clientes;