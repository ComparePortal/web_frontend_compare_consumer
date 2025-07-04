import axios from 'axios';
// const baseDomain = 'http://localhost:1337'; // API for products
const baseDomain = 'https://beta.apinouthemes.com';
// export const basePostUrl = 'http://localhost:1337'; // API for post
// export const baseStoreURL = 'http://localhost:1337'; // API for vendor(store)
export const prodUrl = 'https://yashra.in:8002';
// export const prodUrl = "http://localhost:8000";
// export const ngEock = "https://7eee-103-252-171-140.in.ngrok.io"
export const customHeaders = {
    Accept: 'application/json',
};

export const baseUrl = `${baseDomain}`;

export default axios.create({
    baseUrl,
    headers: customHeaders,
});

export const serializeQuery = (query) => {
    return Object.keys(query)
        .map(
            (key) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
        )
        .join('&');
};
