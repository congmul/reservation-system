// Style: sass/components/_signForm.scss
import React from 'react';

import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';

import './style.css';

const SignForm = () => { 

    return(<>
    <section className="card">
        <div className="card-header">
            <div className="signIn-register">
                <div className="signIn-register-left">
                    <SignIn />
                </div>
                <div className="signIn-register-center">
                    {/* Center Vertical Divider */}
                </div>
                <div className="signIn-register-right">
                    <SignUp />
                </div>
            </div>
        </div>
    </section>
</>)}

export default SignForm;