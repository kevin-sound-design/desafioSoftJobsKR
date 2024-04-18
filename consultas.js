const format = require('pg-format');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./src/controler.js')

const agregarUsuario = async ({ email, password, rol, lenguage }) => {
    const passwordHash = await bcrypt.hash(password, 10);
    const formattedQuery = format(
        "INSERT INTO usuarios (email, password, rol, lenguage) VALUES (%L, %L, %L, %L)",
        email, passwordHash, rol, lenguage
    );
    await pool.query(formattedQuery);
};

const autenticacion = async ({ email, password }) => {
    const token = jwt.sign({email: email}, "secreto", {expiresIn: "2h"});
    return {email, token};
}

/* funcion que al momento de registrar un usuario revisa la base de datos para verificar que el correo no se encuentre en uso */
const verificarSiUsuarioExiste = async (reqBody) => {
    try {
        const { email } = reqBody;
        const formattedQuery = format("SELECT * FROM usuarios WHERE email = %L", email);
        const { rowCount } = await pool.query(formattedQuery);
        if (rowCount) {
            return true;
        } else {
            return false;
        }
    }catch(error){
        res.status(500).json(error);
    }
}




module.exports = { agregarUsuario, pool, autenticacion, verificarSiUsuarioExiste };
