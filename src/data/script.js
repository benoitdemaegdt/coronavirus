const https = require('https');
const fs = require('fs');
const path = require("path");

// 0 - set global var
const URL = 'https://www.data.gouv.fr/fr/datasets/r/63352e38-d353-4b54-bfd1-f1b3ee1cabd7';
const GEO = JSON.parse(fs.readFileSync(path.resolve(__dirname, './geo.json')));

(async() => {

  const outputFrance = [];
  const outputRegions = [];
  const outputDepartements = [];

  // 1 - download and read latest spf dataset from data.gouv.fr
  const downloadLink = await getDownloadLink(URL);
  await downloadFile(downloadLink, './spf.csv');
  let rawSpf = fs.readFileSync(path.resolve(__dirname, './spf.csv'), 'utf8');
  rawSpf = rawSpf.replace(/"/g, '');
  rawSpf = rawSpf.replace(/;/g, ',');
  rawSpf = rawSpf.replace(/\r/g, '');

  // 2 - loop through lines and build datasets
  const lines = rawSpf.split('\n');

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i]) continue; // last line is empty :(
    const currentline = lines[i].split(',');
    if (currentline[1] === '1' || currentline[1] === '2') continue; // so far we do not care of male vs female
    if (!currentline[0]) continue; // bug in source data
    
    const date = formatDate(currentline[2]);
  
    if (i === 1 || outputFrance[outputFrance.length -1].date !== date) {
      outputFrance.push({
        date,
        hospitalisations: Number(currentline[3]),
        reanimations: Number(currentline[4]),
        retours:  Number(currentline[5]),
        deces: Number(currentline[6]),
      });
      outputRegions.push({
        date,
        regions: [{
          name: getRegionName(currentline[0]),
          hospitalisations: Number(currentline[3]),
          reanimations: Number(currentline[4]),
          retours:  Number(currentline[5]),
          deces: Number(currentline[6]),
        }],
      });
      outputDepartements.push({
        date,
        departements: [{
          num: currentline[0],
          name: getDepartmentName(currentline[0]),
          hospitalisations: Number(currentline[3]),
          reanimations: Number(currentline[4]),
          retours:  Number(currentline[5]),
          deces: Number(currentline[6]),
        }],
      });
    } else {
      // france
      outputFrance[outputFrance.length -1].hospitalisations += Number(currentline[3]);
      outputFrance[outputFrance.length -1].reanimations += Number(currentline[4]);
      outputFrance[outputFrance.length -1].retours += Number(currentline[5]);
      outputFrance[outputFrance.length -1].deces += Number(currentline[6]);
      // regions
      const regIdx = outputRegions[outputRegions.length -1].regions.findIndex(region => region.name === getRegionName(currentline[0]));
      if (regIdx !== -1 ) {
        outputRegions[outputRegions.length -1].regions[regIdx].hospitalisations += Number(currentline[3]);
        outputRegions[outputRegions.length -1].regions[regIdx].reanimations += Number(currentline[4]);
        outputRegions[outputRegions.length -1].regions[regIdx].retours += Number(currentline[5]);
        outputRegions[outputRegions.length -1].regions[regIdx].deces += Number(currentline[6]);
      } else {
        outputRegions[outputRegions.length -1].regions.push({
          name: getRegionName(currentline[0]),
          hospitalisations: Number(currentline[3]),
          reanimations: Number(currentline[4]),
          retours:  Number(currentline[5]),
          deces: Number(currentline[6]),
        });
      }
      // departements
      outputDepartements[outputDepartements.length -1].departements.push({
        num: currentline[0],
        name: getDepartmentName(currentline[0]),
        hospitalisations: Number(currentline[3]),
        reanimations: Number(currentline[4]),
        retours:  Number(currentline[5]),
        deces: Number(currentline[6]),
      });
    }
  }

  // 3 - write files
  let jsonFrance = JSON.stringify(outputFrance, null, 2);
  let jsonRegions = JSON.stringify(outputRegions, null, 2);
  let jsonDepartements = JSON.stringify(outputDepartements, null, 2);
  fs.writeFileSync(path.resolve(__dirname, './spf/france.json'), jsonFrance);
  fs.writeFileSync(path.resolve(__dirname,'./spf/regions.json'), jsonRegions);
  fs.writeFileSync(path.resolve(__dirname,'./spf/departements.json'), jsonDepartements);

})()
.catch(err => console.log('err :', err));

/**
 * 'YYYY-MM-DD' -> 'DD/MM/YYYY'
 */
function formatDate(date) {
  return date.split('-').reverse().join('/');
}

/**
 * "01" -> "Ain"
 */
function getDepartmentName(departmentNumber) {
  const dep = GEO.departements.find(dep => dep.num_dep === departmentNumber);
  return dep.dep_name;
}

/**
 * "01" -> "Auvergne-Rhône-Alpes"
 */
function getRegionName(departmentNumber) {
  const dep = GEO.departements.find(dep => dep.num_dep === departmentNumber);
  return dep.region_name;
}

/**
 * get csv download link from data gouv fr
 */
async function getDownloadLink(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, res => {
      // handle redirection
      if (res.statusCode !== 302) {
        reject(`Failed to get download link: ${res.statusCode}`);
      }
      resolve(res.headers.location);
    });
    // handle connection errors of the request
    request.on('error', err => reject(err))
  });
}

/**
 * download csv file
 */
async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.resolve(__dirname, dest));
    const request = https.get(url, res => {
      // handle http errors
      if (res.statusCode < 200 || res.statusCode > 299) {
        reject(`Failed to download file: ${res.statusCode}`);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    });
    // handle connection errors of the request
    request.on('error', err => reject(err))
  });
}
