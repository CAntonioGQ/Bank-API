import express, { Application } from 'express'

import clienteRoutes from '../routes/cliente.routes'
import montoRoutes from '../routes/montos.routes'; 
import plazoRoutes from '../routes/plazos.routes'; 

import cors  from "cors";
import db from '../db/connection';

class Server{

    private app: Application
    private port: string
    private apiPaths = {
        cliente: '/api/clientes',
        montos: '/api/montos',
        plazos: '/api/plazos',
    }

    constructor(){
        this.app = express()
        this.port = process.env.PORT || '8000'

        this.dbConnection()

        this.middlewares()
        this.routes()
    }

    async dbConnection(){
        try {
            await db.authenticate()
            console.log('Database is Connected')
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            
        }
    }


    middlewares(){
        this.app.use ( cors() )

        this.app.use( express.json() )

        this.app.use ( express.static('public') )
    }



    routes(){
        this.app.use ( this.apiPaths.cliente, clienteRoutes);
        this.app.use(this.apiPaths.montos, montoRoutes);
        this.app.use(this.apiPaths.plazos, plazoRoutes);
    }

    listen() {
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto: ' + this.port)
        })
    }
}

export default Server