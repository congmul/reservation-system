import React, { useState, useEffect } from 'react';

import Auth from '../../../utils/auth';
import { getSingleUser } from '../../../utils/user-API';


const Profile = ({user}) => {


    useEffect(() => {
        (async () => {
            try{
                const userData = await Auth.getProfile();
                const token = Auth.getToken();
                const user = await getSingleUser(userData.data.username);
                console.log(user, token) 
            }catch(err) {
                console.log(err);
            }
        })();
    }, [])

    return(<div className="profile-tab-body-flex">
     <div id="profile-tab-body-profile-left">
         <div>
            <label htmlFor="firstName">First Name: </label>
            <input className="profile-input" type="text" name="firstName" disabled />
         </div>
         <div>
            <label htmlFor="lastName">Last Name: </label>
            <input className="profile-input" type="text" name="lastName" disabled />
         </div>
         <div>
            <label htmlFor="street">Street: </label>
            <input className="profile-input" type="text" name="street" disabled />
         </div>
         <div>
            <label htmlFor="city">City: </label>
            <input className="profile-input" type="text" name="city" disabled />
         </div>
         <div>
            <label htmlFor="state">State: </label>
            <input className="profile-input" type="text" name="state" disabled />
         </div>
         <div>
            <label htmlFor="zipcode">Zip code: </label>
            <input className="profile-input" type="text" name="zipcode" disabled />
         </div>
         <div>
            <label htmlFor="email">Email: </label>
            <input className="profile-input" type="email" name="email" disabled />
         </div>
         <div>
            <label htmlFor="phoneNumber">Phone: </label>
            <input className="profile-input" type="tel" name="phoneNumber" disabled />
         </div>
         <div>
             <button>Update</button>
         </div>
     </div>
     <div id="profile-tab-body-profile-right">
        <div>
            <label htmlFor="creditCard">Credit Card: </label>
            <input className="profile-cardInfo-input" type="text" name="creditCard" disabled />
         </div>
         <div>
            <label htmlFor="cardNumber">Card Number: </label>
            <input className="profile-cardInfo-input" type="text" name="cardNumber" disabled />
         </div>
         <div>
            <label htmlFor="expireDate">Expire: </label>
            <input className="profile-cardInfo-input" type="text" name="expireDate" disabled />
         </div>
         <div>
            <label htmlFor="cvcNumber">CVC: </label>
            <input className="profile-cardInfo-input" type="text" name="cvcNumber" disabled />
         </div>
     </div>
    </div>);
}

export default Profile;