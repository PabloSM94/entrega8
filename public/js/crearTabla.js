//Crear tabla en MySQL para productos
import {options} from './mySQL.js'
import knex from "knex"
//Crear tabla en MySQL para mensajes
import {optionsSQLite} from './mySQL.js'

const knex1 = knex(options)
const knex2 = knex(optionsSQLite)

knex1.schema.hasTable("productos")
    .then(exists => {
        if (!exists) {
            knex1.schema.createTable("productos", table =>{
                table.increments("id")
                table.string("title")
                table.integer("price")
                table.string("thumbnail")
            })
            .then (()=> console.log("tabla personas creada"))
        }else{
            console.log("tabla personas ya existe")
        }
    })
    .catch( (err) => {console.log(err); throw err })
    

knex2.schema.hasTable("mensajes")
    .then(exists =>{
        if (!exists) {
            knex2.schema.createTable("mensajes", table =>{
                table.string("autor")
                table.string("texto")
                table.string("fecha")
            })
            .then (()=> console.log("tabla mensajes creada"))
        }else{
            console.log("tabla mensajes ya existe")
        }
    })
    .catch( (err) => {console.log(err); throw err })


export {knex1,knex2}