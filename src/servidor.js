const express = require('express')
const fs = require('fs')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
//Base de datos
const {options} = require('../public/js/mySQL.js')
const knex = require("knex")(options)
const knex2 = require("knex")({
    client: 'sqlite3',
    connection: {filename: "../db/ecommerce.sqlite"},
    useNullAsDefault: true
})

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const PORT = 8080

app.use(express.static("../public"))

// let productos = []; //Cambiar persistencia a MariaDB / MySQL
// let mensajes = [];  //Cambiar persistencia a SQLite3

const server = httpServer.listen(PORT, ()=>{console.log("servidor escuchando en el puerto "+ server.address().port)})

server.on("error", error => console.log("Error en servidor"+error))


io.on('connection', (socket)=>{

    console.log(`Se conecto el usuario: ${socket.id}`)
    
    function cargarMensajes(tabla){
        knex2.from(`${tabla}`).select("*")
            .then((rows)=>{
                let mensajes = []
                for (row of rows){
                    mensajes.push(row)
                }
                socket.emit("mensajes",mensajes)
            })
        
    }
    function cargarMensajes2(tabla){
        knex2.from(`${tabla}`).select("*")
            .then((rows)=>{
                let mensajes = []
                for (row of rows){
                    mensajes.push(row)
                }
                io.sockets.emit("mensajes",mensajes)
            })
        
    }
    cargarMensajes("mensajes")
    //setTimeout(()=>socket.emit("mensajes",mensajes),1000)

    knex.from("productos").select("*")
    .then((rows)=>{
        let productos = []
        for (const row of rows){
            productos.push(row)
        }
        socket.emit("productos", productos)
    })
    .catch((err)=> console.log(err)) 

    
    

    socket.on("nuevoProducto",producto =>{
        knex('productos').insert(producto)
        .then(()=> console.log("Se cargo el producto en la base de datos"))
        .catch((err)=> console.log(err))

        knex.from("productos").select("*")
        .then((rows)=>{
            let productos = []
            for (const row of rows){
                productos.push(row)
            }
            io.sockets.emit("productos", productos)
        })
        .catch((err)=> console.log(err))       
    })

    socket.on("nuevoMensaje",msg =>{
        msg.fecha = new Date().toLocaleString();
        console.log(msg);
        knex2('mensajes').insert(msg)
            .then(()=>{
                console.log("mensaje guardado")
            })
            cargarMensajes2("mensajes")
    })
})

//////////////////////////--- Base de datos
