const format = require('pg-format');
const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'softjobs',
    allowExitOnIdle: true
});

const agregarUsuario = async ({ email, password, rol, lenguage }) => {
    const formattedQuery = format(
        "INSERT INTO usuarios (email, password, rol, lenguage) VALUES (%L, %L, %L, %L)",
        email, password, rol, lenguage
    );
    await pool.query(formattedQuery);
};

module.exports = { agregarUsuario, pool };
