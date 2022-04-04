import { baseUrl } from '../utils/config';

import {
    setCookie
} from "../utils/helpers";

// Возобновление сессии
export const updateToken = async (): Promise<void> => {
    const refreshToken = localStorage.getItem('refreshToken');

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: refreshToken }),
    };

    if (refreshToken) {

        try {
            const request = await fetch(`${baseUrl}auth/token`, requestOptions);
            const data = await request.json();

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

