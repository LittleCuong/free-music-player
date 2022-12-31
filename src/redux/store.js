import { configureStore } from '@reduxjs/toolkit';
import { spotifyApi } from './services/spotifyApi';
import playerReducer from './features/playerSlice';
import menuButtonReducer from './features/menuButtonSlice.js'


export const store = configureStore({
    reducer: {
        [spotifyApi.reducerPath]: spotifyApi.reducer,
        player: playerReducer,
        menuMobile: menuButtonReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(spotifyApi.middleware),
});