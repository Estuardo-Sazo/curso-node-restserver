const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
           // useCreateIndex: true,
          //  useFindAndModify: false,
        });

        console.log('Conexion DB Correcto!');


    } catch (error) {
        console.log(error);
        throw new Error('Error a l intentar iniciar la base de datos.')
    }
}




module.exports = {
    dbConnection
}