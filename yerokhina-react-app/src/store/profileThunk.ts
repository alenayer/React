import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProfile = createAsyncThunk(
    'profile/fetchProfile',
    async () =>{
        try{
            const response = await axios.get( 'https://studapi.teachmeskills.by/auth/users/me/',
            {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('access')}`
                }
            }
            );
            return response.data
        }catch(error){
            console.log(error);
            throw error;
        }
    } 
)