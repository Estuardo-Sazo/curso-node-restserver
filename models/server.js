const express = require('express');
const cors = require('cors');
const {dbConnection}= require('../database/config');

class Server {
    constructor(){
        this.app= express();
        this.port=process.env.PORT;
        this.userRoute='/api/user';

        //Conectar a base de datos
        this.connectDB();

        //Middlewares
        this.middlewares();

        //Rutas aplicacion

        this.route();
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares(){
        //cors
        this.app.use(cors());

        //Lectrua de parseo body
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'))
    }

    route(){
        this.app.use(this.userRoute,require('../routes/users'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en el puerto: ',this.port );
        });
    }

}


module.exports = Server;