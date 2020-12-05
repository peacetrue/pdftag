import React from 'react';
import {toFormData} from "../files/utils";

export const transform = toFormData;

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
