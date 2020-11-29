import {Button, useNotify} from "react-admin";
import React from "react";
import GetAppIcon from '@material-ui/icons/GetApp';

export const DownloadButton = ({label = '下载', filePath, record, filePathAttr = 'path'}) => {
    let notify = useNotify();
    let download = e => {
        e.stopPropagation();
        filePath = filePath || record[filePathAttr];
        if (filePath) {
            window.open(`${process.env.REACT_APP_BASE_URL}/files/${filePath}`);
        } else {
            notify("PDF文件尚在生成中，请稍后刷新列表重试！");
        }
    };
    return (
        <Button label={label} onClick={download}>
            <GetAppIcon/>
        </Button>
    );
}
