const fs = require('fs');
const path = require("path");

const outputFrance = [];
const outputRegions = [];
const outputDepartements = [];

// 1 - read files
const rawGeo = fs.readFileSync(path.resolve(__dirname, './geo.json'))
const geo = JSON.parse(rawGeo);

let rawSpf = fs.readFileSync(path.resolve(__dirname, './spf.csv'), 'utf8');
rawSpf = rawSpf.replace(/"/g, '');
rawSpf = rawSpf.replace(/;/g, ',');
rawSpf = rawSpf.replace(/\r/g, '');

// 2 - loop through lines and build dataset
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

// write files
let jsonFrance = JSON.stringify(outputFrance, null, 2);
let jsonRegions = JSON.stringify(outputRegions, null, 2);
let jsonDepartements = JSON.stringify(outputDepartements, null, 2);
fs.writeFileSync(path.resolve(__dirname, './spf/france.json'), jsonFrance);
fs.writeFileSync(path.resolve(__dirname,'./spf/regions.json'), jsonRegions);
fs.writeFileSync(path.resolve(__dirname,'./spf/departements.json'), jsonDepartements);

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
  const dep = geo.departements.find(dep => dep.num_dep === departmentNumber);
  return dep.dep_name;
}

/**
 * "01" -> "Auvergne-Rhône-Alpes"
 */
function getRegionName(departmentNumber) {
  const dep = geo.departements.find(dep => dep.num_dep === departmentNumber);
  return dep.region_name;
}
