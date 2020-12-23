import * as React from 'react';
import {useSelector} from 'react-redux';
import {Box, useMediaQuery} from '@material-ui/core';
import {getResources, MenuItemLink, useTranslate} from 'react-admin';
import DefaultIcon from '@material-ui/icons/ViewList';
import HelpIcon from '@material-ui/icons/Help';

const Menu = ({onMenuClick, logout}) => {
    const isXSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));
    const open = useSelector(state => state.admin.ui.sidebarOpen);
    const resources = useSelector(getResources);
    const translate = useTranslate();
    return (
        <Box mt={1}>
            {resources.filter(resource => resource.hasList).map(resource => {
                return (
                    <MenuItemLink
                        key={resource.name}
                        to={`/${resource.name}`}
                        primaryText={
                            (resource.options && resource.options.label) ||
                            translate(`resources.${resource.name}.name`)
                        }
                        leftIcon={
                            resource.icon ? <resource.icon/> : <DefaultIcon/>
                        }
                        onClick={onMenuClick}
                        sidebarIsOpen={open}
                    />
                )
            })}
            <MenuItemLink
                to="/help"
                primaryText="帮助"
                leftIcon={<HelpIcon/>}
                onClick={onMenuClick}
                sidebarIsOpen={open}
            />
            {isXSmall && logout}
        </Box>
    );
};

export default Menu;
