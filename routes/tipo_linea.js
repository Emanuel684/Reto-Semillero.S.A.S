const { Router } =  require('express');
const { connection_mysql } = require('./../config/database');
const tipo_linea = Router();


tipo_linea.post('/new-tipo_linea', async (req, res) => {
    try {
        const {
            desc_linea,
            id_marca,
            activo
        } = req.body
        const r = await connection_mysql.promise().execute(`INSERT INTO tipo_linea(desc_linea,id_marca,activo) VALUES (?, ?, ?)`, [desc_linea,id_marca,activo])

        if (r.affectedRows > 0) {
            res.json({
                id_linea: r.insertId,
                desc_linea: desc_linea,
                id_marca: id_marca,
                activo: activo
            })
        } else {
            res.json({})
        }
    } catch (e) {
        res.status(500).json({errorCode : e.errno, message: "Error en el servidor."})
    }
})

module.exports = tipo_linea;