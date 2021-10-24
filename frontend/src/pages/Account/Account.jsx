import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import Auth from '../../utils/auth';
import profileImg from "../../assets/profile-img.png";
import './account.css'

const Account = () => { 

    const [user, setUser] = useState(null);
    const [tabMenuName, setTabMenuName] = useState("Overview");

    useEffect(() => {
        (async () => {
            if(!Auth.loggedIn()){
                window.location.assign('/'); 
            }else{
                const userData = await Auth.getProfile();
                setUser(userData.data);
            }
        })();
    }, [])


    const displayOverview = () => {
        const profileTabBodyEl = document.getElementById('profile-tab-body');
        profileTabBodyEl.innerHTML = `<div>Overview</div>`
    }

    const displayMyTrips = () => {
        const profileTabBodyEl = document.getElementById('profile-tab-body');
        profileTabBodyEl.innerHTML = `<h1>My Trips</h1>`
    }

    const displayprofile = () => {
        const profileTabBodyEl = document.getElementById('profile-tab-body');
        profileTabBodyEl.innerHTML = `<h1>Profile</h1>`
    }

    const onClickTabMenu = (event) => {
        const profileTabMenu = document.getElementsByClassName('profile-tab-menu');

        for(let i = 0; i < profileTabMenu.length; i++){
            profileTabMenu[i].classList.remove('profile-tab-clicked');
        }
        setTabMenuName(event.target.innerText);
        event.target.classList.add('profile-tab-clicked');

        switch(event.target.innerText){
            case("Overview"):
                displayOverview()
                break;
            case("My Trips"):
                displayMyTrips()
                break;
            case("Profile"):
                displayprofile()
                break;
            default:
                console.log("default");
        }
    }

    return(<>
    {user != null ? 
    <>
        <section className="profile-top">
        <img className="" src={profileImg} id="profile-img" alt="profile" />
        <div className="">
            <div id="profile-username">{user !=null ? user.username : <Spinner animation="border" variant="success" />}</div>
            <div id="profile-menuname">{tabMenuName}</div>
        </div>
        <div className="profile-end">
            <div>
                <h3>13,112</h3>
                <p>POINTS</p>
            </div>
            <div>
                <h3>21</h3>
                <p>NIGHTS THIS YEAR</p>
            </div>
        </div>
    </section>

    <section className="profile-menu">
        <div id="profile-tab-header">
            <div className="profile-tab-menu profile-tab-clicked" onClick={onClickTabMenu}>
                Overview
            </div>
            <div className="profile-tab-menu" onClick={onClickTabMenu}>
                My Trips
            </div>
            <div className="profile-tab-menu" onClick={onClickTabMenu}>
                Profile
            </div>
        </div>
        <div id="profile-tab-body">
            Tab Body
        </div>
    </section>
    </>
    
    : <Spinner animation="border" variant="success" />}
    </>)
}

export default Account;