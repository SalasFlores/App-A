import React, { useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import firebase from 'firebase';
import 'firebase/storage';

const AgregarProducto = (props) => {
    //component state
    const [producto, setProducto] = useState({
        name: '',
        price: null,
        quantity:null,
        description:null,
        image: null
    });
    const [image, setImage] = useState(null); 

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
        });
        if (!e.target.files[0]) return;
        const file = e.target.files[0];
        setImage({
          type: file.type.split('/')[1],
          file,
        })
      };

    /*const handleImage = (e) => {
        setProducto({
            ...producto,
            image: e.target.files[0]
        })
    };*/

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        /*formData.append('name', producto.name);
        formData.append('price', producto.price);
        formData.append('image', producto.image);*/

        guardarProducto();
    };

    if (image) {
        producto.image = `${producto.image.type}`;
        firebase.storage().ref(`/images/${producto.image}`).put(image.file)
        .then(() => {
          firebase.storage().ref().child(`/images/${producto.image}`)
          .getDownloadURL().then((url) => {
            setProducto({ ...producto, image: url });
          });
        });
      }
    const guardarProducto = formData => {
        // axiosCliente.post('/customers', cliente)
        firebase.database().ref('/products/')
        .push(producto)
        .then(res => {
                Swal.fire(
                    'Agregar producto',
                    'Producto agregado correctamente',
                    'success'
                  );
                  props.history.push('/productos');
        });
    };

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

                <button
                    type="submit"
                    className="btn btn-primary"

                >Guardar Producto</button>
            </form>
        </Fragment>
    );
};

export default withRouter(AgregarProducto);