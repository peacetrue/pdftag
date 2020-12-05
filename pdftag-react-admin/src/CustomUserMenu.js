import * as React from 'react';
import {forwardRef} from 'react';
import {MenuItemLink, UserMenu} from 'react-admin';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const ConfigurationMenuItem = forwardRef(({onClick}, ref) => (
    <MenuItemLink
        ref={ref}
        to="/configuration"
        primaryText="Configuration"
        leftIcon={<SettingsIcon/>}
        onClick={onClick} // close the menu on click
    />
));

const ProfileMenuItem = forwardRef(({onClick}, ref) => (
    <MenuItemLink
        ref={ref}
        to="/profile"
        primaryText="个人资料"
        leftIcon={<AccountCircleIcon/>}
        onClick={onClick} // close the menu on click
    />
));

export const CustomUserMenu = props => (
    <UserMenu {...props}>
        <ProfileMenuItem/>
        {/*<ConfigurationMenuItem/>*/}
    </UserMenu>
);

export default CustomUserMenu;
