// in src/App.js
import React from 'react';
import {Admin, fetchUtils, Resource} from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import chineseMessages from 'ra-language-chinese';
import {springDataProvider} from 'ra-data-spring-rest';
import FormAuthProvider from "./formAuthProvider";
import {defaultHttpClientJoiner, httpClientProxies} from 'peacetrue-httpclient'
import PhoneTagResource from './modules/phone-tags';
import TemplateResource from "./modules/templates";

const apiProxy = httpClient => {
    return (url, options) => {
        if (!url.startsWith("http")) url = process.env.REACT_APP_BASE_URL + url;
        return httpClient(url, options);
    };
};

const resultConverter = httpClient => {
    return (url, options) => {
        return httpClient(url, options)
            .then(response => response.json);
    };
};

export const debugHttpClient = (httpClient) => {
    return (url, options = {}) => {
        console.info("url:", url);
        console.info("options:", options);
        return httpClient(url, options);
    };
};

const i18nProvider = polyglotI18nProvider(() => chineseMessages, 'cn');
let httpClient = defaultHttpClientJoiner(fetchUtils.fetchJson, apiProxy, httpClientProxies.cors, httpClientProxies.springRest, debugHttpClient);

const dataProvider = springDataProvider(process.env.REACT_APP_BASE_URL, httpClient);
const authProvider = FormAuthProvider(process.env.REACT_APP_BASE_URL, defaultHttpClientJoiner(httpClient, resultConverter));
const App = () => (
    <Admin dataProvider={dataProvider}
           i18nProvider={i18nProvider}
           authProvider={authProvider}>
        {PhoneTagResource}
        {TemplateResource}
        <Resource name="profile"/>
    </Admin>
);

export default App;
