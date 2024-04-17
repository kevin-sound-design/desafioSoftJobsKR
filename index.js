const express = require('express');
const { verificarSiUsuarioExiste } = require('./middleware/verificarSiUsuarioExiste');
const { agregarUsuario } = require('./consultas');
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors())
const PORT = 3000;

app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));

app.post('/usuarios', verificarSiUsuarioExiste, async (req, res) => {
    try {
        await agregarUsuario(req.body);
        res.send("Usuario agregado con exito");
    }catch(error){
        res.status(500).send(error);
    }
})