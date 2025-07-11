import { createSlice } from '@reduxjs/toolkit';
import { fetchProfile } from "./profileThunk";
import type { RootState } from './store';


interface ProfileState {
    username:string;
    email:string;
    id:number;
    loading:boolean;
    error:string | null;
}

const initialState:ProfileState = {
    username:'',
    email:'',
    id:0,
    loading:false,
    error:null
}

const profileSlice = createSlice({
    name:'profile',
    initialState,
    reducers:{
        clearProfile:(state)=>{
            state.username = '',
            state.id = 0,
            state.email = '',
            state.loading = false,
            state.error = null
        }
    },
    extraReducers:(builder) =>{
        builder
        .addCase(fetchProfile.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProfile.fulfilled,(state,action)=>{
            state.loading = false;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.id = action.payload.id;
            
        })
        .addCase(fetchProfile.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch profile'
        })
    }
})

export const {clearProfile} = profileSlice.actions;

export const selectProfile = (state:RootState)=>state.profile;
export const selectUsername = (state:RootState)=>state.profile.username;
export const selectEmail = (state:RootState)=>state.profile.email;

export default profileSlice.reducer;