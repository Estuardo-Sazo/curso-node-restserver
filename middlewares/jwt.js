const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const User = require('../models/user');


const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            message: 'Token no econtrado'
        });
    }

    try {
        const {uuid} = jwt.verify(token, process.env.SECRET_KEY);
        const userVerificado= await User.findById({_id:uuid});

        if(!userVerificado){
            return res.status(401).json({
                message: 'Token no autorizado - user no exist'
            });
        }
        if(!userVerificado.status){
            return res.status(401).json({
                message: 'Token no autorizado - user desabled'
            });
        }
        req.userVerificado= userVerificado;
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: 'Token no autorizado'
        });
    }
}

module.exports = {
    validarJWT
}