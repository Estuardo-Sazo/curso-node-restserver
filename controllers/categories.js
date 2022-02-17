const { response } = require("express");
const Category= require('../models/category');


const categoriesGet = async (req, res = response) => {
  let pagina = Number(req.query.page) || 1;
  let limite=5;
  let skip = pagina - 1;
  skip *= limite;  
  let query={status: true};

  const categories= await Category.find(query)
                        .sort({ _id: -1 })
                        .skip(skip)
                        .limit(limite)
                        .populate('user', 'name')
                        .exec();

    res.json({
      ok: true,
      categories    
    });
  };


  const categoryIdGet = async (req, res = response) => {
    const { id } = req.params;

    const category = await Category.findById(id)
                                   .populate('user', 'name');
    
    res.json({
      ok: true,
      category    
    });
  };

  const categoryCreate = async (req, res = response) => {

    const name= req.body.name.toUpperCase();
    const categoryDB= await Category.findOne({name});

    if(categoryDB){
        return res.status(400).json({
            ok: false,
            message: `La Categoria ${name}, ya existe`,
          });
    }

    //Generar Data
    const data= {
        name,
        user: req.userVerificado._id
    }
    const category= await Category(data);
    console.log(category);
    
    await category.save();
    res.status(200).json({
      ok: true,
      category
    
    });
  };

  const categoryUpdate = async (req, res = response) => {
    const { id } = req.params;
    const {status,user,...data}= req.body;

    data.name= data.name.toUpperCase();
    data.user= req.userVerificado._id;

    const category = await Category.findByIdAndUpdate(id, data,{new:true});
    res.json({
      ok: true,
      category
    
    });
  };

  const categoryDeleteId = async (req, res = response) => {
    const { id } = req.params;
  const category =await Category.findByIdAndUpdate(id,{status: false});

    res.json({
      ok: true,
      category
    
    });
  };


  module.exports = {
    categoriesGet,
    categoryIdGet,
    categoryCreate,
    categoryUpdate,
    categoryDeleteId
  };
  