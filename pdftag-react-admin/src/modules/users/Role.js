import {FunctionField} from "react-admin";
import React from "react";
const ROLES = {'peacetrue': '超级管理员', 'admin': '管理员'};

export default <FunctionField label={'角色'} render={record => ROLES[record.username] || '普通用户'}/>
