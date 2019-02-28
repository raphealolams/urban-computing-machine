const xlsx = require('node-xlsx');

let Reader = {}



Reader.readFile = function (filePath){

    let obj = xlsx.parse(filePath); // parses a file
    let rows = [];
    

    for(let i = 0; i < obj.length; i++){
        let sheet = obj[i];
        for(let j = 0; j < sheet['data'].length; j++){
            rows.push(sheet['data'][j])
        }
    }

    return rows
}


module.exports = Reader