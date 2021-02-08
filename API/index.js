const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const PUERTO = 3001;
const fs = require("fs");

/************** */

var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

/************ */

var db;
var db_name;

//recursos
app.use(express.static(__dirname + "/"));

db_name = path.join(__dirname, "db", "DAM.db");
db = new sqlite3.Database(db_name, (err) => {
    if (err) {
        return console.error("Error---->" + err.message);
    } else {
        console.log("conexion exitosa con la BD!");
    }
});

var queryLiteElectrovalvulas =
    "\
CREATE TABLE IF NOT EXISTS Electrovalvulas( \
        electrovalvulaId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, \
        nombre TEXT \
      ); ";

var queryLiteDispositivo =
    " \
CREATE TABLE IF NOT EXISTS Dispositivos( \
    dispositivoId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, \
    nombre TEXT, \
    ubicacion TEXT, \
    electrovalvulaId INTEGER NOT NULL, \
    FOREIGN KEY(electrovalvulaId) REFERENCES Electrovalvulas(electrovalvulaId) \
    );";

var queryLiteLogsRiesgos =
    "\
CREATE TABLE IF NOT EXISTS Log_Riegos (\
    logRiegoId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,\
    apertura TEXT,\
    fecha TEXT,\
    electrovalvulaId INTEGER NOT NULL, \
    FOREIGN KEY(electrovalvulaId) REFERENCES Electrovalvulas(electrovalvulaId) \
  );";
var queryLiteMediciones =
    "\
  CREATE TABLE IF NOT EXISTS Mediciones ( \
    medicionId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, \
    fecha TEXT, \
    valor TEXT, \
    dispositivoId INTEGER NOT NULL, \
    FOREIGN KEY(dispositivoId) REFERENCES Electrovalvulas(dispositivoId) \
  );";

db.run(queryLiteElectrovalvulas);
db.run(queryLiteDispositivo);
db.run(queryLiteLogsRiesgos);
db.run(queryLiteMediciones);

var queryInsertarElectrovalvulas =
    "\
INSERT INTO Electrovalvulas (nombre) VALUES \
    ('eLPatio'), \
    ('eLCocina'), \
    ('eLJardinDelantero'), \
    ('eLLiving'), \
    ('eLHabitacion1'), \
    ('eLHabitacion2');";

var queryInsertarDispositivo =
    "\
INSERT INTO Dispositivos (nombre, ubicacion, electrovalvulaId) VALUES \
    ('Sensor Hum. Exterior', 'Patio', 1), \
    ('Sensor Hum. Interior', 'Cocina', 2), \
    ('Sensor Hum. Exterior', 'Jardin Delantero', 3), \
    ('Sensor Hum. Interior', 'Living', 4), \
    ('Sensor Hum. Interior', 'Habitacion 1', 5), \
    ('Sensor Hum. Exterior', 'Habitacion 2', 6);";

var queryInsertarMediciones =
    "\
INSERT INTO Mediciones(fecha, valor, dispositivoId) VALUES \
    ('2020-11-26 21:19:41', '60', 1), \
    ('2020-11-26 21:19:41', '40', 1), \
    ('2020-11-26 21:19:41', '30', 2), \
    ('2020-11-26 21:19:41', '50', 3), \
    ('2020-11-26 21:19:41', '33', 5), \
    ('2020-11-26 21:19:41', '17', 4), \
    ('2020-11-26 21:19:41', '29', 6), \
    ('2020-11-26 21:19:41', '20', 1), \
    ('2020-11-26 21:19:41', '44', 4), \
    ('2020-11-26 21:19:41', '61', 5), \
    ('2020-11-26 21:19:41', '12', 2); ";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, ""));
app.use(express.urlencoded({ extended: false }));
app.listen(PUERTO);
console.log("servidor corriendo...");

//enrutamiento
app.get("/", cors(corsOptions), (req, res) => {
    // console.log("pasa aquiii");
    res.render("index.html");
});

//=======[ Main module code ]==================================================

app.get("/dispositivos/", cors(corsOptions), function(req, res) {
    let SQL = "SELECT *FROM Dispositivos";
    db.all(SQL, [], function(err, respuesta) {
        if (err) {
            res.send(err).status(400);
            return;
        }

        return res.send(respuesta);
    });
});
/************************************************************ */

app.get("/listaLogs/:id", cors(corsOptions), function(req, res) {
    let SQL = "SELECT *FROM Log_Riegos WHERE electrovalvulaId=?";
    db.all(SQL, [req.params.id], function(err, respuesta) {
        if (err) {
            res.send(err).status(400);
            return;
        }

        return res.send(respuesta);
    });
});
/******************************************************* */
app.get(
    "/addMediciones/:fecha/:valor/:dispositivoId",
    cors(corsOptions),
    function(req, res) {
        const nueva_medida = [
            req.params.fecha,
            req.params.valor,
            req.params.dispositivoId,
        ];
        db.run(
            "INSERT INTO Mediciones(fecha, valor, dispositivoId) VALUES(?,?,?)",
            nueva_medida,
            function(err) {
                if (err) {
                    return console.log(err.message);
                }
                console.log("se agrego!");
                res.json("{registro medi. correcto:ok}"); // ionic espera un json
            }
        );
    }
);
/************************************************************ */
app.get("/listaLogsCompleta/", cors(corsOptions), function(req, res) {
    let SQL = "SELECT *FROM Log_Riegos";
    db.all(SQL, [], function(err, respuesta) {
        if (err) {
            res.send(err).status(400);
            return;
        }

        return res.send(respuesta);
    });
});

/******************************************************************************* */
app.get("/inicializar/", function(req, res) {
    db.run(queryInsertarElectrovalvulas);
    db.run(queryInsertarDispositivo);
    db.run(queryInsertarMediciones);

    res.send("BD inicializado...");
});

/*********************************************************************************** */
app.get(
    "/addDispositivo/:nombre/:ubicacion/:electrovalvulaId",
    cors(corsOptions),
    function(req, res) {
        const nuevo_log = [
            req.params.nombre,
            req.params.ubicacion,
            req.params.electrovalvulaId,
        ];
        db.run(
            "INSERT INTO Dispositivo(nombre, ubicacion, electrovalvulaId) VALUES(?,?,?)",
            nuevo_log,
            function(err) {
                if (err) {
                    return console.log(err.message);
                }
                console.log("New has been added");
                res.json("{registro correcto:ok}");
            }
        );
    }
);
/******************************************************************************************* */
app.get(
    "/addLogDispositivo/:estado/:fecha/:electrovalvulaId",
    cors(corsOptions),
    function(req, res) {
        const nuevo_log = [
            req.params.estado,
            req.params.fecha,
            req.params.electrovalvulaId,
        ];
        db.run(
            "INSERT INTO Log_Riegos(apertura, fecha, electrovalvulaId) VALUES(?,?,?)",
            nuevo_log,
            function(err) {
                if (err) {
                    return console.log(err.message);
                }
                console.log("se agrego!");
                res.json("{registro correcto:ok}"); // ionic espera un json
            }
        );
    }
);

/********************************************************************************** */

app.get("/mediciones/:id", cors(corsOptions), function(req, res) {
    var SQL = "SELECT *FROM Mediciones WHERE dispositivoId =?";

    db.all(SQL, [req.params.id], function(err, respuesta) {
        if (err) {
            res.send(err).status(400);
            return;
        }

        return res.send(respuesta);
    });
});

/************************************************************************************** */

app.get("/dispositivosCompletos/", cors(corsOptions), function(req, res) {
    var SQL =
        " SELECT Mediciones.dispositivoId, Mediciones.fecha, Mediciones.valor,Dispositivos.dispositivoId, Dispositivos.nombre,Dispositivos.ubicacion \
    from Dispositivos INNER JOIN Mediciones ON Mediciones.dispositivoId=Dispositivos.dispositivoId ";

    db.all(SQL, [], function(err, respuesta) {
        if (err) {
            res.send(err).status(400);
            return;
        }

        return res.send(respuesta);
    });
});

/********************************************************************************************* */
app.get(
    "/valorMasActualDispositivo/:id",
    cors(corsOptions),
    function(req, res) {
        var SQL = "SELECT *FROM Mediciones WHERE dispositivoId =? ";

        db.all(SQL, [req.params.id], function(err, respuesta) {
            if (err) {
                res.send(err).status(400);
                return;
            }

            return res.send(respuesta);
        });
    }
);