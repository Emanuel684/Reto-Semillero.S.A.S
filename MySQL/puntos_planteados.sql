/*
En la tabla TIPO_MARCA deberá insertar 5 registros (Crear un
servicio en Express que permita insertar cada registro).
*/
INSERT INTO tipo_marca(desc_marca,activo) VALUES (?, ?);


/*
En la tabla TIPO_LINEA deberá insertar 20 registros, la línea es
única, pero puede repetir marca (Crear un servicio en Express
que permita insertar cada registro).
*/
INSERT INTO tipo_linea(desc_linea,id_marca,activo) VALUES (?, ?, ?);


/*
En la tabla VEHICULOS deberá insertar 30 registros (Crear un
servicio en Express que permita insertar cada registro).
*/
INSERT INTO vehiculos(nro_placa,id_linea,modelo,fecha_ven_seguro,fecha_ven_tecnomecanica,fecha_ven_contratodo) VALUES (?,?,?,?,?,?);


/*
Se debe generar 3 querys que comprueben que las cantidades
solicitadas en las 3 tablas sean las correctas (Crear un servicio
en Express por cada tabla, que entregue la cantidad de
registros por tabla e indique si cumple con la cantidad de
registros solicitado).
*/
-- tipo_linea
SELECT COUNT(*) AS cantidad_registros, IF(COUNT(*) = 20, 'Cumple con la cantidad de registros.','No cumple con la cantidad de registros.') AS solicitud_registros FROM tipo_linea;

-- tipo_marca
SELECT COUNT(*) AS cantidad_registros,
    IF(COUNT(*) = 5, 'Cumple con la cantidad de registros.','No cumple con la cantidad de registros.') AS solicitud_registros FROM tipo_marca;

-- vehiculos
SELECT COUNT(*) AS cantidad_registros,
    IF(COUNT(*) = 30, 'Cumple con la cantidad de registros.','No cumple con la cantidad de registros.') AS solicitud_registros FROM vehiculos;


/*
Se debe generar una consulta que indique cual es el modelo
máximo almacenado y el mínimo. (Crear un servicio en
Express que devuelva dicha información).
*/
SELECT MAX(nom_modelo) AS maximo, MIN(nom_modelo) AS minimo FROM modelo;


/*
Se debe generar una consulta que contenga DESC_MARCA,
DESC_LINEA y cantidad, para saber cuántas líneas repetidas
por marca están almacenadas. (Crear un servicio en Express
que devuelva dicha información).
*/
SELECT tipo_marca.desc_marca, tipo_linea.desc_linea, COUNT(*) AS cantidad 
    FROM tipo_marca 
    INNER JOIN tipo_linea 
    ON tipo_marca.id_marca = tipo_linea.id_marca 
    GROUP BY tipo_marca.desc_marca, tipo_linea.desc_linea;


/*
Crear una consulta de vehículos que me permita consultar
todos los vehículos por un rango de fechas sobre el campo
FECHA_VEN_SEGURO. (Crear un servicio en Express que
devuelva dicha información y reciba el rango de fecha por
query o params).
*/
SELECT * FROM vehiculos WHERE fecha_ven_seguro Between '${fecha_minima}' And '${fecha_maxima}';


/*
Crear una consulta de vehículos que me permita consultar
todos los vehículos por un rango de modelos por el campo
modelo. (Crear un servicio en Express que devuelva dicha
información).
*/
SELECT vehiculos.nro_placa, vehiculos.id_linea, vehiculos.modelo, vehiculos.fecha_ven_seguro,vehiculos.fecha_ven_tecnomecanica, vehiculos.fecha_ven_contratodo, modelo.nom_modelo
  FROM vehiculos 
  INNER JOIN modelo 
  ON vehiculos.modelo = modelo.id_modelo
  WHERE modelo.nom_modelo BETWEEN '${modelo_minimo}' AND '${modelo_maximo}';


/*
Crear un UPDATE que permita modificar el estado de alguno
de los registros. (Crear un servicio en Express que recibe el
id y el estado y realice la modificación sobre el registro).
*/
-- tipo_marca
UPDATE tipo_marca SET campo a enviar WHERE id_marca = ?;

-- tipo_linea
UPDATE tipo_linea SET campo a enviar WHERE id_linea = ?;


/*
Crear un SQL para insertar un registro adicional en
TIPO_MARCA. (Crear un servicio en Express).
*/
INSERT INTO tipo_marca(desc_marca,activo) VALUES (?, ?)


/*
Crear un SQL para eliminar un registro en TIPO_MARCA. (Crear
un servicio en Express).
*/
DELETE FROM tipo_marca WHERE id_marca=?;


/*
Crear una consulta única que tenga las siguientes columnas:
NRO_PLACA, MODELO, DESC_LINEA, DESC_MARCA, traer
todos los registros que coincidan en todas las tablas. (Crear un
servicio en Express).
*/
SELECT vehiculos.nro_placa, modelo.nom_modelo, tipo_linea.desc_linea, tipo_marca.desc_marca
  FROM vehiculos 
  INNER JOIN modelo 
  ON vehiculos.modelo = modelo.id_modelo
  INNER JOIN tipo_linea
  ON vehiculos.id_linea = tipo_linea.id_linea
  INNER JOIN tipo_marca
  ON tipo_linea.id_marca = tipo_marca.id_marca;


/*
Crear una consulta única que tenga las siguientes columnas:
NRO_PLACA, MODELO, DESC_LINEA, DESC_MARCA; traer
todos los registros que coincidan en todas las tablas y que se
encuentren en estado S. (Crear un servicio en Express).
*/
SELECT vehiculos.nro_placa, modelo.nom_modelo, tipo_linea.desc_linea, tipo_marca.desc_marca
  FROM vehiculos
  INNER JOIN modelo 
  ON vehiculos.modelo = modelo.id_modelo
  INNER JOIN tipo_linea
  ON vehiculos.id_linea = tipo_linea.id_linea AND tipo_linea.activo = 'S'
  INNER JOIN tipo_marca
  ON tipo_linea.id_marca = tipo_marca.id_marca AND tipo_marca.activo = 'S';


/*
Se debe realizar una consulta que permita sumar todos los
modelos. (Crear un servicio en Express).
*/
SELECT SUM(nom_modelo) FROM modelo;


/*
Se debe realizar una consulta que permita promediar todos los
modelos. (Crear un servicio en Express).
*/
SELECT SUM(nom_modelo) / COUNT(*) AS promedio_modelos FROM modelo;


/*
Se debe realizar una única consulta que permita saber cuántos
registros están activos e inactivos de la tabla TIPO_LINEA.
(Crear un servicio en Express).
*/
SELECT SUM(activo = 'S') AS activos, sum(activo = 'N') AS inactivos FROM tipo_linea;


/*
Cree una consulta que una las tablas VEHICULOS, TIPO_LINEA
y TIPO_MARCA mediante INNER JOIN y LEFT JOIN, en esta
consulta se deben proyectar los campos NRO_PLACA,
MODELO, DESC_LINEA y DESC_MARCA. (Crear dos servicios
en Express).
*/
-- INNER JOIN
SELECT vehiculos.nro_placa, modelo.nom_modelo, tipo_linea.desc_linea, tipo_marca.desc_marca
      FROM vehiculos
      INNER JOIN modelo 
      ON vehiculos.modelo = modelo.id_modelo
      INNER JOIN tipo_linea
      ON vehiculos.id_linea = tipo_linea.id_linea
      INNER JOIN tipo_marca
      ON tipo_linea.id_marca = tipo_marca.id_marca;

-- LEFT JOIN
SELECT vehiculos.nro_placa, modelo.nom_modelo, tipo_linea.desc_linea, tipo_marca.desc_marca
      FROM vehiculos
      LEFT JOIN modelo 
      ON vehiculos.modelo = modelo.id_modelo
      LEFT JOIN tipo_linea
      ON vehiculos.id_linea = tipo_linea.id_linea
      LEFT JOIN tipo_marca
      ON tipo_linea.id_marca = tipo_marca.id_marca;


/*
Se debe implementar una única consulta y un servicio en Express
(un servicio en Express por cada tabla) que permita conocer
todos los campos de la tabla VEHICULOS, TIPO_LINEA,
TIPO_MARCA con las siguientes características:

No puede traer registros que tengan campos nulos
El campo modelo debe salir de la siguiente manera
#ModeloVehiculo: Modelo Las fechas deben salir con formato
dd/mm/yyyy hh:mi:ss
Los campos S y N debe salir con el texto ACTIVO o INACTIVO
*/
-- VEHICULOS
SELECT vehiculos.nro_placa,vehiculos.id_linea, modelo.nom_modelo AS "#ModeloVehiculo:",DATE_FORMAT(vehiculos.fecha_ven_seguro, "%d/%m/%Y-%h:%i:%s") AS "fecha_ven_seguro", DATE_FORMAT(vehiculos.fecha_ven_tecnomecanica,"%d/%m/%Y-%h:%i:%s") AS "fecha_ven_tecnomecanica", DATE_FORMAT(vehiculos.fecha_ven_contratodo, "%d/%m/%Y-%h:%i:%s") AS "fecha_ven_contratodo" 
    FROM vehiculos 
    INNER JOIN modelo 
    ON vehiculos.modelo = modelo.id_modelo AND vehiculos.nro_placa IS NOT NULL AND vehiculos.id_linea IS NOT NULL AND vehiculos.modelo IS NOT NULL AND vehiculos.fecha_ven_seguro IS NOT NULL AND vehiculos.fecha_ven_tecnomecanica IS NOT NULL AND vehiculos.fecha_ven_contratodo IS NOT NULL;

-- TIPO_MARCA
SELECT id_marca, desc_marca, IF(activo = 'S', 'ACTIVO', 'INACTIVO') AS "Estado:"
    FROM tipo_marca
    WHERE desc_marca IS NOT NULL AND id_marca IS NOT NULL AND activo IS NOT NULL;

-- TIPO_LINEA
SELECT tipo_linea.id_linea, tipo_linea.desc_linea, tipo_marca.desc_marca, IF(tipo_linea.activo = 'S', 'ACTIVO', 'INACTIVO') AS "Estado:"
    FROM tipo_linea
    INNER JOIN tipo_marca
    ON tipo_linea.id_marca = tipo_marca.id_marca AND tipo_linea.desc_linea IS NOT NULL AND tipo_linea.id_marca IS NOT NULL AND tipo_linea.id_linea IS NOT NULL AND tipo_linea.activo IS NOT NULL;