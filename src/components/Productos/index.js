import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './estilo.css';
import Producto from './Producto';

import firebase from 'firebase';

import Swal from 'sweetalert2';
import { async } from 'q';

const Productos = () =>{
    // component state
    const [products, setProductos] = useState([]);
    
    const renderProductos = () => (
        <tbody>
            {products.map((producto, index) =>(
                <Producto 
                    key={index}
                    index={index}
                    id={producto._id}
                    name={producto.name}
                    price={producto.price}
                    quantity={producto.quantity}
                    description={producto.description}
                    image={producto.image}
                    onDelete={handleDeleteProduct}
                
                />
            ))}
        </tbody>
    );
    
    const handleDeleteProduct = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Un producto no se puede recuperar",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, eliminar!'
          }).then((result) => {
            if (result.value) {
              deleteProduct(id);
            }
          });
    };
    

    const getProductos = async () => {
        //const response = await axiosClient.get('/customers');
        //console.log(response.data);

        //setClientes(response.data);

        //cargar colección desde firebase
        firebase.database().ref(`/products`)
        .on(
            'value',
            (snapshot) => {
                // leer los datos
                // callback
                // console.log(snapshot.val());
                //leer registro por registro y agregarlo a la lista
                const productosList = [];

                snapshot.forEach(item => {
                    //console.log(item.val());
                    const productItem = {
                        _id: item.key,
                        ...item.val()
                    };
                    //console.log(customerItem);
                    productosList.push(productItem);

                });

                // actualizar el state del componente
                setProductos(productosList);
            },
            (error) => {
                console.log(error);
            }
            );

    };
    
    const deleteProduct = (id) => {
        firebase.database().ref(`/products/${id}`)
        .remove()
        .then(res =>{
           Swal.fire(
                'Eliminar producto',
                'Producto eliminado',
                'success'
           );
        });
    };
   
    useEffect(() => {
        getProductos();
    }, []);

    return (
        <>
        <br/>
        <center className="center"><h4 >Tabla de productos</h4></center>
        <br/>
        <table className="table table-striped">
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Producto</th>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Descripcion</th>
            <th>
            <Link to={ '/productos/nuevo' }
                className="btn btn-info mr-1"
                role="button"
                aria-presed="true"
                >
                    Agregar Producto
            </Link>
            </th>
        </tr>
        </thead>
        {renderProductos()}
    </table>
    </>
    );
};

export default Productos;