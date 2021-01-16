const { Router } = require("express");
const { connection_mysql } = require("./../config/database");
const tipo_marca = Router();

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

module.exports = tipo_marca;
