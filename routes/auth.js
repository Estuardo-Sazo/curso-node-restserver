const { Router } = require("express");
const {authLogin, authLoginGoogle} = require('../controllers/auth');
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");



const router = Router();

router.post("/login",[
    check('email', 'El correo no es valido!').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),


    validarCampos

],
authLogin );

router.post("/google",[
    check('id_token', 'El ID TOken Es necesario').not().isEmpty(),


    validarCampos

],
authLoginGoogle );


module.exports = router;
