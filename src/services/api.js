import {
    checkResponse,
    setCookie,
    deleteCookie
} from "../utils/helpers";

export const updateToken = () => {
    const refreshToken = localStorage.getItem('refreshToken');

    if(refreshToken) {
        return fetch(`${process.env.REACT_APP_API_URL}/auth/refresh`, {
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
                localStorage.removeItem('accessToken');

                setCookie('accessToken', data.accessToken);
                localStorage.setItem('accessToken', data.accessToken);
            })
            .catch(error => {
                console.log(error);
            })
    }
}