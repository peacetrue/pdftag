import * as React from 'react';
import { Route } from 'react-router-dom';
import {PhoneTagImports} from './modules/phone-tags/imports';
import {Profile} from './modules/profile';

export default [
    <Route exact key={'phone-tags/imports'} path="/phone-tags/imports" render={() => <PhoneTagImports />} />,
    <Route exact key={'profile'} path="/profile" component={Profile} />,
];
