import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

import './Cards.css'

const Cards = (props) => {
    console.log("fiend sonthing now", props.name)
    const { img, name } = props.newCar;
    const id = props.newCar;
    console.log(props.newCar.id);
    return (
        <div className="mainCard">
            <Card classNames="cardControl float-end" >
                <Card.Img variant="top" src={img} />
                <Card.Body className="cardbody">
                    <Link className=" cardBtn btn-primary p-3" to={`/singlevaickel/${name}`}>{name} </Link>
                </Card.Body>
            </Card>
        </div>


    );
};

export default Cards;