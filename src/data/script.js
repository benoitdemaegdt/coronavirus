const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

(async() => {
  try {
    const csv = await readFile('./covid19.csv', 'utf8');
    const lines = csv.split('\n');

    let result = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {

      const obj = {};
      const currentline = lines[i].split(',');

      for (let j=0; j < headers.length; j++) {
        if (headers[j] === 'Date') {
          obj[headers[j]] = formatDate(currentline[j]);
        } else if (['Guadeloupe', 'Saint-Barthélémy', 'Saint-Martin', 'Guyane', 'Martinique', 'Mayotte', 'La Réunion'].includes(headers[j])) {
          obj['DROM'] = (obj['DROM'] || 0) + Number(currentline[j]);
        } else {
          obj[headers[j]] = Number(currentline[j]);
        }
        obj['France'] = (obj['France'] || 0) + Number(currentline[j]);
      }

      result.push(obj);

    }

    result = result.filter(item => item.Date);
    let json = JSON.stringify(result, null, 2);

    fs.writeFileSync('covid19.json', json);

  } catch (err) {
    console.log('Error', err);
  }
})();

/**
 * 'YYYY/MM/DD' -> 'DD/MM/YYYY'
 */
function formatDate(date) {
  return date.split('/').reverse().join('/');
}
