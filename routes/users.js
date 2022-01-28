const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();

const { usersGet,
    userPost,
    userGetId,
    userUpdate,
    deleteUser } = require("../controllers/users");
const { esRolValido, existeCorreo, existeUserId } = require("../helpers/db-validators");
const { validarJWT } = require("../middlewares/jwt");
const { isAdminRoel, validRols } = require("../middlewares/rols");
const { validarCampos } = require("../middlewares/validar-campos");

router.get("/", usersGet);
router.get("/:id", userGetId);
router.post("/delete/:id", [
    validarJWT,
   // isAdminRoel,
   validRols('ADMIN','EDITOR'),
    check('id', 'No es un id Valido').isMongoId(),
    check('id').custom(existeUserId),
    validarCampos
],
    deleteUser);

router.post("/", [
    check('name', 'El correo es obligatorio').not().isEmpty(),
    check('email', 'El correo ni es valido!').isEmail(),
    check('email').custom(existeCorreo),
    check('password', 'La contraseña debe ser mas de 6 digitos').isLength({ min: 6 }),
    //check('rol','No es un rol válido!').isIn(['ADMIN','USER']),
    check('rol').custom(esRolValido),

    validarCampos

], userPost);

router.post('/update/:id', [
    check('id', 'No es un id Valido').isMongoId(),
    check('id').custom(existeUserId),
    check('rol').custom(esRolValido),



    validarCampos
], userUpdate);

module.exports = router;
