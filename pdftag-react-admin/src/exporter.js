import jsonExport from 'jsonexport/dist';
import {downloadCSV} from 'react-admin';
import messages from "./messages";

//TODO global
export const _exporterBuilder = (resource, headers) => {
    if (!headers) headers = Object.keys(resource.fields);
    return entities => {
        entities = entities.map(entity => {
            let newEntity = {};
            Object.keys(entity).forEach(key => {
                if (headers.includes(key)) newEntity[resource.fields[key]] = entity[key];
            });
            return newEntity;
        });
        headers.forEach((item, index) => {
            headers[index] = resource.fields[item];
        });
        jsonExport(entities, {
            headers: headers
        }, (err, csv) => {
            downloadCSV('\uFEFF' + csv, resource.name);
        });
    }
}

export const exporterBuilder = (resource, headers) => {
    if (typeof resource === 'string') resource = messages.resources[resource];
    return _exporterBuilder(resource, headers);
}

export default exporterBuilder;
