USE semilleroSAS;

DROP TABLE IF EXISTS tipo_linea;
DROP TABLE IF EXISTS tipo_marca;
DROP TABLE IF EXISTS vehiculos;


CREATE TABLE tipo_linea(
    id_linea INT(5) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `desc_linea` VARCHAR(255) NULL,
    id_marca INT(5) UNSIGNED,
    activo ENUM('S','N') NOT NULL
) ENGINE=INNODB;

CREATE TABLE tipo_marca(
    id_marca INT(5) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `desc_marca` VARCHAR(255) NULL,
    activo ENUM('S','N') NOT NULL
) ENGINE=INNODB;

CREATE TABLE vehiculos(
    nro_placa INT(5) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    id_linea INT(5) UNSIGNED,
    modelo INT(5) UNSIGNED,
    fecha_ven_seguro DATE NULL, -- Puede que el vehiculo no cuente con un seguro.
    fecha_ven_tecnomecanica DATE NULL, -- Puede que el vehiculo no cuente con una tecnomecanica.
    fecha_ven_contratodo DATE NULL -- Puede que el vehiculo no cuente con un contrato.
) ENGINE=INNODB;

CREATE TABLE modelo(
    id_modelo INT(5) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nom_modelo VARCHAR(255) NOT NULL
) ENGINE=INNODB;



-- Llaves foraneas

-- VEHICULOS - TIPO LINEA
ALTER TABLE vehiculos
ADD CONSTRAINT `fk_tipo_linea_vehiculos`
FOREIGN KEY (`id_linea`)
REFERENCES `tipo_linea` (`id_linea`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;
-- FIN VEHICULO - TIPO_LINEA

-- TIPO_MARCA - TIPO_LINEA
ALTER TABLE tipo_linea
ADD CONSTRAINT `fk_tipo_marca_tipo_linea`
FOREIGN KEY (`id_marca`)
REFERENCES `tipo_marca` (`id_marca`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;
-- FIN TIPO_MARCA - TIPO_LINEA

-- MODELO - VEHICULOS
ALTER TABLE vehiculos
ADD CONSTRAINT `fk_modelo_vehiculos`
FOREIGN KEY (`modelo`)
REFERENCES `modelo` (`id_modelo`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;
-- FIN MODELO - VEHICULOS