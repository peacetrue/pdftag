import React from 'react';
import {Layout} from 'react-admin';
import CustomAppBar from './CustomAppBar';
import Menu from "./Menu";

const CustomLayout = props => <Layout {...props}
                                      menu={Menu}
                                      appBar={CustomAppBar}
/>;
export default CustomLayout;
