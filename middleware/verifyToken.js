const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) =>{
    const token = req.headers.authorization

    if(!token){
        return res.status(500).send("no hay token");
    }
    try{
        const tokenDesencoded = jwt.verify(token, "secreto")
        console.log(tokenDesencoded);
        req.userEmail = tokenDesencoded.email;
        next()
    }catch(error){
        res.status(500).send("error del catch")
    }
}

module.exports = verifyToken;