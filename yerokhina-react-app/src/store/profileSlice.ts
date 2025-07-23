import { createSlice } from '@reduxjs/toolkit';
import { fetchProfile } from "./profileThunk";
import type { RootState } from './store';


interface ProfileState {
    user:{
        username:string;
        email:string;
        id:number;
    } | null;
   
    loading:boolean;
    error:string | null;
    isAuth:boolean;
}

const initialState:ProfileState = {
    user:null,
    loading:false,
    error:null,
    isAuth:!!sessionStorage.getItem('access'),
}

const profileSlice = createSlice({
    name:'profile',
    initialState,
    reducers:{
        clearProfile:(state)=>{
            state.user=null,
            state.loading = false,
            state.error = null
        },
        setIsAuth:(state, action)=>{
            state.isAuth = action.payload;
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
            state.user = action.payload;
            
        })
        .addCase(fetchProfile.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch profile'
        })
    }
})

export const {clearProfile, setIsAuth} = profileSlice.actions;

export const selectProfile = (state:RootState)=>state.profile;
export const selectUsername = (state:RootState)=>state.profile.user?.username;
export const selectEmail = (state:RootState)=>state.profile.user?.email;

export const selectIsAuth = (state:RootState)=>state.profile.isAuth;

export default profileSlice.reducer;