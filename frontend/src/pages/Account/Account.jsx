import React, { useState, useEffect } from 'react';
import { Tabs, Tab, TabContainer } from 'react-bootstrap';
import Auth from '../../utils/auth';
import profileImg from "../../assets/profile-img.png";
import './account.css'

const Account = () => { 

    const [user, setUser] = useState(null);

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

    const onClickTabMenu = (event) => {
        const profileTabMenu = document.getElementsByClassName('profile-tab-menu');

        for(let i = 0; i < profileTabMenu.length; i++){
            // if(profileTabMenu.getAttribute('class')){
                profileTabMenu[i].classList.remove('profile-tab-clicked');
            // }
        }

        event.target.classList.add('profile-tab-clicked');
    }

    return(<>
        <section className="profile-top">
            <img className="" src={profileImg} id="profile-img" alt="profile" />
            <div className="">
                <div id="profile-username">{user !=null ? user.username : 'User name'}</div>
                <div id="profile-menuname">Menu Name</div>
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
            <div>
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
        </section>
    </>)
}

export default Account;