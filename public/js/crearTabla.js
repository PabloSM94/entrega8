//Crear tabla en MySQL para productos
const {options} = require('./mySQL')
const knex = require("knex")(options)

//Crear tabla en MySQL para mensajes
const {optionsSQLite} = require('./mySQL')
const knex2 = require("knex")(optionsSQLite)

knex.schema.hasTable("productos")
    .then(exists => {
        if (!exists) {
            knex.schema.createTable("productos", table =>{
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
    .finally(()=> knex.destroy())

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
    .finally(()=> knex2.destroy())