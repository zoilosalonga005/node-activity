'use strict';
//init packages
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
var json2xls = require('json2xls');
class Utilx {
    excelToJSON() {
        try {
            const result = excelToJson({
                source: fs.readFileSync('resources/input/names.xlsx') // fs.readFileSync return a Buffer
            });
            var json = JSON.stringify(result);
    
            //convert json
            fs.writeFile('resources/output/names.json', json, 'utf8', function (err) {
                if (err) throw err;
                console.log('Convert Excel to JSON Success');
            }
            );
          } catch (error) {
            console.error(error);
           
          }
    }

    JSONToExcel() {
       
        try {
            // Getting information for a file
            const { readFileSync } = require('fs');
            const data = readFileSync('resources/input/toconvert.json');

            var xls = json2xls(JSON.parse(data));

            fs.writeFileSync('resources/output/convertednames.xlsx', xls, 'binary');
            console.log('Convert JSON to Excel Success');
          } catch (error) {
            console.error(error);
          }
          
        
    }

}
//call
let UtilObj = new Utilx();
UtilObj.excelToJSON();
