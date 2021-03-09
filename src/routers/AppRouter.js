import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'
import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import { firebase } from '../firebase/firebase-config'
import { useDispatch } from 'react-redux'
import { login } from '../actions/auth'
import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [flag, setflag] = useState(true);
    const [isLoggedIn, setisLoggedIn] = useState(false)

    useEffect(() => {
        firebase.auth().onAuthStateChanged( (user) => {
            if ( user?.uid ){
                dispatch( login(user.uid, user.displayName) )
                setisLoggedIn( true );
            }else{
                setisLoggedIn( false );
            }

            setflag( false );
        })// creates an observable. When the authentication changes, the observable will be executed 

    }, [dispatch, setflag, setisLoggedIn]);

    if( flag ){
        return ( 
            <h1>Wait...</h1>
        )
    }
    return (
    <Router>
        <div>
        <Switch>
                <PublicRoute path="/auth" component={AuthRouter} isLoggedIn={isLoggedIn} />
                <PrivateRoute exact path="/" component={JournalScreen} isLoggedIn={isLoggedIn} />
                <Redirect to="/auth/login" />
        </Switch>
        </div>
    </Router>
        
          
    )
}
