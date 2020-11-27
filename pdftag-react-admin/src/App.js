// in src/App.js
import React from 'react';
import {Admin, fetchUtils, Resource} from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import chineseMessages from 'ra-language-chinese';
import springDataProvider from './ra-data-spring-rest'
import FormAuthProvider from "./formAuthProvider";
import {defaultHttpClientJoiner, httpClientProxies} from 'peacetrue-httpclient'
import UserResource from './modules/users';
import TemplateResource from "./modules/templates";
import PhoneTagResource from './modules/phone-tags';
import AttachmentResource from './modules/attachments';
import {authProvider,dataProvider} from "./instances";
import customRoutes from './routes';

const i18nProvider = polyglotI18nProvider(() => chineseMessages, 'cn');

const App = () => (
    <Admin title="小米PDF标签"
           dataProvider={dataProvider}
           i18nProvider={i18nProvider}
           authProvider={authProvider}
           customRoutes={customRoutes}
    >
        {UserResource}
        {AttachmentResource}
        {TemplateResource}
        {PhoneTagResource}
        <Resource name="profile"/>
    </Admin>
);

export default App;
