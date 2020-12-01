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
                permissions.isAdmin ? null : phoneTag,
                <Resource icon={UserIcon}
                          name="users"
                          list={permissions.isAdmin ? User.list : null}
                          create={permissions.isAdmin ? User.create : null}
                          edit={permissions.isAdmin ? User.edit : null}
                          show={User.show}
                />,
                <Resource
                    name="templates"
                    list={permissions.isAdmin ? Template.list : null}
                    create={permissions.isAdmin ? Template.create : null}
                    edit={permissions.isAdmin ? Template.edit : null}
                    show={Template.show}
                />,
                permissions.isAdmin ? phoneTag : null,
                <Resource icon={AttachmentIcon}
                          name="attachments"
                          list={permissions.isAdmin ? Attachment.list : null}
                          create={permissions.isAdmin ? Attachment.create : null}
                          edit={permissions.isAdmin ? Attachment.edit : null}
                          show={Attachment.show}
                />
            ];
            return resources;
        }}
    </Admin>
);

export default App;
