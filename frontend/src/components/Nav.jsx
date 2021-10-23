import React from 'react'
import './colors.css'

const Nav = (props) => {
    let message = ''
    if(props.logged) message = `Welcome ${props.name}`;
    else message = `Welcome guest`;

    return (
        <nav className="navbar navbar-expand navbar-dark blue">
        <div className="container">
            <div className="collapse navbar-collapse" id="navigation">
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <a href="/" className="nav-link">Home</a>
                </li>
                <li className="nav-item">
                    <a href="/" className="nav-link">Hotels</a>
                </li>
                <li className="nav-item">{`${message}`}</li>
                <li className="nav-item">
                    <a href="/" className="nav-link">Sign In or Join</a>
                </li>
                
            </ul>
            </div>
        </div>
    </nav>
    )
}

export default Nav
