import {defaultHttpClientJoiner, httpClientProxies} from "peacetrue-httpclient";
import {fetchUtils, GET_ONE} from "react-admin";
import springDataProvider from "./ra-data-spring-rest";
import formAuthProvider from "./formAuthProvider";

export const debugRequestHttpClient = (httpClient) => {
    return (url, options = {}) => {
        console.info("url:", url, options);
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

export const httpClient = defaultHttpClientJoiner(fetchUtils.fetchJson, httpClientProxies.cors, httpClientProxies.springRest, debugRequestHttpClient);
export const dataProvider = springDataProvider(process.env.REACT_APP_BASE_URL, httpClient);
export const dataProvider2 = (type, resource, params) => {
    if (resource === 'profile' && type === GET_ONE) {
        let token = localStorage.getItem('token');
        if (token) {
            let user = JSON.parse(token);
            return Promise.resolve({data: {...user, id: 'profile'}});
        }
        return Promise.reject();
    }
    return dataProvider(type, resource, params);
}
export const authProvider = formAuthProvider(process.env.REACT_APP_BASE_URL, defaultHttpClientJoiner(httpClient, resultConverter));
