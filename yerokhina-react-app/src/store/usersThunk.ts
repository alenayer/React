import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../api/api";

interface CreateUserData {
        "username": string,
        "email": string,
        "password": string,
        "course_group": number
}
interface ActivateUserData {
        "uid": string,
        "token": string,
}


export const createUser = createAsyncThunk(
    'users/createUser',
    async (data:CreateUserData) => {
        try{
        const response = await instance.post(
            '/auth/users/',
           {...data}
           
        );
        return response.data;
    } catch(error){
        console.log(error)

    }
} 
)
export const activateUser = createAsyncThunk(
    'users/activateUser',
    async (data:ActivateUserData) => {
     
        try{
        const response = await instance.post(
            '/auth/users/activation/',
           {...data}
           
        );
        return response.data;
    } catch(error){
        console.log(error)

    }
} 
)
