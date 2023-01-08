import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentSongs: [],
    currentIndex: undefined,
    currentPlaylist: [],
    isPlaying: false,
    activePlayer: false,
    bar: false,      
    imageUrl: undefined,
    artistName: undefined,
    favouritePlaylist: [],
    favourite: false,
    page: null,
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
            state.currentSongs = action.payload.track;
            state.currentIndex = action.payload.index;
        },

        setActivePlayer : (state, action) => {
            state.activePlayer = action.payload
        },
        
        nextSong: (state, action) => {
            switch (state.page) {
                case 'favourite':
                    state.currentSongs = state.currentPlaylist.at(action.payload).data                   
                    break;
                case 'artist':
                    state.currentSongs = state.currentPlaylist.at(action.payload)                                    
                    break;
                case 'home':
                    state.currentSongs = state.currentPlaylist.at(action.payload).track                                     
                    break;
                case 'result':
                    state.currentSongs = state.currentPlaylist.at(action.payload)                                    
                    break;
                case 'album':
                    state.currentSongs = state.currentPlaylist.at(action.payload)                                    
                    break;
                default: 
                    state.currentSongs = state.currentPlaylist.at(action.payload)                                    
                    break;
            }
            state.currentIndex = action.payload;
            state.isActive = true;
        },

        prevSong: (state, action) => {
            switch (state.page) {
                case 'favourite':
                    state.currentSongs = state.currentPlaylist.at(action.payload).data                   
                    break;
                case 'artist':
                    state.currentSongs = state.currentPlaylist.at(action.payload)                                    
                    break;
                case 'home':
                    state.currentSongs = state.currentPlaylist.at(action.payload).track                                     
                    break;
                case 'result':
                    state.currentSongs = state.currentPlaylist.at(action.payload)                                    
                    break;
                case 'album':
                    state.currentSongs = state.currentPlaylist.at(action.payload)                                    
                    break;    
                default: 
                    state.currentSongs = state.currentPlaylist.at(action.payload)                                    
                    break;
            }
            state.currentIndex = action.payload;
            state.isActive = true;
        },

        playPause: (state, action) => {
            state.isPlaying = action.payload;
        },

        playerBar: (state, action) => {
            state.bar = action.payload
        },
        setPage: (state, action) => {
            state.page = action.payload
        },
    },
});

export const {setPage, setActivePlayer, setBoolean, setCurrentPlaylist, setActiveSong, nextSong, prevSong, playPause, playerBar, setImageUrl, setArtistName, setFavouritePlaylist} = playerSlice.actions;

export default playerSlice.reducer;