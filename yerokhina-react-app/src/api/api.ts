import axios from "axios";
import { store } from "../store/store";
import { refreshJwt } from "../store/authThunk";



axios.interceptors.request.use(
    config => {
        config.headers['jwtAuth'] = `Bearer ${sessionStorage.getItem('access')}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use((response) => response, // Pass successful responses through
    async (error) => {

        // Check for 401 status
        if (error.response.status === 401) {
            store.dispatch(refreshJwt());
            return;
        }
        return error;
    })

