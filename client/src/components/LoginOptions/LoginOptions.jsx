import React from 'react';
import "./LoginOptions.css";
import { Link } from 'react-router-dom';

const LoginOptions = ({visible}) => {

    return (
        <div className={`login-options ${visible ? "visible" : ""}`}>

            <div className='login-options-container'>
            <Link to='/student-login'><button className='login-option-button'>Student</button></Link>
            </div>
            <div className='login-options-container'>
            <Link to='/faculty-login'><button className='login-option-button'>Faculty</button></Link>    
            </div>
            <div className='login-options-container'>
            <Link to='/hod-login'><button className='login-option-button'>HOD</button></Link>
            </div>
            <div className='login-options-container'>
            <Link to='/admin-login'><button className='login-option-button'>Admin</button></Link>
            </div>
        </div>
    );
};

export default LoginOptions;