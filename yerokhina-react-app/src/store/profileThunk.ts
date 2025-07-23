import { createAsyncThunk } from "@reduxjs/toolkit";

import instance from "../api/api";

export const fetchProfile = createAsyncThunk(
    'profile/fetchProfile',
    async () =>{
        try{
            const response = await instance.get( '/auth/users/me/');
            return response.data
        }catch(error){
            console.log(error);
            throw error;
        }
    } 
)