const { response } = require('express');

const Product= require('../models/product');

const getProducts =async (req, res = response) => {
  let pagina = Number(req.query.page) || 1;
  let limite=10;
  let skip = pagina - 1;
  skip *= limite;  
  let query={status: true};

  
  const products= await Product.find(query)
                        .sort({ _id: -1 })
                        .skip(skip)
                        .limit(limite)
                        .populate('user', 'name')
                        .populate('category', 'name')

                        .exec();

    res.json({
        ok:true,
        products
      });
};

const createProduct =async (req, res = response) => {
    const data= req.body;
    const name=data.name;
    data.user= req.userVerificado._id;
    const productDB= await Product.findOne({name});
    if(productDB){
        return res.status(400).json({
            ok: false,
            message: `El producto ${name}, ya existe`,
          });
    }
    const product= await Product(data);
    await product.save();
    res.json({
        ok:true,
        product,
      });
};




module.exports = {
    getProducts,
    createProduct
}