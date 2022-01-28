const {Schema,model} =require('mongoose');

const UserSchema=Schema({
    name: {
        type: String,
        required: [true, 'El nombre es necesario'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario'],
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },
    image: {
        type: String,
        default: 'profile.png'
    },
    rol:{
        type: String,
        enum: ['ADMIN','USER'],
        default: 'USER',
        required: [true, 'El correo es necesario']
    },
    status:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }
});


UserSchema.methods.toJSON = function () {
    const {__v, password,_id,...user}= this.toObject();
    user.uuid=_id;
    return user;
}



module.exports = model('User',UserSchema);