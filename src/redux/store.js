import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './features/playerSlice';
import menuButtonReducer from './features/menuButtonSlice.js'


export const store = configureStore({
    reducer: {
        player: playerReducer,
        menuMobile: menuButtonReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});