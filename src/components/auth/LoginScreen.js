import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth'
import { useForm } from '../../hooks/useForm'
import validator from 'validator'
import { removeError, setError } from '../../actions/ui'
export const LoginScreen = () => {

    const dispatch = useDispatch();
    const {error, loading} = useSelector(state => state.ui);

    console.log( error )
    const [ values, handleInputChange ] = useForm({
        email: 'fraloal97@gmail.es',
        password: '123456'
    })

    const {email, password} = values;


    const handleLogin = (e) => {
        e.preventDefault();
        if( isFormValid()){
            dispatch( startLoginEmailPassword(email, password) ) //and action dispatchs another async action
        }
        
    }

    const handleGoogleLogin = () => {
        dispatch( startGoogleLogin() )
    }

    const isFormValid = () => {
        if( !validator.isEmail( email )){
            dispatch(setError('Email format is not correct'));
            return false;
        }else if( password.length < 5){
            dispatch(setError('Password too short'));
            return false;
        }

        dispatch(removeError());
        return true;
    }
    return (
        <>
            <h3 className="auth__title">Login</h3>

            <form onSubmit={handleLogin}>
                { 
                    error &&
                    (
                        <div className="auth__alert-error">
                            { error }
                        </div>
                    )
                
                
                }
                
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

                <button type="submit" className="btn btn-primary btn-block" disabled={ loading }>Log In</button>
            
                <div className="auth__social_networks">
                    <p>Google with social networks</p>
                    <div 
                            className="google-btn"
                            onClick={handleGoogleLogin}
                        >
                            <div className="google-icon-wrapper">
                                <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                            </div>
                            <p className="btn-text">
                                <b>Sign in with google</b>
                            </p>
                        </div>
                </div>

                <Link to="/auth/register" className="link">
                    Create new account                
                </Link>

            </form>
        </>
    )
}
