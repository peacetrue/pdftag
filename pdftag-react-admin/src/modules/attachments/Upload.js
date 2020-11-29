import React from 'react';

export const toFormData = files => {
    let formData = new FormData();
    let name = "file", fileCount = '1';
    if (files instanceof Array) {
        if (files.length > 1) {
            name = "files";
            fileCount = 'n';
        }
    } else {
        files = [files];
    }

    files.forEach(file => formData.append(name, file, file.name));
    formData.append("_query", JSON.stringify({fileCount: fileCount}));
    return formData;
}

export const transformFactory = (dataProvider, name) => {
    return data => {
        console.info("transform.data:", data);
        return dataProvider.create('attachments', {data: toFormData(data[name].rawFile)})
            .then(response => {
                return {...data, [name]: response.data.id};
            });
    };
}

export default transformFactory;
