import React from "react";
import {Resource} from "react-admin";
import InstagramIcon from '@material-ui/icons/Instagram';
import {PhoneTagList} from './list';
import {PhoneTagCreate} from './create';
import {PhoneTagEdit} from './edit';
import {PhoneTagShow} from './show';

export const PhoneTag = {list: PhoneTagList, create: PhoneTagCreate, edit: PhoneTagEdit, show: PhoneTagShow};
const PhoneTagResource = <Resource icon={InstagramIcon} name="phone-tags" {...PhoneTag} />;
export default PhoneTagResource;
