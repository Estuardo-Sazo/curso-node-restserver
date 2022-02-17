const {Schema,model} =require('mongoose');

const CategorySchema=Schema({
    name: {
        type: String,
        required: [true, 'El nombre es necesario'],
    },
    status:{
        type:Boolean,
        default:true,
        require: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'User',
        require: true
    }
});


CategorySchema.methods.toJSON = function () {
    const {__v,_id,status,...data}= this.toObject();
    data.uuid=_id;
    return data;
}



module.exports = model('Category',CategorySchema);
