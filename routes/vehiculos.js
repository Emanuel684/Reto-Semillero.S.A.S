const { Router } = require("express");
const { connection_mysql } = require("./../config/database");
const vehiculos = Router();

vehiculos.get("/all-vehiculos", (req, res) => {
    connection_mysql.query(`SELECT * FROM vehiculos`, (error, resultset, fields) => {
      if (error) {
        return res.status(500).send("Se presento un error en la base de datos.");
      } else {
        return res.json(resultset);
      }
    });
  });

vehiculos.post("/new-vehiculo", async (req, res) => {
  try {
    const {
      nro_placa,
      id_linea,
      modelo,
      fecha_ven_seguro,
      fecha_ven_tecnomecanica,
      fecha_ven_contratodo,
    } = req.body;
    const r = await connection_mysql
      .promise()
      .execute(
        `INSERT INTO vehiculos(nro_placa,id_linea,modelo,fecha_ven_seguro,fecha_ven_tecnomecanica,fecha_ven_contratodo) VALUES (?,?,?,?,?,?)`,
        [
          nro_placa,
          id_linea,
          modelo,
          fecha_ven_seguro,
          fecha_ven_tecnomecanica,
          fecha_ven_contratodo,
        ]
      );

    if (r.affectedRows > 0) {
      res.json({
        nro_placa: nro_placa,
        id_linea: id_linea,
        modelo: modelo,
        fecha_ven_seguro: fecha_ven_seguro,
        fecha_ven_tecnomecanica: fecha_ven_tecnomecanica,
        fecha_ven_contratodo: fecha_ven_tecnomecanica,
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

module.exports = vehiculos;
