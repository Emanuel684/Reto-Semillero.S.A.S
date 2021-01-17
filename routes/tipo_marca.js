const { Router } = require("express");
const { connection_mysql } = require("./../config/database");
const tipo_marca = Router();

// Ver los registros que no tengan campos nulos y ademas que cambie la forma de verse el campo activo
tipo_marca.get("/all-tipo_marca-solicitud", (req, res) => {
  connection_mysql.query(
    `SELECT id_marca, desc_marca, IF(activo = 'S', 'ACTIVO', 'INACTIVO') AS "Estado:"
    FROM tipo_marca
    WHERE desc_marca IS NOT NULL AND id_marca IS NOT NULL AND activo IS NOT NULL;`,
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
// Fin ver los registros que no tengan campos nulos y ademas que cambie la forma de verse el campo activo

// Cantidad de registros y solicitud si cumple o no la cantidad
tipo_marca.get("/cantidad-solicitud", (req, res) => {
  connection_mysql.query(
    `SELECT COUNT(*) AS cantidad_registros,
    IF(COUNT(*) = 5, 'Cumple con la cantidad de registros.','No cumple con la cantidad de registros.') AS solicitud_registros FROM tipo_marca;`,
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

// UPDATE que permita modificar el estado de alguno de los registros
tipo_marca.patch('/update-activo-tipo_marca/:id_marca', async(req, res) => {
  try {
      if (Object.keys(req.body).length > 0) {
          const id_marca = req.params.id_marca
          let SQL = 'UPDATE tipo_marca SET '
          const params = []

          for (const elment in req.body) {
              SQL += `${elment} = ?, `
              params.push(req.body[elment])
          }
          SQL = SQL.slice(0, -2)
          SQL += ` WHERE id_marca = ?`
          params.push(id_marca)
          let [rows] = await connection_mysql.promise().execute(SQL, params)
          
          if (rows.affectedRows > 0) {
              [rows] = await connection_mysql.promise().query(`SELECT * FROM tipo_marca WHERE id_marca = ?`, [id_marca])
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

// Crear un nuevo registro en la tabla tipo_marca
tipo_marca.post("/new-tipo_marca", async (req, res) => {
  try {
    const { desc_marca, activo } = req.body;
    const r = await connection_mysql
      .promise()
      .execute(`INSERT INTO tipo_marca(desc_marca,activo) VALUES (?, ?)`, [
        desc_marca,
        activo,
      ]);

    if (r.affectedRows > 0) {
      res.json({
        id_marca: r.insertId,
        desc_marca: desc_marca,
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
// Fin creacion de registro en la tabla tipo_marca

// Eliminar registros de tipo_marca
tipo_marca.delete('/delete-tipo_marca/:id_marca',(req, res) =>{
  const {id_marca} = req.params;
  let query_delete = 'DELETE FROM tipo_marca WHERE id_marca=?';
  connection_mysql.query(query_delete, [id_marca], (err, rows, fields) =>{
      if(err){
          console.error(err);
      }else{
          res.json({message: "Se elimino un registro de tipo_marca."});
      }
  });
});
// Fin eliminar registros de tipo_marca

module.exports = tipo_marca;
