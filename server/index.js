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

const query = `select * from accidents_full ;`;

console.log("query");

function fetchFromDb(expression, res) {
    const query = `select * from accidents_full  ${expression};`;
    console.log("FInal query: ", query);
    db.query(query, (error, results, fields)=> {
        //console.log(results);
        res.send(results);
    });
}


app.get("/", function(req, res) {
    //console.log(req.query);
    let str = "";
    str = fieldsObjectToSQLString(req.query);
    console.log(fetchFromDb(str, res));
});

function fieldsObjectToSQLString(fieldsArr) {

    let str = " WHERE ";
    let size = Object.keys(fieldsArr).length;
    let keys = Object.keys(fieldsArr);

    if (size == 0) {
        str = "";
    } else if (size == 1) {

        if (keys[0].toLowerCase() == "limit") {
            str = " LIMIT " + fieldsArr[keys[0]];
        } else {
            str += keys[0] + "='" + fieldsArr[keys[0]] + "' ";
        }

    } else {
        str += keys[0] + "='" + fieldsArr[keys[0]] + "' ";

        for (let i = 1; i < size; i++) {
            if (keys[i].toLowerCase() == "limit") {
                str += " LIMIT " + fieldsArr[keys[i]];
            } else {
                str += " AND " + keys[i] + "='" + fieldsArr[keys[i]] + "' ";
            }
        }
    }

    console.log("String ", str);
    return str;

}

app.listen(PORT, function(data) {
    console.log("Listening on port " + PORT);
});