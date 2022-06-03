import {knex1,knex2} from '../../public/js/crearTabla.js'


async function cargarMensajes(tabla){
    let mensajes = []
    await knex2.from(`${tabla}`).select("*")
        .then((rows)=>{
            for (const row of rows){
                mensajes.push(row)
            }
        return 
        })
    return mensajes
}


async function cargarMensajes2(tabla){
    let mensajes = []
    await knex2.from(`${tabla}`).select("*")
        .then((rows)=>{
            for (const row of rows){
                mensajes.push(row)
            }
            
        })
    return mensajes
}

async function guardarMensaje(msg){
    msg.fecha = new Date().toLocaleString();
    console.log(msg);
    await knex2('mensajes').insert(msg)
            .then(()=>{
                console.log("mensaje guardado")
            })
}
export {cargarMensajes,cargarMensajes2,guardarMensaje}