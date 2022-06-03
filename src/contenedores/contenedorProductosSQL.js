import {knex1,knex2} from '../../public/js/crearTabla.js'

async function verProductos(){
    let productos = []
    await knex1.from("productos").select("*")
    .then((rows)=>{
        
        for (const row of rows){
            productos.push(row)
        }
        
    })
    .catch((err)=> console.log(err))
    return productos 
}

async function nuevoProducto(producto){
    await knex1('productos').insert(producto)
    .then(()=> console.log("Se cargo el producto en la base de datos"))
    .catch((err)=> console.log(err))
}


export {verProductos,nuevoProducto}