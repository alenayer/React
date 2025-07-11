import { createSlice} from "@reduxjs/toolkit";
import {type RootState } from './store';

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
        toggleTheme:(state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';

        }
    }
})

export const {toggleTheme} = themeSlice.actions;
export const selectTheme = (state:RootState) => state.theme.mode;

export default themeSlice.reducer;