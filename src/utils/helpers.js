export const checkResponse = (res) => {
    if (res && res.ok) {
        return res;
    }
    throw Error(`${res.status} ${res.statusText}`);
}