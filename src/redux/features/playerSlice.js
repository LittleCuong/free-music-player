import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeSong: {},
    currentSongs: [],
    currentIndex: 0,
    currentPlaylist: [],
    isActive: false,
    isPlaying: false,
    playerBar: false,      
    imageUrl: undefined,
    artistName: undefined,
    favouritePlaylist: [],
    favourite: false,
}
const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setBoolean: (state, action) => {
            state.favourite = action.payload
        },

        setFavouritePlaylist: (state, action) => {
            state.favouritePlaylist = action.payload;
        },

        setCurrentPlaylist: (state, action) => {
            state.currentPlaylist = action.payload;
        },

        setImageUrl: (state, action) => {
            state.imageUrl = action.payload
        },

        setArtistName: (state, action) => {
            state.artistName = action.payload
        },

        setActiveSong: (state, action) => {
            state.activeSong = action.payload.track.name;
            state.currentSongs = action.payload.track;
            state.currentIndex = action.payload.index;
            state.isActive = true;
        },

        nextSong: (state, action) => {
            switch (state.favourite) {
                case true:
                    state.currentSongs = state.currentPlaylist.at(action.payload).data                   
                    break;
                case false:
                    state.currentSongs = state.currentPlaylist.at(action.payload).track                                     
                    state.activeSong = state.currentPlaylist.at(action.payload);
                    break;
                default:
                    break;
            }
            // if (state.favourite = true) {
            //     state.currentSongs = state.currentPlaylist.at(action.payload).data                   
            // } else {
            //     state.currentSongs = state.currentPlaylist.at(action.payload).track                                     
            //     state.activeSong = state.currentPlaylist.at(action.payload);
            // }
            state.currentIndex = action.payload;
            state.isActive = true;
        },

        prevSong: (state, action) => {
            state.currentSongs = state.currentPlaylist.at(action.payload).track
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

export const {setBoolean, setCurrentPlaylist, setActiveSong, nextSong, prevSong, playPause, playerBar, setImageUrl, setArtistName, setFavouritePlaylist} = playerSlice.actions;

export default playerSlice.reducer;