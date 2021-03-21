import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Google from '../Google/Google';
import HeaderTop from '../HeaderTop/HeaderTop';
import car from '../../Assets/Images/car.png';
import bik from '../../Assets/Images/bik.png';
import train from '../../Assets/Images/train.png';
import bus from '../../Assets/Images/bus.png';

const SingleVaickel = (props) => {
    console.log("single", props)
    const { id, img } = useParams();
    console.log("single vaickel id fienser", id)
    const [vaickel, setVackel] = useState([]);
    useEffect(() => {
        fetch(`https://api.mocki.io/v1/905393d9?id=${id}`)
            .then(res => res.json())
            .then(data => setVackel(data))
    }, [])
    return (

        <div className="container-fulid  bg-secondary">
            <div className="row">
                <div className="container">
                    <div className="row">
                        <HeaderTop />
      
          
                        <div className="col-md-4  p-5 mt-5 bg-dark" style={{ boxShadow: '5px 5px 20px' }}>

                            <h2 className="text-white">Are you ready for ride</h2>
                            <h6 className="text-white"> Pic From</h6>
                            <input type="text" name="" placeholder="From" /><br />  <br />
                            <h6 className="text-white"> Pic To</h6>
                            <input type="text" name="" placeholder="To" />
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-8 w-25">
                                        {id == 'Car' ? <img className="singleVaick w-100 p-3" src={car} alt="" /> : ''}
                                        {id == 'Bike' ? <img className="singleVaick w-100 p-3" src={bik} alt="" /> : ''}
                                        {id == 'Train' ? <img className="singleVaick w-100 p-3" src={train} alt="" /> : ''}
                                        {id == 'Bus' ? <img className="singleVaick w-100 p-3" src={bus} alt="" /> : ''}
                                    </div>
                                </div>
                            </div>
                            <input className="bg-warning pl-5 pr-5" type="submit" value="Search"/>
                        </div>
                        <div className="col-md-8">
                            <h1 className="text-white">Live Google maps</h1>
                            <Google />
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default SingleVaickel;