import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import validator from 'validator'
import { useDispatch } from 'react-redux'
import { setError, removeError } from '../../actions/ui'
import { startRegisterWithEmailPassword } from '../../actions/auth'
import Swal from 'sweetalert2'


export const RegisterScreen = () => {

    const dispatch = useDispatch();


    const [formValues, handleInputChange] = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formValues;


    const handleRegister = (e) => {
        e.preventDefault();
        if ( isFormValid() ){
            dispatch( startRegisterWithEmailPassword( email, password, name ))
        }
    }

    const isFormValid = () => {
        if ( name.trim().length === 0){
            Swal.fire('Fail', 'Name is required', 'error');
            dispatch(setError('Name is required'))
            return false
        } else if( !validator.isEmail( email )){
            Swal.fire('Fail', 'Email is not valid', 'error');
            dispatch(setError('Email is not valid'))
            return false;
        }else if( password !== password2 || password.length < 5){
            Swal.fire('Fail', 'Password do not match or both have a length not valid', 'error');
            dispatch(setError('Passwords do not match'))
            return false
        }
        dispatch(removeError());
        return true;
    }
    return (
    <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={handleRegister}>                
                <input 
                    type="text"
                    placeholder="Name"
                    name = "name"
                    className="auth__input"
                    autoComplete="off"
                    value={ name }
                    onChange={handleInputChange}
                />

                <input 
                    type="text"
                    placeholder="Email"
                    name = "email"
                    className="auth__input"
                    autoComplete="off"
                    value = {email}
                    onChange={handleInputChange}
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name = "password"
                    className="auth__input"
                    value = {password}
                    onChange={handleInputChange}
                />

                <input 
                    type="password"
                    placeholder="Confirm Password"
                    name = "confirm"
                    className="auth__input"
                    value={password2}
                    onChange={handleInputChange}
                />

                <button className="btn btn-primary btn-block mb-5" type="submit">Sign Up</button>
            
                

                <Link to="/auth/login" 
                    className="link"
                    
                    >
                    Log in               
                </Link>

            </form>
    </>
    )
}
