const { Router } = require("express");
const { check } = require("express-validator");
const { categoriesGet, categoryIdGet, categoryCreate, categoryUpdate, categoryDeleteId } = require("../controllers/categories");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/jwt");
const { existeCategoryId } = require("../helpers/db-validators");
const { isAdminRoel, validRols } = require("../middlewares/rols");


const router = Router();

//Public
router.get("/", categoriesGet);
//Public
router.get("/:id",[
    check('id', 'No es un id Valido').isMongoId(),
    check('id').custom(existeCategoryId),
    validarCampos
], categoryIdGet);

//Private or TOKEN

router.post("/",[
    validarJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,

], categoryCreate);

//Private or TOKEN

router.post("/update/:id",[
    validarJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoryId),

    validarCampos
], categoryUpdate);

//Private or TOKEN

router.post("/delete/:id",[
    validarJWT,
    validRols('ADMIN'),

    check('id', 'No es un id Valido').isMongoId(),

    check('id').custom(existeCategoryId),

    validarCampos
], categoryDeleteId);









module.exports = router;
