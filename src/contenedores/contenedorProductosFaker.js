import {generarProducto} from '../../faker/generadordeProductos.js'

async function verProductos(){
    let productos = []
    for (let i=1;i<=5;i++){
        productos.push(await generarProducto(i))
    }
    return productos 
}

async function nuevoProducto(producto){
    console.log("Se creo nuevo producto")
}


export {verProductos,nuevoProducto}