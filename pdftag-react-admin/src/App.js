// in src/App.js
import React from 'react';
import {Admin, Resource} from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import chineseMessages from 'ra-language-chinese';
import UserResource from './modules/users';
import TemplateResource from "./modules/templates";
import PhoneTagResource from './modules/phone-tags';
import AttachmentResource from './modules/attachments';
import {authProvider, dataProvider} from "./instances";
import customRoutes from './routes';
import messages from "./messages";
import FileResource from "./modules/files";
import {AttachmentShow} from "./modules/attachments/show";
import {UserShow} from "./modules/users/show";
import {TemplateShow} from "./modules/templates/show";

const i18nProvider = polyglotI18nProvider(() => ({...chineseMessages, ...messages}), 'cn');

const App = () => (
    <Admin title="小米PDF标签"
           dataProvider={dataProvider}
           authProvider={authProvider}
           i18nProvider={i18nProvider}
           customRoutes={customRoutes}
    >
        {permissions => {
            let resources;
            if (permissions.isSuperManager) {
                resources = [
                    UserResource,
                    TemplateResource,
                    PhoneTagResource,
                    AttachmentResource,
                    FileResource,
                ];
            } else if (permissions.isManager) {
                resources = [
                    UserResource,
                    TemplateResource,
                    PhoneTagResource,
                    <Resource name={'attachments'} show={AttachmentShow}/>,
                ]
            } else {
                resources = [
                    PhoneTagResource,
                    <Resource name={'users'} show={UserShow}/>,
                    <Resource name={'templates'} show={TemplateShow}/>,
                    <Resource name={'attachments'} show={AttachmentShow}/>,
                ];
            }
            resources.push(<Resource name={'enums/ditaStyle'}/>);
            resources.push(<Resource name={'enums/phoneTagState'}/>);
            return resources;
        }}
    </Admin>
);

export default App;
