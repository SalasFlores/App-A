import React from 'react';
import { Route, Switch } from 'react-router-dom';

//import Clientes from './components/Clientes';

//import AgregarCliente from './components/Clientes/AgregarCliente';
//import EditarCliente from './components/Clientes/EditarCliente';

import Productos from './components/Productos';
import AgregarProducto from './components/Productos/AgregarProducto';
import EditarProducto from './components/Productos/EditarProducto';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Productos} />
        <Route exact path="/productos" component={Productos} />
        <Route exact path="/productos/nuevo" component={AgregarProducto} />
        <Route exact path="/productos/:id/editar" component={EditarProducto} />
       
        
    </Switch>
);

export default Routes;