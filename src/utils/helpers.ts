export const checkResponse = (response: Response): Response | PromiseLike<Response> => {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(`Error ${response.status}`);
}
    /*    
    return response.ok
        ? response
        : response.json().then((err) => Promise.reject(err));
}
*/

export function setCookie(name: string, value: string, props: any) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
}

export function getCookie(name: string) {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)') //eslint-disable-line
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string) {
    setCookie(name, '', { expires: -1 });
}