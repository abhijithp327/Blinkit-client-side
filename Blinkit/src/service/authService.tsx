import axios from 'axios';
import { BASE_URL } from './config';
import { tokenStorage } from '@state/Storage';
import { useAuthStore } from '@state/authStore';
import { resetAndNavigate } from '@utils/NavigationUtils';
import { appAxios } from './apiInterceptors';


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


export const deliveryLogin = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${BASE_URL}/delivery/login`, { email, password });
        // console.log("Login response", response.data);
        const { accessToken, refreshToken, deliveryPartner } = response.data;
        tokenStorage.setItem('accessToken', accessToken);
        tokenStorage.setItem('refreshToken', refreshToken);
        const { setUser } = useAuthStore.getState();
        setUser(deliveryPartner);
    } catch (error) {
        console.log("Delivery Login error", error);
    }
};


export const refetchUser = async (setUser: any) => {
    try {
        const response = await appAxios.get(`/user`)
        // console.log("Login response", response.data);

        setUser(response.data.user);
    } catch (error) {
        console.log("Failed to refetch user", error);
    }
};


export const refresh_token = async () => {
    try {

        const refreshToken = tokenStorage.getString('refreshToken');

        const response = await axios.post(`${BASE_URL}/refresh-token`, { refreshToken });
        // console.log("Login response", response.data);

        const new_accessToken = response.data.accessToken;
        const new_refreshToken = response.data.refreshToken;

        tokenStorage.setItem('accessToken', new_accessToken);
        tokenStorage.setItem('refreshToken', new_refreshToken);

        return new_accessToken
    } catch (error) {
        console.log("Refresh token error", error);
        tokenStorage.removeItem('accessToken');
        tokenStorage.removeItem('refreshToken');
        resetAndNavigate("CustomerLogin");
    }
};