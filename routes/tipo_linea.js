const { Router } = require("express");
const { connection_mysql } = require("./../config/database");
const tipo_linea = Router();

// Ver registros que no tengan campos null y ademas cambiando el formato de el campo activo
tipo_linea.get("/all-tipo_linea-solicitud", (req, res) => {
  connection_mysql.query(
    `SELECT tipo_linea.id_linea, tipo_linea.desc_linea, tipo_marca.desc_marca, IF(tipo_linea.activo = 'S', 'ACTIVO', 'INACTIVO') AS "Estado:"
    FROM tipo_linea
    INNER JOIN tipo_marca
    ON tipo_linea.id_marca = tipo_marca.id_marca AND tipo_linea.desc_linea IS NOT NULL AND tipo_linea.id_marca IS NOT NULL AND tipo_linea.id_linea IS NOT NULL AND tipo_linea.activo IS NOT NULL;`,
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
// Fin ver registros que no tengan campos null y ademas cambiando el formato de el campo activo

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

// UPDATE que permita modificar el estado de alguno de los registros
tipo_linea.patch('/update-activo-tipo_linea/:id_linea', async(req, res) => {
  try {
      if (Object.keys(req.body).length > 0) {
          const id_linea = req.params.id_linea
          let SQL = 'UPDATE tipo_linea SET '
          const params = []

          for (const elment in req.body) {
              SQL += `${elment} = ?, `
              params.push(req.body[elment])
          }
          SQL = SQL.slice(0, -2)
          SQL += ` WHERE id_linea = ?`
          params.push(id_linea)
         // console.log(SQL, params)
          let [rows] = await connection_mysql.promise().execute(SQL, params)
          
          if (rows.affectedRows > 0) {
              [rows] = await connection_mysql.promise().query(`SELECT * FROM tipo_linea WHERE id_linea = ?`, [id_linea])
              res.json(rows[0])
          }else{
              res.json({})
          }
      } else {
          res.status(401).json({ message: 'No existe campos a modificar' })
      }
  } catch (e) {
      console.log(e)
      res.status(500).json({ errorCode: e.errno, message: "Error en el servidor" })
  }
})
// Fin UPDATE que permita modificar el estado de alguno de los registros

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
