import {
    CREATE,
    DELETE,
    DELETE_MANY,
    GET_LIST,
    GET_MANY,
    GET_MANY_REFERENCE,
    GET_ONE,
    UPDATE,
    UPDATE_MANY
} from "react-admin";

/** used to format pagination params */
export const paginationParamsFormatter = (params) => {
    return {
        ...params.filter,
        page: params.pagination.page - 1,
        size: params.pagination.perPage,
        sort: `${params.sort.field},${params.sort.order}`
    };
}

/** used to format pagination response */
export const paginationResponseFormatter = (response) => {
    return {
        data: response.json.content,
        total: parseInt(response.json.totalElements, 10)
    };
}

/** used to build writeResponseFormatter which is used to format write(create/update) response */
export const writeResponseFormatterBuilder = (params) => {
    return (response) => {
        let data = response.json || response.body;
        console.info("create|update.response:", response);
        // for react-admin, the response data must has id otherwise error
        let dataType = typeof data;
        // not object, wrap as object
        if (dataType === 'string' || dataType === 'number' || dataType === 'boolean') data = {original: data};
        // without id, put params as default, may be there is id in params
        if (params && !data.id) data = {...params, ...data};
        // still without id, put 0, may be the business never need id
        if (data.id === undefined || data.id === null) data.id = 0;
        return {data: data};
    }
}

/** used to pick out url query params base on special field */
export const queryPickerBuilder = (fieldName = '_query') => {
    return (params) => {
        let queryObject = {};
        //for GET from params
        if (fieldName in params) {
            queryObject = {...params[fieldName]};
            delete params[fieldName];
        }
        //for POST/PUT from param.data
        if (params.data) {
            //for file upload
            if (params.data instanceof FormData) {
                let query = params.data.get(fieldName);
                if (query) {
                    queryObject = {...queryObject, ...JSON.parse(query)};
                    params.data.delete(fieldName);
                }
            } else if (fieldName in params.data) {
                queryObject = {...queryObject, ...params.data[fieldName]};
                delete params.data[fieldName];
            }
        }
        return Object.keys(queryObject).length === 0 ? null : queryObject;
    }
}

export const queryPicker = queryPickerBuilder();

export const urlFormatter = (url, params) => {
    if (url.includes('/')) return url;
    return `${url}/${params.id}`;
}

/**
 * Maps react-admin queries to a REST API implemented using Spring Rest
 *
 * @example
 * GET_LIST             => GET http://my.api.url/posts?keyword=&page=0&size=10&sort=id,asc
 * GET_ONE              => GET http://my.api.url/posts/123
 * GET_MANY             => GET http://my.api.url/posts?id=1234&id=5678
 * GET_MANY_REFERENCE   => GET http://my.api.url/comments?postId=&page=0&size=10&sort=id,asc
 * CREATE               => POST http://my.api.url/posts
 * UPDATE               => PUT http://my.api.url/posts/123
 * UPDATE_MANY          => multiple call UPDATE
 * DELETE               => DELETE http://my.api.url/posts/123
 * DELETE_MANY          => multiple call DELETE
 */
export default (apiUrl, httpClient = fetch) => {
    let dataProvider = (type, resource, params) => {
        let url = `${resource}`,
            options = {},
            format = response => ({data: response.json});
        switch (type) {
            case GET_LIST:
                options.method = 'GET';
                options.params = {...paginationParamsFormatter(params), ...queryPicker(params)};
                format = paginationResponseFormatter;
                break;
            case GET_ONE:
                url = urlFormatter(url, params);
                options.method = 'GET';
                options.params = queryPicker(params);
                break;
            case GET_MANY:
                options.method = 'GET';
                options.params = {id: params.ids, ...queryPicker(params)};
                break;
            case GET_MANY_REFERENCE:
                options.method = 'GET';
                options.params = {...paginationParamsFormatter(params), ...queryPicker(params)};
                options.params[params.target] = params.id;
                format = paginationResponseFormatter;
                break;
            case CREATE:
                options.method = 'POST';
                options.params = queryPicker(params);
                options.body = params.data;
                //support non-standard response
                format = writeResponseFormatterBuilder(params.data);
                break;
            case UPDATE:
                url = urlFormatter(url, params);
                options.method = 'PUT';
                options.params = queryPicker(params);
                options.body = params.data;
                //support non-standard response
                format = writeResponseFormatterBuilder(params.data);
                break;
            case UPDATE_MANY:
                //multiple call UPDATE
                let updates = params.ids.map(id => dataProvider(UPDATE, resource, {id, ...params}));
                return Promise.all(updates).then(response => ({data: response.map(item => item.data)}));
            case DELETE:
                url = urlFormatter(url, params);
                options.method = 'DELETE';
                options.params = queryPicker(params);
                break;
            case DELETE_MANY:
                //multiple call DELETE
                let deletes = params.ids.map(id => dataProvider(DELETE, resource, {id}));
                return Promise.all(deletes).then(response => ({data: response.map(item => item.data)}));
            default:
                throw new Error(`unknown type [${type}]`);
        }
        return httpClient(`${apiUrl}/${url}`, options).then(format);
    };
    return dataProvider;
};
