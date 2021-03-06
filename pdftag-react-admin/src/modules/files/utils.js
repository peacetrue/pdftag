import React from 'react';

export const toFormData = (data, fileAttr) => {
    if (fileAttr === undefined) {
        return toFormData({'file': {rawFile: data}}, 'file');
    }

    let formData = new FormData();
    let name = "filePart", fileCount = '1';
    let files = data[fileAttr].rawFile;
    if (files instanceof Array) {
        name = "files";
        fileCount = files.length;
    } else {
        files = [files];
    }

    files.forEach(file => formData.append(name, file, file.name));
    formData.append("_query", JSON.stringify({fileCount: fileCount}));
    Object.keys(data).filter(name => name !== fileAttr)
        .forEach(name => formData.append(name, data[name]));
    return formData;
}


export const buildUrl = (path, dispositionType, zoom) => `${process.env.REACT_APP_BASE_URL}/files/${path}?dispositionType=${dispositionType}${zoom || ''}`;
export const buildPreviewUrl = (path, zoom) => buildUrl(path, 'inline',zoom);
export const buildDownloadUrl = (path) => buildUrl(path, 'attachment');
