const express = require('express');
const { reportarConsultas } = require('./src/middleware/reportarConsultas.js');
const verificarCredenciales = require('./src/middleware/verificarCredenciales.js');
const verifyToken = require('./src/middleware/verifyToken.js');
const { agregarUsuario, autenticacion, verificarSiUsuarioExiste, getUsuario } = require('./consultas');
const cors = require('cors');



const app = express();
app.use(express.json());
app.use(cors())
const PORT = 3000;
app.use(reportarConsultas)

app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));

/* Ruta para agregar usuarios a la base de datos, si el correo que se quiere utilizar ya esta registrado lanza un error */
app.post('/usuarios', async (req, res) => {
    try {
        const respuesta = await verificarSiUsuarioExiste(req.body);
        if (!respuesta) {
            await agregarUsuario(req.body);
            res.send("Usuario agregado con exito");
        }else{
            throw {message: "El correo con el que se intenta registrar ya esta en uso"}
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

/* ruta para iniciar sesion, utiliza middleware para verificar las credenciales antes de proveer de un token */
app.post('/login', verificarCredenciales, async (req, res) => {
    try {
        const token = await autenticacion(req.body);
        res.send({token: token});
    } catch (error) {
        res.send(error)
    }
});

app.get('/usuarios', verifyToken, async (req, res) => {
    try {
        const authorization = req.headers.authorization;
        const token = authorization.split(" ")[1];
        const usuario = await getUsuario(token);
        res.json(usuario);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})