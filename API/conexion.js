const htt = require('http');
const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const PUERTO = 5000;

const db_name = path.join(__dirname, "db", "DAM .db");
const db = new sqlite3.Database(db_name, err => {
    if (err) {
        return console.error(err.message);
    } else {
        console.log("conexion exitosa con la BD!");
    }
})

module.exports = db;