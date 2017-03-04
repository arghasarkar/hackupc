"use strict";

const PORT = 4000;

let express = require("express");
let mysql = require("mysql");
let model = require("node-model.js");

let app = express();
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

const query = `select * from accidents_full WHERE id < 5;`;

console.log("query");
db.query(query, (error, results, fields)=> {
    for (let i = 0; i < 4; i++) {
        console.log(results[i].id);
    }
});

app.get("/", function(req, res) {
    res.send("Hello world");
});

app.listen(PORT, function(data) {
    console.log("Listening on port " + PORT);
});