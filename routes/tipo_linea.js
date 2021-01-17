const { Router } = require("express");
const { connection_mysql } = require("./../config/database");
const tipo_linea = Router();

// Cantidad de registros activos y inactivos de la tabla tipo_linea
tipo_linea.get("/cantidad_activos-cantidad_inactivos", (req, res) => {
  connection_mysql.query(
    `SELECT SUM(activo = 'S') AS activos, sum(activo = 'N') AS inactivos FROM tipo_linea;`,
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
// Fin cantidad de registros activos y inactivos de la tabla tipo_linea

// Cantidad de registros y solicitud si cumple o no la cantidad
tipo_linea.get("/cantidad-solicitud", (req, res) => {
  connection_mysql.query(
    `SELECT COUNT(*) AS cantidad_registros, IF(COUNT(*) = 20, 'Cumple con la cantidad de registros.','No cumple con la cantidad de registros.') AS solicitud_registros FROM tipo_linea;`,
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
// Fin cantidad de registros y solicitud si cumple o no la cantidad

// Crear un nuevo registro en la table de tipo_linea
tipo_linea.post("/new-tipo_linea", async (req, res) => {
  try {
    const { desc_linea, id_marca, activo } = req.body;
    const r = await connection_mysql
      .promise()
      .execute(
        `INSERT INTO tipo_linea(desc_linea,id_marca,activo) VALUES (?, ?, ?)`,
        [desc_linea, id_marca, activo]
      );

    if (r.affectedRows > 0) {
      res.json({
        id_linea: r.insertId,
        desc_linea: desc_linea,
        id_marca: id_marca,
        activo: activo,
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
// Fin crear un nuevo registro en la table de tipo_linea

// Consulta que contenga DESC_MARCA,DESC_LINEA y cantidad, para saber cuántas líneas repetidas por marca están almacenadas.
tipo_linea.get("/desc_marca-desc_linea-cantidad", (req, res) => {
  connection_mysql.query(
    `SELECT tipo_marca.desc_marca, tipo_linea.desc_linea, COUNT(*) AS cantidad 
    FROM tipo_marca 
    INNER JOIN tipo_linea 
    ON tipo_marca.id_marca = tipo_linea.id_marca 
    GROUP BY tipo_marca.desc_marca, tipo_linea.desc_linea;`,
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
// Fin consulta que contenga DESC_MARCA,DESC_LINEA y cantidad, para saber cuántas líneas repetidaspor marca están almacenadas.

module.exports = tipo_linea;
