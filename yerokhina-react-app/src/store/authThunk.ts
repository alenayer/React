import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";
import axios from "axios";

interface CreateJwtData {
    "email": string,
    "password": string,
}
interface JwtResponse {
    "access": string,
    "refresh": string,
}

export const createJwt = createAsyncThunk(
    'users/createJwt',
    async ({ data, navigate }: { data: CreateJwtData, navigate: () => void }) => {

        try {
            const response = await axios.post<any, AxiosResponse<JwtResponse>>(
                'https://studapi.teachmeskills.by/auth/jwt/create/',
                { ...data }

            );
            sessionStorage.setItem('access', response.data.access);
            sessionStorage.setItem('refresh', response.data.refresh);
            navigate();
            return response.data;
        } catch (error) {
            console.log(error)

        }
    }
)
export const refreshJwt = createAsyncThunk(
    'users/refreshJwt',
    async () => {

        try {
            const refresh = sessionStorage.getItem('refresh')
            const response = await axios.post<any, AxiosResponse<{ access: string }>>(
                'https://studapi.teachmeskills.by/auth/jwt/refresh/',
                { refresh }  //refresh:refresh

            );
            sessionStorage.setItem('access', response.data.access);

            location.reload();
            return response.data;
        } catch (error) {
            console.log(error);
            sessionStorage.clear(); //removeItem!
            location.href='/signin';
        }
    }
)