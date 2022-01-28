const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { validarCampos } = require("../middlewares/validar-campos");
const { generarJWT } = require("../helpers/jwt");
const { json } = require("express/lib/response");
const { googleVerify } = require("../helpers/google-verifay");

const authLogin = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    //Verificar Email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        message: "Email / Password incorrectos.",
      });
    }

    // Verificar status
    if (!user.status) {
      return res.status(400).json({
        ok: false,
        message: "Usuario Inactivo!",
      });
    }

    // validar pass
    const validPass = bcryptjs.compareSync(password, user.password);
    if (!validPass) {
      return res.status(400).json({
        ok: false,
        message: "Contraseña Incorrecta",
      });
    }

    //generar token

    const token = await generarJWT(user.id);

    res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Error Interno, contacte con el Administrador.",
    });
  }
};

const authLoginGoogle = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { email, name, image } = await googleVerify(id_token);

    let user = await User.findOne({ email });

    if (!user) {
      const data = {
        name,
        email,
        password: '6',
        image,
        google: true
      }
      user= new User(data)
      
      let resp= await user.save();
    }

    //
    //Si el user status

    if (!user.status) {
      res.status(401).json({
        ok: false,
        message: "Usuario Bloqueado, comuniquese con el administrador",
      });
    }
    const token = await generarJWT(user.id);

    res.json({
      ok: true,
      message: "Goolge Auth",
      user,
      token
    });

  } catch (error) {
    res.status(400).json({
      ok: false,
      message: "Token Google no Valido",
    });
  }
};
module.exports = {
  authLogin,
  authLoginGoogle,
};
