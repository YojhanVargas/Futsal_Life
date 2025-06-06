const jwt = require('jsonwebtoken');
require('dotenv').config();

const verificarToken = (req, res, next) => {
    const token =req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ mensaje: 'token no proporcionado'});
    }

    try {
        const tokenLimpio = token.startsWith('Bearer')? token.split(' ')[1] : token;

        const decoded = jwt.verify(tokenLimpio, process.env.JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ mensaje: 'Token inválido o expirado' });
    }
};

module.exports = verificarToken;