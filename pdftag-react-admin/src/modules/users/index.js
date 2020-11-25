import React from "react";
import {Resource} from "react-admin";

import {UserList} from './list';
import {UserCreate} from './create';
import {UserEdit} from './edit';
import {UserShow} from './show';

export const User = {list: UserList, create: UserCreate, edit: UserEdit, show: UserShow};
const UserResource = <Resource options={{label: '用户'}} name="users" {...User} />;
export default UserResource;
