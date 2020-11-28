import {defaultHttpClientJoiner, httpClientProxies} from "peacetrue-httpclient";
import {fetchUtils} from "react-admin";
import springDataProvider from "./ra-data-spring-rest";
import FormAuthProvider from "./formAuthProvider";

// const apiProxy = httpClient => {
//     return (url, options) => {
//         if (!url.startsWith("http")) url = process.env.REACT_APP_BASE_URL + url;
//         return httpClient(url, options);
//     };
// };

export const debugHttpClient = (httpClient) => {
    return (url, options = {}) => {
        console.info("url:", url);
        console.info("options:", options);
        if (!options.headers) options.headers = new Headers();
        options.headers.set('X-Requested-With', 'XMLHttpRequest');
        return httpClient(url, options);
    };
};

const resultConverter = httpClient => {
    return (url, options) => {
        return httpClient(url, options)
            .then(response => response.json);
    };
};

export const httpClient = defaultHttpClientJoiner(fetchUtils.fetchJson, httpClientProxies.cors, httpClientProxies.springRest, debugHttpClient);
export const dataProvider = springDataProvider(process.env.REACT_APP_BASE_URL, httpClient);
export const authProvider = FormAuthProvider(process.env.REACT_APP_BASE_URL, defaultHttpClientJoiner(httpClient, resultConverter));
