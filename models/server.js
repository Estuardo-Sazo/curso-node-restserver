const express = require('express');
const cors = require('cors');

class Server {
    constructor(){
        this.app= express();
        this.port=process.env.PORT;
        this.userRoute='/api/user';

        //Middlewares
        this.middlewares();

        //Rutas aplicacion

        this.route();
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