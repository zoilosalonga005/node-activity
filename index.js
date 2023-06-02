'use strict';
//init packages    test
const https = require('https');
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
var json2xls = require('json2xls');
var QRCode = require('qrcode');
var bc = require('barcode');
var images = require("images");
const path = require('path');

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

  addBackgroundToImage() {
    try {
        images("resources/input/bg.jpg").draw(images("resources/input/cat.png"), 150, 300).save("resources/output/combined.jpg");
    } catch (error) {
      console.error(error);
    }
  }
  generateQRCode() {
    try {
      QRCode.toFile('resources/output/qr.png', 'http://servoitsolutions.ph', {
        color: {
          dark: '#000',  // Blue dots
          light: '#0000' // Transparent background
        }
      }, function (err) {
        if (err) throw err
        console.log('done')
      })
    } catch (error) {
      console.error(error);
    }
  }
  generateBarCode() {
    try {
      var code39 = bc('code39', {
        data: "SKU123",
        width: 400,
        height: 100,
    });
    
    var outfile = path.join(__dirname, 'resources/output', 'barcode.png')
    code39.saveImage(outfile, function (err) {
        if (err) throw err;
     
        console.log('File has been written!');
    });
    } catch (error) {
      console.error(error);
    }
  }

  extractMovieList() {
    try {
      https.get('https://api.themoviedb.org/3/discover/movie?api_key=97dbc2109259e56bea0ff208d8fab9a5&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate', res => {
  let data = [];
  const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
  console.log('Status Code:', res.statusCode);
  console.log('Date in Response header:', headerDate);

  res.on('data', chunk => {
    data.push(chunk);
  });

  res.on('end', () => {
    console.log('Response ended: ');
    const movies = JSON.parse(Buffer.concat(data).toString());
    console.log(movies.results);

    var xls = json2xls(movies.results);
    fs.writeFileSync('resources/output/data.xlsx', xls, 'binary');

  });
}).on('error', err => {
  console.log('Error: ', err.message);
});

    } catch (error) {
      console.error(error);
    }
  }


}
//call
let UtilObj = new Utilx();
UtilObj.generateBarCode();
