const format = require('pg-format')
const { pool } = require('../consultas.js')

const verificarSiUsuarioExiste = async (req, res, next) => {
    try {
        const { email } = req.body;
        const formattedQuery = format("SELECT * FROM usuarios WHERE email = %L", email);
        const { rowCount } = await pool.query(formattedQuery);
        if (rowCount > 0) {
            throw {
                message: "El correo con el que se intenta registrar ya esta en uso"
            }
        } else {
            next();
        }
    }catch(error){
        res.status(500).json(error);
    }
}

module.exports = { verificarSiUsuarioExiste };