import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderTop.css'


const HeaderTop = () => {
    return (
        <div className="container">
            <div className="row">
            <div className="col-md-6 text-white Col headerTopControl" >Moon Riders</div>
            <div className="col-md-6 pt-5 text-white  float-end">
                <div className="nav">
                    <ul className="ulcontrol">
                        <Link  to="/home">Home</Link>
                        <Link to="/destination">Destination</Link>
                        <Link to="/blog">Blog</Link>
                        <Link to="/contact">Contact</Link> 
                        <Link to="/login">Login</Link>
   
                    </ul>
                </div>
            </div>
            </div>
     
        </div>
    );
};

export default HeaderTop;