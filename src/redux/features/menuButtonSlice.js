import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    active: false,    
};

const menuButtonSlice = createSlice({
    name: 'menuMobile',
    initialState,
    reducers: {
        setActiveMenu: (state, action) => {
            state.active = action.payload;
        }

    },
});

export const { setActiveMenu } = menuButtonSlice.actions;

export default menuButtonSlice.reducer;