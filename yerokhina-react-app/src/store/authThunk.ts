import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";
import instance from "../api/api";
import { store } from "./store";
import { setIsAuth } from "./profileSlice";

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
            const response = await instance.post<any, AxiosResponse<JwtResponse>>(
                '/auth/jwt/create/',
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
            const response = await instance.post<any, AxiosResponse<{ access: string }>>(
                '/auth/jwt/refresh/',
                { refresh }  //refresh:refresh

            );
            sessionStorage.setItem('access', response.data.access);

            location.reload();
            store.dispatch(setIsAuth(true))
            return response.data;
        } catch (error) {
            console.log(error);
            sessionStorage.clear(); //removeItem!
            location.href='/signin';
        }
    }
)