import React from "react";
import {Resource} from "react-admin";

import {PhoneTagList} from './list';
import {PhoneTagCreate} from './create';
import {PhoneTagEdit} from './edit';
import {PhoneTagShow} from './show';

export const PhoneTag = {list: PhoneTagList, create: PhoneTagCreate, edit: PhoneTagEdit, show: PhoneTagShow};
const PhoneTagResource = <Resource options={{label: '标签'}} name="phone-tags" {...PhoneTag} />;
export default PhoneTagResource;