const { Router } =  require('express');
const { connection_mysql } = require('./../config/database');
const modelo = Router();

modelo.post('/actor', async (req, res) => {
    try {
        const {
            nom_modelo
        } = req.body
        const r = await connection_mysql.promise().execute(`INSERT INTO modelo(nom_modelo) VALUES (?)`, [nom_modelo])

        if (r.affectedRows > 0) {
            res.json({
                id_modelo: r.insertId,
                nom_modelo: nom_modelo
            })
        } else {
            res.json({})
        }
    } catch (e) {
        res.status(500).json({errorCode : e.errno, message: "Error en el servidor."})
    }
})

module.exports = vehiculos;