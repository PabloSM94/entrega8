import { MongoClient } from "mongodb";
// Replace the uri string with your MongoDB deployment's connection string.
const uri = config.mongodb.cnxStr;
const client = new MongoClient(uri);

import config from '../config.js'

await client.connect();

async function cargarMensajes(){
    const database = client.db("chat");
    const mensajes = database.collection("mensajes")
    const datos = await mensajes.find().toArray()
    const objetoNormalizado = datos[0]
    return objetoNormalizado
}




async function guardarMensaje(msg){
    
    console.log("guardando..")
    const database = client.db("chat");
    const mensajes = database.collection("mensajes")
    await mensajes.replaceOne({},msg)
    
}

export {cargarMensajes,guardarMensaje}