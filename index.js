const express = require('express');
const { reportarConsultas } = require('./middleware/reportarConsultas')
const verificarCredenciales = require('./middleware/verificarCredenciales.js')
const { agregarUsuario, autenticacion, verificarSiUsuarioExiste } = require('./consultas');
const cors = require('cors');
const verifyToken = require('./middleware/verifyToken.js');


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
        res.send("se inicio sesion")

    } catch (error) {
        console.log(error);
        res.send(error)
    }
});

app.get('/usuarios', verifyToken, async (req, res) => {
    try {
        console.log(req);
        res.send("h")

    } catch (error) {
        console.log(error);
        res.send("ss")
    }
})