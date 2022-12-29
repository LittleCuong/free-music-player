import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

function AuthProvider({ children }) {
   
    const [token, setToken] = useState()
    const [expiresIn, setExpiresIn] = useState()

    const clientId = '331ec2d4422e40158118ed7027542e1b';
    const clientSecret = 'cdbfe903116848bf98cf47ad3ab24f22';

    useEffect(() => {
        axios('https://accounts.spotify.com/api/token', {
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)      
            },
            data: 'grant_type=client_credentials',
            method: 'POST'
        })
        .then(tokenResponse => {      
            // console.log(tokenResponse);
            setToken(tokenResponse.data.access_token);
            console.log(tokenResponse.data.access_token);
        });
    }, [clientId, clientSecret]); 
    

    const value = {
        token,
    }

    return ( 
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;