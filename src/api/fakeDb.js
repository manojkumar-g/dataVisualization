import fs from 'fs'
import path from 'path'
import csvjson from 'csvjson'

const convToJson = (filePath) =>{
  var data = fs.readFileSync(path.join(__dirname, filePath), { encoding : 'utf8'});
  var options = {
    delimiter : ',',
    quote     : '"'
  };
  return csvjson.toObject(data, options);
}
console.log('reading matches.csv')
let matches = convToJson('../csv/matches.csv')
console.log('reading deliveries.csv')
let deliveries = convToJson('../csv/deliveries.csv');
export const getTotalMatches = () => matches;
