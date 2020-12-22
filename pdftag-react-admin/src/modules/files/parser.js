import Papa from "papaparse";
import XLSX from "xlsx";

export const csvParser = (file) => {
    return new Promise(((resolve, reject) => {
        Papa.parse(file, {
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

export const xlsxParser = (file) => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = (e) => {
            let workbook = XLSX.read(e.target.result, {type: 'binary'});
            let records = workbook.SheetNames.map((sheetName) => {
                return XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            }).reduce((left, right) => left.concat(right), []);
            console.info("records: ", records);
            resolve(records);
        };
        reader.onerror = (ex) => reject(ex);
        reader.readAsBinaryString(file);
    });
}

export const parserBuilder = (file) => {
    let extension = file.name.split('.').pop();
    return ({'xlsx': xlsxParser, 'csv': csvParser})[extension];
}

export default parserBuilder;
