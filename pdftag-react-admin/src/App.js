// in src/App.js
import React from 'react';
import {Admin, Resource} from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import chineseMessages from 'ra-language-chinese';
import UserResource from './modules/users';
import TemplateResource from "./modules/templates";
import PhoneTagResource from './modules/phone-tags';
import AttachmentResource from './modules/attachments';
import FileResource from './modules/files';
import {authProvider, dataProvider} from "./instances";
import customRoutes from './routes';
import messages from "./messages";

const i18nProvider = polyglotI18nProvider(() => ({...chineseMessages, ...messages}), 'cn');

const App = () => (
    <Admin title="小米PDF标签"
           dataProvider={dataProvider}
           authProvider={authProvider}
           i18nProvider={i18nProvider}
           customRoutes={customRoutes}
    >
        {UserResource}
        {TemplateResource}
        {PhoneTagResource}
        {AttachmentResource}
        {FileResource}
        <Resource name="profile"/>
    </Admin>
);

export default App;
