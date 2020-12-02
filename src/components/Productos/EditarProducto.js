import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import firebase from 'firebase';

const EditarProducto = (props) => {
    const { id } = props.match.params;
    //component state
    const [producto, setProducto] = useState({
        name: '',
        price: null,
        quantity:null,
        description:null,
        image: null
    }); 

    const handleChange = (e) => {
        setProducto({
            ...producto, // copia del producto actual
            [e.target.name]: e.target.value
        });
    };

    const handleImage = (e) => {
        setProducto({
            ...producto,
            image: e.target.files[0]
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        /*formData.append('name', producto.name);
        formData.append('price', producto.price);
        formData.append('image', producto.image);*/

        guardarProducto();
    };

    const guardarProducto = formData => {
        // axiosCliente.post('/customers', cliente)
        firebase.database().ref(`/products/${id}`)
        .update(producto)
        .then(res => {
                Swal.fire(
                    'Editar producto',
                    'Producto actualizado',
                    'success'
                  );
                  props.history.push('/productos');
        });
    };

    const canSave = () => {
        const { name, price } = producto;
        return !name.length || !(price && price >= 0)
    };

    useEffect(() => {
        const getProducto = () => {
            firebase.database().ref(`/products/${id}`)
            .once('value')
            .then(snapshot => {
                if (snapshot.val().name) {
                    setProducto(snapshot.val());
                } else {
                    alert('No se ha encontrado el producto');
                }
            });
        };

        getProducto();
    }, [id]);

    return (
        <Fragment>
            <h2>Nuevo producto</h2>
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
                        defaultValue={producto.name}
                        onChange={handleChange}
                        required
                    />
                </div> 

                <div className="form-group">
                    <label htmlFor="price">Precio:</label>
                    <input 
                        type="number"
                        step="1"
                        min="0"
                        className="form-control"
                        name="price"
                        placeholder="Ingresar precio"
                        defaultValue={producto.price}
                        onChange={handleChange}
                        required
                    />
                </div> 

                <div className="form-group">
                    <label htmlFor="price">Cantidad:</label>
                    <input 
                        type="number"
                        step="1"
                        min="0"
                        className="form-control"
                        name="quantity"
                        placeholder="Ingresar cantidad"
                        defaultValue={producto.quantity}
                        onChange={handleChange}
                        required
                    />
                </div> 

                <div className="form-group">
                    <label htmlFor="name">Descripcion:</label>
                    <input 
                        type="text"
                        className="form-control"
                        name="description"
                        placeholder="Ingresar descripcion"
                        defaultValue={producto.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="row">
                    <div className="col-md-3">
                        {producto.image && typeof producto.image == 'string' && 
                        <img 
                            className="w-75" 
                            src={`file/images${producto.image}`}
                            alt={producto.name}
                            />
                    }
                    </div>
                    <div className="col-md-9">   
                        <div className="form-group">
                            <label htmlFor="image">Imagen:</label>
                            <input 
                                type="file"
                                name="image"
                                className="form-control"
                                onChange={handleImage}
                                required
                            />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={canSave()}
                >Actualizar Producto</button>
            </form>
        </Fragment>
    );
};

export default withRouter(EditarProducto);