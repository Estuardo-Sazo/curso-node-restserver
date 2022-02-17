const {Schema, model} =require('mongoose');

const RoleSchema = Schema({
    rol:{
        type:String,
        require: [true, 'El Ron el obligatorio.']
    }
});



module.exports = model('Role', RoleSchema);