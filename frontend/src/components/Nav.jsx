import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './colors.css'
import SignForm from './SignForm/SignForm';

const Nav = (props) => {
    let message = ''
    if(props.logged) message = `Welcome ${props.name}`;
    else message = `Welcome guest`;

    const [ isSignForm, setIsSignForm ] = useState(false);

    const signFormOnClick = () =>{
        setIsSignForm(true)
    }

    return (
        <nav className="navbar navbar-expand navbar-dark blue">
        <div className="container">
            <div className="collapse navbar-collapse" id="navigation">
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/" className="nav-link">Hotels</Link>
                </li>
                <li className="nav-item">{`${message}`}</li>
                <li className="nav-item">
                    <Link to="#" onClick={signFormOnClick} className="nav-link">Sign In or Join</Link>
                    {isSignForm ? <SignForm setIsSignForm={setIsSignForm} /> : <></>}
                </li>
                
            </ul>
            </div>
        </div>
    </nav>
    )
}

export default Nav
