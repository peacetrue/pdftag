import React from "react";
import {Resource} from "react-admin";
import AttachmentIcon from '@material-ui/icons/Attachment';
import {FileList} from './list';
import {FileCreate} from './create';
import {FileShow} from './show';

export const File = {list: FileList, create: FileCreate, show: FileShow};
const FileResource = <Resource icon={AttachmentIcon} name="files" {...File} />;
export default FileResource;
