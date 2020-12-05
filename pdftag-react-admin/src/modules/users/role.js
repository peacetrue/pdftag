import * as React from "react";
import {FunctionField} from "react-admin";

export const ROLES = {'peacetrue': '超级管理员', 'admin': '管理员'};
export const roleField = <FunctionField label={'角色'} render={record => ROLES[record.username] || '普通用户'}/>
export default roleField;
