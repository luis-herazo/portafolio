const jwt = require("jsonwebtoken");
const verificarToken = (req, res, next) =>{
    const authHeader = req.header("Authorization");
    if (!authHeader) return res.status(400).json({
        error : "Acceso denegado"
    });
    const token = authHeader.split(" ")[1] || authHeader;
    try {
        const verificado = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verificado;
        next();
    } catch (error) {
        res.status(400).json({
            error : "Token invalido o expirado"
        });
    }
}
module.exports = verificarToken;