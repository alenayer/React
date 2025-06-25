import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ThemeMode = 'dark'|'light';

interface ThemeState{
    mode:ThemeMode;
}
const initialState:ThemeState = {
    mode:'light'
}

export const themeSlice = createSlice({
    name:'theme',
    initialState,
    reducers:{
        // Методы action креэторы
        toggleTheme:(state, action:PayloadAction<ThemeMode>) => {
            state.mode = action.payload;

        }
    }
})

export const {toggleTheme} = themeSlice.actions;

export default themeSlice.reducer;