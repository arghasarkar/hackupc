"use strict";

const PORT = 4000;

let express = require("express");
let mysql = require("mysql");
let model = require("node-model.js");
let cors = require("cors");

let app = express();

app.use(cors());

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

const query = `select * from accidents_full WHERE ;`;

console.log("query");

function fetchFromDb(expression, res) {
    const query = `select * from accidents_full WHERE ${expression};`;
    db.query(query, (error, results, fields)=> {
        //console.log(results);
        res.send(results);
    });
}


app.get("/", function(req, res) {
    //console.log(req.query);
    let str = "";

    for (let param in req.query) {
        str += param + "=" + `'${req.query[param]}'`;
        console.log(req.query[param]);
    }


    console.log(fetchFromDb(str, res));
    //res.send("Hello world");
});

app.listen(PORT, function(data) {
    console.log("Listening on port " + PORT);
});