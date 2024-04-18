const bcrypt = require('bcrypt');
const pool = require('../src/controler.js');
const format = require('pg-format');

const verificarCredenciales = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const formattedQuery = format("SELECT * FROM usuarios WHERE email = %L", email);
        const { rows, rowCount } = await pool.query(formattedQuery);
        if(!rowCount){
            throw {error: "El correo que intentas utilizar no esta registrado"}
        }
        const comparacionPassword = await bcrypt.compare(password, rows[0].password);
        if(!comparacionPassword){
            throw {error: "Contraseña incorrecta"}
        }
        next();
    }catch(error){
        res.status(500).send(error);
    }
}

module.exports = verificarCredenciales;