import axios from "axios"
import { useContext, useState } from "react";
import { useGetAccessTokenQuery } from "../redux/services/spotifyApi";

const clientId = '331ec2d4422e40158118ed7027542e1b';
const clientSecret = 'cdbfe903116848bf98cf47ad3ab24f22';

// const getAuth = () => {
//     const response = axios('https://accounts.spotify.com/api/token', {
//         headers: {
//             'Content-Type' : 'application/x-www-form-urlencoded',
//             'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)      
//         },
//         data: 'grant_type=client_credentials',
//         method: 'POST'
//     })
//     console.log(response);
//     sessionStorage.setItem('token', JSON.stringify(response.data.access_token));
// }
// getAuth()

axios('https://accounts.spotify.com/api/token', {
    headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)      
    },
    data: 'grant_type=client_credentials',
    method: 'POST'
})
.then(tokenResponse => {      
    localStorage.setItem('token', JSON.stringify(tokenResponse.data.access_token));
});

const apiConfig = {
    baseURL: 'https://api.spotify.com/v1',
    // key: ,
}

export default apiConfig