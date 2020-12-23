import Papa from "papaparse";
import XLSX from "xlsx";

export const csvParser = (file, options) => {
    return new Promise(((resolve, reject) => {
        Papa.parse(file, {
            ...options,
            complete(results, file) {
                console.log("Parsing complete:", results, file);
                let rows = results.data.filter(item => item && item.length > 1).map(row => row.map(item => item.trim()));
                let header = rows.shift();
                let records = rows.map((row) => {
                    let items = row.map((item, index) => [header[index], item]);
                    return Object.fromEntries(items);
                });
                console.info("records: ", records);
                resolve(records);
            },
            error(error) {
                reject(error);
            }
        });
    }));

}

export const xlsxParser = (file, options) => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = (e) => {
            let workbook = XLSX.read(e.target.result, {type: 'binary'});
            let records = workbook.SheetNames.map((sheetName) => {
                return XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {header: 1, raw: false});
            }).reduce((left, right) => left.concat(right), []);
            records.forEach((record) => record.forEach((item, index) => record[index] = item.trim ? item.trim() : item));
            console.info("records: ", records);
            console.info("pivotMatrix records: ", pivotMatrix(records));
            resolve(pivotMatrix(records));
        };
        reader.onerror = (ex) => reject(ex);
        reader.readAsBinaryString(file);
    });
}

export const parserBuilder = (file) => {
    let extension = file.name.split('.').pop();
    // return ({'xlsx': xlsxParser, 'csv': csvParser})[extension];
    return xlsxParser;
}

export default parserBuilder;

export const pivotMatrix = (rows) => {
    let pivotedRows = [];
    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i];
        for (let j = 0; j < cells.length; j++) {
            if (!pivotedRows[j]) pivotedRows[j] = [];
            pivotedRows[j][i] = cells[j];
        }
    }
    return pivotedRows;
}

export const arrayToObject = (items, keys) => {
    return Object.fromEntries(keys.map((key, index) => [key, items[index]]))
}

export const objectToArray = (items, keys) => {
    return keys.map(key => items[key]);
}

export const matrixToObject = (rows, headers) => {
    return rows.map(row => arrayToObject(row, headers));
}

export const objectToMatrix = (rows, headers) => {
    return rows.map(row => objectToArray(row, headers))
}
