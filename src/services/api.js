import { baseUrl } from '../utils/config';

import {
    checkResponse,
    setCookie,
    getCookie
} from "../utils/helpers";

export const updateToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: refreshToken }),
    };

    if (refreshToken) {

        try {
            const response = await fetch(`${baseUrl}auth/token`, requestOptions);
            const data = await checkResponse(response);

            if (data.success) {
                setCookie('accessToken', data.accessToken.split('Bearer ')[1]);
                localStorage.setItem('refreshToken', data.refreshToken);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}

export const fetchUpdateToken = async (url, options) => {
    try {
        const response = await fetch(url, options);
        return await checkResponse(response);
    }
    catch (error) {

        console.log('Refreshing token');

        await updateToken();

        const response = await fetch(url, {
            method: options.method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getCookie('accessToken')
            }
        });
        return await checkResponse(response);
    }
}