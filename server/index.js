"use strict";

let mysql = require("mysql");
let model = require("node-model.js");

let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'MyNewPass',
    database: 'hackupc'
});

let Accident = model("accidents", [
    "accident_index", "longitude", "latitude", "accident_severity", "light_conditions",
    "weather_conditions", "urban_or_rural"
]);

db.connect();

//let a = new Accident(db, {accident_severity: 2});
//a.get(function(data) {
//    console.log(a.data());
//});

/*Accident.count(db, {accident_severity: 1}, function(count) {
    console.log(count);
});*/

const query = `select * from accidents WHERE accident_severity > 1;`;

console.log("query");
db.query(query, (error, results, fields)=> {
    console.log(results);
});