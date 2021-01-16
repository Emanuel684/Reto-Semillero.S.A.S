const { Router } = require("express");
const { connection_mysql } = require("./../config/database");
const tipo_marca = Router();

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
