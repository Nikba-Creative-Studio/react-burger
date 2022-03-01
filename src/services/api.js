import { baseUrl } from '../utils/config';

import {
    checkResponse,
    setCookie,
    deleteCookie
} from "../utils/helpers";

export const updateToken = () => {
    const refreshToken = localStorage.getItem('refreshToken');

    if(refreshToken) {
        return fetch(`${baseUrl}auth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: refreshToken
            })
        })
            .then(checkResponse)
            .then(res => res.json())
            .then(data => {
                deleteCookie('accessToken');
                localStorage.removeItem('refreshToken');

                setCookie('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
            })
            .catch(error => {
                console.log(error);
            })
    }
}