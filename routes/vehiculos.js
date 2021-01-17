const { Router } = require("express");
const { connection_mysql } = require("./../config/database");
const vehiculos = Router();

// Ver todos los vehiculos registrados
vehiculos.get("/all-vehiculos", (req, res) => {
  connection_mysql.query(
    `SELECT * FROM vehiculos`,
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
// Fin ver vehinculos registrados

// Cantidad de registros y solicitud si cumple o no la cantidad
vehiculos.get("/cantidad-solicitud", (req, res) => {
  connection_mysql.query(
    `SELECT COUNT(*) AS cantidad_registros,
    IF(COUNT(*) = 30, 'Cumple con la cantidad de registros.','No cumple con la cantidad de registros.') AS solicitud_registros FROM vehiculos;`,
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

// Consulta única que tenga las siguientes columnas:NRO_PLACA, MODELO, DESC_LINEA, DESC_MARCA; traertodos los registros que coincidan en todas las tablas y que se encuentren en estado S. 
vehiculos.get('/consulta_nro-placa_modelo_desc-linea_desc-marca', (req,res)=>{
  connection_mysql.query(``, (err, rows, fields)=>{
      if(!err){
          res.json(rows);
      }else{
          console.log(err);
      }
  });
});
// Fin consulta única que tenga las siguientes columnas:NRO_PLACA, MODELO, DESC_LINEA, DESC_MARCA; traertodos los registros que coincidan en todas las tablas y que se encuentren en estado S. 

// PRESENTA PROBLEMAS
// Consulta única que tenga las siguientes columnas:NRO_PLACA, MODELO, DESC_LINEA, DESC_MARCA, traertodos los registros que coincidan en todas las tablas.
vehiculos.get('/consulta_nro-placa_modelo_desc-linea_desc-marca', (req,res)=>{
  connection_mysql.query(`SELECT vehiculos.nro_placa, modelo.nom_modelo, tipo_linea.desc_linea, tipo_marca.desc_marca
  FROM vehiculos 
  INNER JOIN modelo 
  ON vehiculos.modelo = modelo.id_modelo
  INNER JOIN tipo_linea
  ON vehiculos.id_linea = tipo_linea.id_linea
  INNER JOIN tipo_marca
  ON tipo_linea.id_marca = tipo_marca.id_marca;`, (err, rows, fields)=>{
      if(!err){
          res.json(rows);
      }else{
          console.log(err);
      }
  });
});
// Fin Consulta única que tenga las siguientes columnas:NRO_PLACA, MODELO, DESC_LINEA, DESC_MARCA, traertodos los registros que coincidan en todas las tablas.

// Consulta por un rango de modelo
vehiculos.get('/consulta_rango_modelo', (req,res)=>{
  const modelo_minimo = req.body.modelo_minimo;
  const modelo_maximo = req.body.modelo_maximo;
  console.log(modelo_minimo);
  console.log(modelo_maximo);
  connection_mysql.query(`SELECT vehiculos.nro_placa, vehiculos.id_linea, vehiculos.modelo, vehiculos.fecha_ven_seguro,vehiculos.fecha_ven_tecnomecanica, vehiculos.fecha_ven_contratodo, modelo.nom_modelo
  FROM vehiculos 
  INNER JOIN modelo 
  ON vehiculos.modelo = modelo.id_modelo
  WHERE modelo.nom_modelo BETWEEN '${modelo_minimo}' AND '${modelo_maximo}';`, (err, rows, fields)=>{
      if(!err){
          res.json(rows);
      }else{
          console.log(err);
      }
  });
});
// Fin consulta por un rango de modelo

// Consulta por un rango de fechas
vehiculos.get('/consulta_rango_fecha', (req,res)=>{
  const fecha_minima = req.body.fecha_minima;
  const fecha_maxima = req.body.fecha_maxima;
  console.log(fecha_minima);
  console.log(fecha_maxima);
  connection_mysql.query(`SELECT * FROM vehiculos WHERE fecha_ven_seguro Between '${fecha_minima}' And '${fecha_maxima}';`, (err, rows, fields)=>{
      if(!err){
          res.json(rows);
      }else{
          console.log(err);
      }
  });
});
// Fin consulta por un rango de fechas

// Crear un nuevo vehiculo
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
// Fin creacion de nuevo vehiculo

module.exports = vehiculos;