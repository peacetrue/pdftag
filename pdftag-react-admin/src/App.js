// in src/App.js
import React from 'react';
import {Admin, Resource} from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import chineseMessages from 'ra-language-chinese';
import UserResource from './modules/users';
import TemplateResource from "./modules/templates";
import PhoneTagResource from './modules/phone-tags';
import AttachmentResource from './modules/attachments';
import {authProvider, dataProvider2 as dataProvider} from "./instances";
import customRoutes from './customRoutes';
import messages from "./messages";
import FileResource from "./modules/files";
import {AttachmentShow} from "./modules/attachments/show";
import {UserShow} from "./modules/users/show";
import {TemplateShow} from "./modules/templates/show";
import CustomLayout from "./CustomLayout";
import Dashboard from './Dashboard';

const i18nProvider = polyglotI18nProvider(() => ({...chineseMessages, ...messages}), 'cn');

const App = () => (
    <Admin title="小米PDF标签"
           dashboard={Dashboard}
           dataProvider={dataProvider}
           authProvider={authProvider}
           i18nProvider={i18nProvider}
           customRoutes={customRoutes}
           appLayout={CustomLayout}
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
                    <Resource name={'users'} show={UserShow} /*edit={UserEdit}*//>,
                    <Resource name={'templates'} show={TemplateShow}/>,
                    <Resource name={'attachments'} show={AttachmentShow}/>,
                ];
            }
            resources.push(<Resource name={'enums/ditaStyle'}/>);
            resources.push(<Resource name={'enums/phoneTagState'}/>);
            resources.push(<Resource name={'profile'}/>);
            return resources;
        }}
    </Admin>
);

export default App;
