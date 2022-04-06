import moment from 'moment';


export const checkResponse = (response: Response): Response | PromiseLike<Response> => {
    if (response && response.ok) {
        return response;
    }
    throw Error(`${response.status} ${response.statusText}`);
}

export function setCookie(name: string, value: string, props: any = false) {
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


export function formatDate (date: string|undefined): string {
    const day = moment(date).format('DD');
    const time = moment(date).format('HH:mm');
    const today = moment().format('DD');
    if (day === today) {
        return `Сегодня в ${time}`;
    
    }
    else {
        return `Вчера в ${time}`;
    }
}

type TStatusResult = {
    color: string;
    statusText: string;
}

export function orderStatus(status: string | null | undefined): TStatusResult  {

    // color
    let color = '#000';

    // status
    let statusText = '';

    switch (status) {
        case 'done':
            color = 'done';
            statusText = 'Выполнен';
            break;
        case 'pending':
            color = 'pending';
            statusText = 'Готовится';
            break;
        case 'created':
            color = 'created';
            statusText = 'Создан';
            break;
        default:
            color = 'pending';
            statusText = 'Статус заказа неизвестен...';
            break;
    }

    return {
        color,
        statusText
    }
}





