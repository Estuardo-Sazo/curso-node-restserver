const { response, request } = require("express")


const isAdminRoel= ( req= request,res=response, next)=>{
        if(!req.userVerificado){
            return res.status(500).json({
                ok:false,
                message: 'Impisible valdiar Rol sin validar token.'
            });
        }
    const {rol, name} =req.userVerificado;

    if(rol !=='ADMIN'){
        return res.status(401).json({
            ok:false,
            message: 'Permisos de adminstrador denegados a '+name
        });
    }

    next();
};



const validRols= ( ...roles)=>{

return (req= request,res=response, next)=>{
    if(!req.userVerificado){
        return res.status(500).json({
            ok:false,
            message: 'Impisible valdiar Rol sin validar token.'
        });
    }
    const {rol, name} =req.userVerificado;

    console.log(roles, rol);
    if(!roles.includes(rol)){
        return res.status(401).json({
            ok:false,
            message: 'Permisos de adminstrador denegados a '+name
        });
    }

    next();
}


};

module.exports = {
    isAdminRoel,
    validRols
}