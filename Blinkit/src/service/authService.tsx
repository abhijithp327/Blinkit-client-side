import axios from 'axios';
import { BASE_URL } from './config';
import { tokenStorage } from '@state/Storage';
import { useAuthStore } from '@state/authStore';


export const customerLogin = async (phone: string) => {
    try {
        const response = await axios.post(`${BASE_URL}/customer/login`, { phone });
        // console.log("Login response", response.data);
        const { accessToken, refreshToken, customer } = response.data;
        tokenStorage.setItem('accessToken', accessToken);
        tokenStorage.setItem('refreshToken', refreshToken);
        const { setUser } = useAuthStore.getState();
        setUser(customer);
    } catch (error) {
        console.log("Login error", error);
    }
};