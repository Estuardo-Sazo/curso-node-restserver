const { response } = require("express");
const User = require('../models/user');
const bcryptjs = require("bcryptjs");

const usersGet = async (req, res = response) => {
  let pagina = Number(req.query.page) || 1;
  let limite=5;
  let skip = pagina - 1;
  skip *= limite;  
  let query={status: true};

  const users= await User.find(query)
                        .sort({ _id: -1 })
                        .skip(skip)
                        .limit(limite)
                        .exec();
  res.json({
    ok: true,
    message: "Get User - Controller",
    pagina,
    users
  });
};
const userGetId = (req, res = response) => {
   
  const { id } = req.params;
  res.json({
    message: "Get User ID - Controller",
    id
  });
};

const userPost = async (req, res = response) => {
  
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });
  
  //Hash Contraseña
  const salt = bcryptjs.genSaltSync(10);
  user.password = bcryptjs.hashSync(password, salt);
  //Guardar DB
  await user.save();
  res.json({
    message: "POST User - Controller",
    user,
  });
};

const userUpdate = async (req, res = response) => {
  const { id } = req.params;
  const {_id, password,google,email,...resto}= req.body;

  // validad id DB
  console.log(resto);
  if(password){
    //Hash Contraseña
    const salt = bcryptjs.genSaltSync(10);
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const user =await User.findByIdAndUpdate(id,resto);
  res.json({
    message: "UPDATE User - Controller",
    user,
  });
};

const deleteUser= async (req, res = response) => {
  const { id } = req.params;
  const user =await User.findByIdAndUpdate(id,{status: false});
  const userVerificado= req.userVerificado;
  res.json({
    ok: true,
    message: "DELETE User",
    user,
    userVerificado
  });

};

module.exports = {
  usersGet,
  userPost,
  userGetId,
  userUpdate,
  deleteUser
};
