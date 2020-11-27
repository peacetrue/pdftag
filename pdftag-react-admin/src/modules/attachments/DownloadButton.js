import {Button} from "react-admin";
import React from "react";

export const DownloadButton = ({basePath, record, resource}) => {
    let download = e => {
        e.stopPropagation();
        window.open(`${process.env.REACT_APP_BASE_URL}/files/${record.path}`);
    };
    return (<Button label={'下载'} onClick={download}/>)
}
