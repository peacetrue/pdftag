import * as React from 'react';
import { Route } from 'react-router-dom';
import {PhoneTagImports} from './modules/phone-tags/imports';

export default [
    <Route exact path="/phone-tags/imports" render={() => <PhoneTagImports />} />,
];
