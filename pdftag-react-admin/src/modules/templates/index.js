import React from "react";
import {Resource} from "react-admin";

import {TemplateList} from './list';
// import {TemplateCreate} from './create';
import {TemplateEdit} from './edit';
import {TemplateShow} from './show';

export const Template = {list: TemplateList, /*create: TemplateCreate,*/ edit: TemplateEdit, show: TemplateShow};
const TemplateResource = <Resource options={{label: '模版'}} name="templates" {...Template} />;
export default TemplateResource;
