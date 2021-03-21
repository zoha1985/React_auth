import React, { useEffect, useState } from 'react';
import Cards from '../Cards/Cards';
import HeaderTop from '../HeaderTop/HeaderTop';
import './Home.css'

const Home = () => {
    const [newCar, setCare] = useState([]);

    useEffect(() =>{
        fetch('https://api.mocki.io/v1/905393d9')
        .then(res => res.json())
        .then(data => setCare(data))
    }, [])
    return (
        <div className="container-fulid convertBg" >
        <div className="row">
           <div className="container">
 
            <HeaderTop /> 
        
            <div className="container">
                <div className="row">
                    <div className="col-md-12 d-flex text-white mt-5 pt-5">
                       
                       {
                           newCar.map(newCar => <Cards newCar={newCar}></Cards>)
                       }
                


                    </div>
                </div>
            </div>
           </div>
        </div>
    </div>
    );
};

export default Home;