import express from 'express'
import fs from 'fs'
import {  Server as HttpServer  } from 'http'
import {  Server as IOServer } from 'socket.io'
//Base de datos
import {knex1} from '../public/js/crearTabla.js'
import {knex2} from '../public/js/crearTabla.js'
import { cargarMensajes, guardarMensaje } from './contenedores/contenedorMensajesnoSQL.js'
import { verProductos,nuevoProducto } from './contenedores/contenedorProductosFaker.js'
import router from './router/routerProductos.js'

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const PORT = 8080

app.use(express.static("../public"))
app.use('/api/productos-test',router)

// let productos = []; //Cambiar persistencia a MariaDB / MySQL
// let mensajes = [];  //Cambiar persistencia a SQLite3

const server = httpServer.listen(PORT, ()=>{console.log("servidor escuchando en el puerto "+ server.address().port)})

server.on("error", error => console.log("Error en servidor"+error))


io.on('connection', (socket)=>{

    console.log(`Se conecto el usuario: ${socket.id}`)
//-----------------------------------------Mensajes
    async function loadmsg(){
        console.log("cargando...")
        const mensajes = await cargarMensajes()
        socket.emit("mensajes",mensajes)
    }

    async function loadmsg2(){
        const mensajes = await cargarMensajes()
        console.log("mensajes actualizados")
        io.sockets.emit("mensajes",mensajes)
    }
    //Carga inicial 
    loadmsg()
    //Agregar nuevo mensajes y persistir
    socket.on("nuevoMensaje",async msg =>{
        console.log("llego mensaje nuevo al servidor",msg)
        await guardarMensaje(msg)
        await loadmsg2()
            
    })
//-------------------------------------------Productos


    async function loadpr(){
        const productos = await verProductos()
        return productos
    }
    
    //Carga incial de productos
    async function cargainicial(){
        const productos = await loadpr()
        socket.emit("productos", productos)
    }
    async function cargaconnuevoProd(){
        const productos = await loadpr()
        io.sockets.emit("productos", productos)
    }
    cargainicial()

    socket.on("nuevoProducto",producto =>{
        nuevoProducto(producto)
        cargaconnuevoProd()
              
    })


})

//////////////////////////--- Base de datos
