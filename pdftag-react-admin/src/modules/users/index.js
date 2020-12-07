import React from "react";
import {Resource} from "react-admin";

import {UserList} from './list';
import {UserCreate} from './create';
import {UserEdit} from './edit';
import {UserShow} from './show';
import UserIcon from '@material-ui/icons/People';

export const User = {list: UserList, create: UserCreate, /*edit: UserEdit,*/ show: UserShow};
export const UserResource = <Resource icon={UserIcon} name="users" {...User} />;
export default UserResource;
