import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const clientId = '331ec2d4422e40158118ed7027542e1b';
const clientSecret = 'cdbfe903116848bf98cf47ad3ab24f22';

const initialState = {
    activeSong: {},
    currentSongs: [],
    currentIndex: 0,
    currentPlaylist: [],
    isActive: false,
    isPlaying: false,
    playerBar: false,      
};

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setCurrentPlaylist: (state, action) => {
            state.currentPlaylist = action.payload;
        },

        setActiveSong: (state, action) => {
            state.activeSong = action.payload.track;
            state.currentSongs = action.payload.track;
            state.currentIndex = action.payload.index;
            state.isActive = true;
        },

        nextSong: (state, action) => {
            // if (state.currentPlaylist.at(action.payload)?.track) {
                state.currentSongs = state.currentPlaylist.at(action.payload).track                                       
                state.activeSong = state.currentPlaylist.at(action.payload);
            // } else {
            //     state.currentSongs = state.currentPlaylist.at(action.payload).track                                         
            //     state.activeSong = state.currentPlaylist[action.payload];
            // }
            state.currentIndex = action.payload;
            state.isActive = true;
        },

        prevSong: (state, action) => {
            if (state.currentSongs[action.payload]?.track) {
                state.activeSong = state.currentSongs[action.payload]?.track;
            } else {
                state.activeSong = state.currentSongs[action.payload];
            }

            state.currentIndex = action.payload;
            state.isActive = true;
        },

        playPause: (state, action) => {
            state.isPlaying = action.payload;
        },

        playerBar: (state, action) => {
            state.playerBar = action.payload
        },
    },
});

export const {setCurrentPlaylist, setActiveSong, nextSong, prevSong, playPause, playerBar} = playerSlice.actions;

export default playerSlice.reducer;