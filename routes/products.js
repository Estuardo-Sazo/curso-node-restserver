const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/jwt");
const { existeCategoryId } = require("../helpers/db-validators");
const { isAdminRoel, validRols } = require("../middlewares/rols");

const { createProduct, getProducts } = require("../controllers/products");

const router = Router();

//Public Routes
router.get("/", getProducts);

//Private Routes
router.post("/",[
    validarJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty().trim().escape(),
    check('description', 'Error en la descripción').trim().escape(),

    check('price','El precio debe ser Numerico').isNumeric({min:0}),
    check('cost','El Costo debe ser Numerico').isNumeric({min:0}),
    check('category').custom(existeCategoryId),


    validarCampos
],

createProduct);

module.exports = router;
