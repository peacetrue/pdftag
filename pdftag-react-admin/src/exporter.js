import jsonExport from 'jsonexport/dist';
import {downloadCSV} from 'react-admin';
import messages from "./messages";

//TODO global
export const _exporterBuilder = ({resource, headers, fileName}) => {
    //字段编码
    if (!headers) headers = Object.keys(resource.fields);
    return entities => {
        let newEntities = entities.map(entity => {
            let newEntity = {};
            Object.keys(entity).forEach(key => {
                if (headers.includes(key)) newEntity[resource.fields[key]] = entity[key];
            });
            return newEntity;
        });
        headers.forEach((item, index) => headers[index] = resource.fields[item]);
        jsonExport(newEntities, {
            headers: headers
        }, (err, csv) => {
            if (typeof fileName === "function") fileName = fileName(entities[0]);
            downloadCSV('\uFEFF' + csv, fileName || resource.name);
        });
    }
}

export const exporterBuilder = (resource, headers, fileName) => {
    if (typeof resource === 'string') resource = messages.resources[resource];
    return _exporterBuilder({resource, headers, fileName});
}

export default exporterBuilder;
