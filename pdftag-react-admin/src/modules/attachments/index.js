import React from "react";
import {Resource} from "react-admin";
import AttachmentIcon from '@material-ui/icons/Attachment';
import {AttachmentList} from './list';
import {AttachmentCreate} from './create';
import {AttachmentEdit} from './edit';
import {AttachmentShow} from './show';

export const Attachment = {list: AttachmentList, create: AttachmentCreate, edit: AttachmentEdit, show: AttachmentShow};
const AttachmentResource = <Resource icon={AttachmentIcon} options={{label: '附件'}} name="attachments" {...Attachment} />;
export default AttachmentResource;
