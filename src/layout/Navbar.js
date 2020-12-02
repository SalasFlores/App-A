import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
        <nav className="navbar-expand-lg navbar navbar-dark bg-dark">
            <NavLink className="navbar-brand text-info" to="/"> 
                <img src="https://image.flaticon.com/icons/svg/992/992646.svg " width="30" height="30" className="d-inline-block align-top" />
        
                Papeleria Mont-RA 
            </NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                <NavLink className="nav-item nav-link" to="/productos">Productos</NavLink>
               
                
                </div>
                
            </div>
            
        </nav>
);

export default Navbar;