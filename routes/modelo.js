const { Router } = require("express");
const { connection_mysql } = require("./../config/database");
const modelo = Router();

// Consulta que permita promediar todos los modelos
modelo.get("/prom-modelos", (req, res) => {
  connection_mysql.query(
    `SELECT SUM(nom_modelo) / COUNT(*) AS promedio_modelos FROM modelo;`,
    (error, resultset, fields) => {
      if (error) {
        return res
          .status(500)
          .send("Se presento un error en la base de datos.");
      } else {
        return res.json(resultset);
      }
    }
  );
});
// Fin consulta que permita promediar todos los modelos

// Consulta que permita sumar todos los modelos
modelo.get("/sum-modelos", (req, res) => {
  connection_mysql.query(
    `SELECT SUM(nom_modelo) FROM modelo;`,
    (error, resultset, fields) => {
      if (error) {
        return res
          .status(500)
          .send("Se presento un error en la base de datos.");
      } else {
        return res.json(resultset);
      }
    }
  );
});
// Fin consulta que permita sumar todos los modelos

// Consultar cual es el modelo maximo almacenado y el minimo almacenado
modelo.get("/modelo-maximo_minimo", (req, res) => {
  connection_mysql.query(
    `SELECT MAX(nom_modelo) AS maximo, MIN(nom_modelo) AS minimo FROM modelo;`,
    (error, resultset, fields) => {
      if (error) {
        return res
          .status(500)
          .send("Se presento un error en la base de datos.");
      } else {
        return res.json(resultset);
      }
    }
  );
});
// Fin consultar cual es el modelo maximo almacenado y el minimo almacenado

// Crear un nuevo registro en la tabla modelo
modelo.post("/new-modelo", async (req, res) => {
  try {
    const { nom_modelo } = req.body;
    const r = await connection_mysql
      .promise()
      .execute(`INSERT INTO modelo(nom_modelo) VALUES (?)`, [nom_modelo]);

    if (r.affectedRows > 0) {
      res.json({
        id_modelo: r.insertId,
        nom_modelo: nom_modelo,
      });
    } else {
      res.json({});
    }
  } catch (e) {
    res
      .status(500)
      .json({ errorCode: e.errno, message: "Error en el servidor." });
  }
});
// Fin creacion de registro en la tabla modelo

module.exports = modelo;
