import {Button} from "react-admin";
import React from "react";
import GetAppIcon from '@material-ui/icons/GetApp';
import {buildUrl} from "./Utils";

export const DownloadButton = (props) => {
    let {
        label = '下载',
        filePath,
        record,
        filePathAttr = 'path',
        dispositionType = 'attachment'
    } = props;
    let download = e => {
        e.stopPropagation();
        filePath = filePath || record[filePathAttr];
        filePath && window.open(buildUrl(filePath, dispositionType));
    };
    return (
        <Button label={label} onClick={download}>
            <GetAppIcon/>
        </Button>
    );
}

export const PreviewButton = (props) => {
    return <DownloadButton label={'预览'} dispositionType={'inline'} {...props} />;
}
