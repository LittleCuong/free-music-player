import axios from "axios";
import { GoogleAuthProvider, signInWithPopup, getAuth, FacebookAuthProvider } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase.js";

import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

function AuthProvider({ children }) {
   
    const [token, setToken] = useState()

    const clientId = '331ec2d4422e40158118ed7027542e1b';
    const clientSecret = 'cdbfe903116848bf98cf47ad3ab24f22';

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading]  = useState(true)
    const [playlists, setPlaylists] = useState([])
    const [tracks, setTracks] = useState([])

    useEffect(() => {
        if (currentUser) {
            const trackRef = doc(db, "tracks", currentUser.uid);

            var unsubcribe = onSnapshot(trackRef, track => {
                if (track.exists()) {
                    // console.log(track.data());
                    setTracks(track.data().track);
                } else {
                    console.log("No tracks");
                }
            })

            return () => {
                unsubcribe()
            }
        }; 
        
        if (currentUser) {
            const playlistRef = doc(db, "playlists", currentUser.uid);

            var unsubcribe = onSnapshot(playlistRef, playlist => {
                if (playlist.exists()) {
                    console.log(playlist.data());
                    setPlaylists(playlist.data().playlist);
                } else {
                    console.log("No playlist");
                }
            })

            return () => {
                unsubcribe()
            }
        };    
    }, [currentUser])

    useEffect(() => {  
        if (currentUser) {
            const playlistRef = doc(db, "playlists", currentUser.uid);

            var unsubcribe = onSnapshot(playlistRef, playlist => {
                if (playlist.exists()) {
                    console.log(playlist.data());
                    setPlaylists(playlist.data().playlist);
                } else {
                    console.log("No playlist");
                }
            })

            return () => {
                unsubcribe()
            }
        };    
    }, [currentUser])

    function logout() {
        return auth.signOut()
    }

    function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        auth.signInWithPopup(provider)
    }

    function signInWithFacebook() {
        const provider = new FacebookAuthProvider();
        auth.signInWithPopup(provider)
    }

    useEffect(() => {
        const unsubcriber = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubcriber
    }, [])

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
            localStorage.setItem('token', JSON.stringify(tokenResponse.data.access_token))
            console.log(tokenResponse.data.access_token);
        });
    }, [clientId, clientSecret]); 

    const value = {
        token,
        currentUser,
        signInWithGoogle,
        signInWithFacebook,
        logout,
        tracks,
        playlists,
    }

    return ( 
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;