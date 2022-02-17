const category = require('../models/category');
const Role = require('../models/roles');
const User = require('../models/user');

const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la DB`);
    }
}

const existeCorreo = async (email = '') => {
    const exist = await User.findOne({ email });
    if (exist) {
        throw new Error(`El correo: ${email}, ya se encuentra registrado.`);

    }
}

const existeUserId = async (id = '') => {
    const exist = await User.findById(id);
    if (!exist) {
        throw new Error(`El id: ${id}, no existe.`);

    }
}

//*** CATEGORIES */

const existeCategoryId = async (id = '') => {
    const exist = await category.findById(id);
    if (!exist) {
        throw new Error(`El id: ${id}, no existe.`);

    }
}




module.exports = {
    esRolValido,
    existeCorreo,
    existeUserId,
    existeCategoryId
}