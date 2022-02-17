const {Schema,model} =require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es necesario'],
    },
    description: {
        type: String,
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
    },
    category:{
        type: Schema.Types.ObjectId,
        ref:'Category',
        require: true
    },
    price:{
        type: Number,
        default:0
    },
    cost:{
        type: Number,
        default:0
    },
    available:{
        type: Boolean,
        default:true
    }
});


ProductSchema.methods.toJSON = function () {
    const {__v,_id,status,...data}= this.toObject();
    data.uuid=_id;
    return data;
}



module.exports = model('Product',ProductSchema);
