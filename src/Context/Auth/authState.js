import React, { useReducer, Children } from 'react';

//axios
import axiosClient from '../../config/axios';
import authToken from '../../config/authToken';

//types
import {
    SUCCESSFUL_SIGNUP, 
    UNSUCCESSFUL_SIGNUP, 
    GET_USER, 
    SUCCESSFUL_LOGIN, 
    UNSUCCESSFUL_LOGIN, 
    LOGOUT 
 } from '../../types/index';

//context
import AuthContext from './authContext';
//reducer
import authReducer from './authReducer';

const AuthState = props => {

    //initial state
    const authInitialState = {
        token: localStorage.getItem('token'),
        authenticated: null,
        user: null,
        message: null
    }


    //dispatch
    const [ state, dispatch ] = useReducer(authReducer, authInitialState);

    //functions
    const registerUser = async data => {
        try {
            const response = await axiosClient.post('/api/users', data)
            dispatch({
                type: SUCCESSFUL_SIGNUP,
                payload: response.data
            });

            //get the user
            authenticatedUser()
        } catch (error) {
            // console.log(error.response.data.msg);
            const alert ={
                msg: error.response.data.msg,
                category: "alert-error"
            }
            dispatch({
                type: UNSUCCESSFUL_SIGNUP,
                payload: alert
            })
        }
    }

    //return authenticated user
    const authenticatedUser = async()=> {
        const token = localStorage.getItem('token')
        if(token){
            //TODO: function to send token via headers
            authToken(token)
        }

        try {
            const response = await axiosClient.get('/api/auth');
            console.log(response);
            dispatch({
                type: GET_USER,
                payload: response.data
            })
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: SUCCESSFUL_LOGIN
            })
        }
    }



    return(
        <AuthContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,

                registerUser,
                
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;