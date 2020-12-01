// in src/App.js
import React from 'react';
import {Admin, Resource} from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import chineseMessages from 'ra-language-chinese';
import {User} from './modules/users';
import UserIcon from '@material-ui/icons/People';
import {Template} from "./modules/templates";
import {PhoneTag} from './modules/phone-tags';
import {Attachment} from './modules/attachments';
import InstagramIcon from '@material-ui/icons/Instagram';
import AttachmentIcon from '@material-ui/icons/Attachment';
import {authProvider, dataProvider} from "./instances";
import customRoutes from './routes';
import messages from "./messages";
import FileResource from "./modules/files";

const i18nProvider = polyglotI18nProvider(() => ({...chineseMessages, ...messages}), 'cn');

const App = () => (
    <Admin title="小米PDF标签"
           dataProvider={dataProvider}
           authProvider={authProvider}
           i18nProvider={i18nProvider}
           customRoutes={customRoutes}
    >
        {permissions => {
            console.info("permissions:", permissions)
            let phoneTag = <Resource icon={InstagramIcon}
                                     name="phone-tags"
                                     list={PhoneTag.list}
                                     create={PhoneTag.create}
                                     edit={PhoneTag.edit}
                                     show={PhoneTag.show}
            />;
            let resources = [
                permissions.isManager ? null : phoneTag,
                <Resource icon={UserIcon}
                          name="users"
                          list={permissions.isManager ? User.list : null}
                          create={permissions.isManager ? User.create : null}
                          edit={permissions.isManager ? User.edit : null}
                          show={User.show}
                />,
                <Resource
                    name="templates"
                    list={permissions.isManager ? Template.list : null}
                    create={permissions.isManager ? Template.create : null}
                    edit={permissions.isManager ? Template.edit : null}
                    show={Template.show}
                />,
                permissions.isManager ? phoneTag : null,
                <Resource icon={AttachmentIcon}
                          name="attachments"
                          list={permissions.isSuperManager ? Attachment.list : null}
                          create={permissions.isSuperManager ? Attachment.create : null}
                          edit={permissions.isSuperManager ? Attachment.edit : null}
                          show={Attachment.show}
                />,
                permissions.isSuperManager ? FileResource : null,
                <Resource name={'profile'}/>
            ];
            return resources;
        }}
    </Admin>
);

export default App;
