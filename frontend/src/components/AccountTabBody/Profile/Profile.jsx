import React, { useState, useEffect } from 'react';

import { Spinner } from 'react-bootstrap';

import Auth from '../../../utils/auth';
import { getSingleUser, updateUser } from '../../../utils/user-API';



const Profile = () => {

    const [ user, setUser ] = useState(null);

    useEffect(() => {
        (async () => {
            try{
                const userData = await Auth.getProfile();
                const token = Auth.getToken();
                const user = await getSingleUser(userData.data.username, token);
                console.log(user);
                setUser(user.data[0]) 
            }catch(err) {
                console.log(err);
            }
        })();
    }, [])

    const onChangeProfileForm = (event) => {
      let keyName = event.target.name;
      let inputValue = event.target.value;
      if(keyName === "street" || keyName === "city" || keyName === "zipcode" || keyName === "state"){
         setUser({...user, "address": {...user["address"], [keyName]: inputValue}})
      }else{
         setUser({...user, [keyName]: inputValue})
      }
    }

    const onChangeCreditCardForm = () => {

    }

    const onClickProfileUpdate = (event) => {
        event.preventDefault();

        const allInputEl = document.getElementsByClassName('profile-input');
        const profileUpdateBtnEl = document.getElementById('profile-update-btn');
        const profileUpdateSubmitEl = document.getElementById('profile-update-submit');
        const profileUpdateCancelEl = document.getElementById('profile-update-cancel');
        
        for(let i = 0; i < allInputEl.length; i++){
            allInputEl[i].disabled = false;
        }

        profileUpdateBtnEl.style.display = "none";
        profileUpdateSubmitEl.style.display = "block";
        profileUpdateCancelEl.style.display = "block";
    }

    const onClickProfileSumitBtn = async () => {
      console.log("submit btn")
      const allInputEl = document.getElementsByClassName('profile-input');
      let userInfo = {}
      let address = {}
      for(let i = 0; i < allInputEl.length; i++){
         if(allInputEl[i].name === "street" || allInputEl[i].name === "city" || allInputEl[i].name === "zipcode" || allInputEl[i].name === "state"){
            address[allInputEl[i].name] = allInputEl[i].value;
         }else{
            userInfo[allInputEl[i].name] = allInputEl[i].value;
         }
      }
      userInfo["address"] = address;
      console.log(userInfo);
      
      // Update userInfo
      try {
         let response = await updateUser(userInfo);
         console.log(response);
         onClickProfileCancelBtn();
      }catch(error){
         console.log(error);
      }
    }

    const onClickProfileCancelBtn = () => {
      const allInputEl = document.getElementsByClassName('profile-input');
      const profileUpdateBtnEl = document.getElementById('profile-update-btn');
      const profileUpdateSubmitEl = document.getElementById('profile-update-submit');
      const profileUpdateCancelEl = document.getElementById('profile-update-cancel');

      for(let i = 0; i < allInputEl.length; i++){
         allInputEl[i].disabled = true;
     }

     profileUpdateBtnEl.style.display = "block";
     profileUpdateSubmitEl.style.display = "none";
     profileUpdateCancelEl.style.display = "none";

    }

    return(<>
        {user != null ? 
        <div className="profile-tab-body-flex">
        <div id="profile-tab-body-profile-left">
            <div>
               <label htmlFor="username">User name: </label>
               <input className="profile-input" type="text" name="username" value={user.username ?? ""} onChange={onChangeProfileForm} disabled />
            </div>
            <div>
               <label htmlFor="firstName">First Name: </label>
               <input className="profile-input" type="text" name="firstName" value={user.firstName ?? ""} onChange={onChangeProfileForm} disabled />
            </div>
            <div>
               <label htmlFor="lastName">Last Name: </label>
               <input className="profile-input" type="text" name="lastName" value={user.lastName ?? ""} onChange={onChangeProfileForm} disabled />
            </div>
            <div>
               <label htmlFor="street">Street: </label>
               <input className="profile-input" type="text" name="street" value={user.address.street ?? ""} onChange={onChangeProfileForm} disabled />
            </div>
            <div>
               <label htmlFor="city">City: </label>
               <input className="profile-input" type="text" name="city" value={user.address.city ?? ""} onChange={onChangeProfileForm} disabled />
            </div>
            <div>
               <label htmlFor="state">State: </label>
               <input className="profile-input" type="text" name="state" value={user.address.state ?? ""} onChange={onChangeProfileForm}  disabled />
            </div>
            <div>
               <label htmlFor="zipcode">Zip code: </label>
               <input className="profile-input" type="text" name="zipcode" value={user.address.zipcode ?? ""} onChange={onChangeProfileForm} disabled />
            </div>
            <div>
               <label htmlFor="email">Email: </label>
               <input className="profile-input" type="email" name="email" value={user.email ?? ""} onChange={onChangeProfileForm} disabled />
            </div>
            <div>
               <label htmlFor="phoneNumber">Phone: </label>
               <input className="profile-input" type="tel" name="phoneNumber" value={user.phoneNumber ?? ""} onChange={onChangeProfileForm} disabled />
            </div>
            <div>
                <button id="profile-update-btn" onClick={onClickProfileUpdate}>Update</button>
                <button id="profile-update-submit" onClick={onClickProfileSumitBtn} style={{"display": "none"}}>Submit</button>
                <button id="profile-update-cancel" onClick={onClickProfileCancelBtn} style={{"display": "none"}}>Cancel</button>
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
       </div>

       : <div className="profile-tab-body-flex justify-content-center">
            <Spinner animation="border" variant="success" />
        </div>}

    </>
    );
}

export default Profile;