const socket = io();
const botonEnviar = document.getElementById("botonEnviar")
const enviarMsg = document.getElementById("enviarMsg")
const normalizar = normalizr.normalize
const denormalize = normalizr.denormalize
const schema = normalizr.schema

class Chats {
    constructor(mensajes){
        this.mensajes = {mensajes}
    }
}
const chat = new Chats()
// const chat = {
//     mensajes:[]
// }

let id;

  // Definimos un esquema de usuarios (autores y comentadores)
  const authorSchema = new schema.Entity('authors',{},{ idAttribute: 'id'})
  
  // Definimos un esquema de comentadores
  const mensajesSchema = new schema.Entity('mensaje',{
      author: authorSchema
  },{ idAttribute: 'idmsg'})
  
  // Definimos un esquema de artículos
  const chatSchema = new schema.Entity('mensajes', {
    mensajes: [mensajesSchema],
  },{idAttribute: 'mensajes', mensajes:[]});


const buildMensaje = class {
    constructor(id,nombre,apellido,edad,alias,avatar,text){
        this.id = id
        this.nombre = nombre
        this.apellido = apellido
        this.edad = edad
        this.alias = alias
        this.avatar = avatar
        this.text = text
        this.mensaje = {
            author: {
                id: this.id,
                nombre: this.nombre,
                apellido: this.apellido,
                edad: this.edad,
                alias: this.alias,
                avatar: this.avatar,
            },
            text: this.text
        }
    }
}

function mostrarProductos(input){
    console.log(input)
    if(input.length == 0){
        const renderTabla = Handlebars.compile(`<div class="alerta alert alert-warning" role="alert">
        No existen productos cargados
      </div>`)
    document.getElementById("listaProd").innerHTML = renderTabla()   
    }else{
        const renderTabla = Handlebars.compile(`<h2>Listado de productos</h2>
        <div class="tabla">
        <table class="table">
          <thead class="table-light">
            <th>Producto</th>
            <th>Precio</th>
            <th>Imagen</th>
          </thead>
          <tbody>
            {{#each productos}}
            <tr>
            <td>{{this.title}}</td>
            <td>U$D {{this.price}}</td>
            <td><img src="{{this.thumbnail}}" alt="{{this.title}}" width="50px" height="50px"></td>
            </tr>
            {{/each}}
          </tbody>
        </table>
        </div>`)
        document.getElementById("listaProd").innerHTML = renderTabla({
            productos: input
        })
    }
    
}
function getLengthOfObject(obj) { 
    let lengthOfObject = Object.keys(obj).length; 
    return lengthOfObject
}

function mostrarMensajes(objetoDesnormalizado){
    
    let mensajesParaMostrar =[]
    for (let i=0;i<(getLengthOfObject(objetoDesnormalizado));i++){
        console.log(objetoDesnormalizado[i])
        mensajesParaMostrar.push([`<li><p class="autor">${objetoDesnormalizado[i].author.id}</p> <p class="fecha">[${objetoDesnormalizado[i].timestamp}]:</p> <p class="texto">${objetoDesnormalizado[i].text}</p> </li>`])
    }
    console.log(mensajesParaMostrar)
    // const mensajesParaMostrar = objetoDesnormalizado.map(({timestamp, idmsg, text})=>{
    //     return `<li><p class="autor">${idmsg}</p> <p class="fecha">[${timestamp}]:</p> <p class="texto">${text}</p> </li>`   
    // })
    const mensajesHTML = `
    <ul>
    <div>Mensajes</div>
    ${mensajesParaMostrar.join('\n')}
    </ul>
    `
    const listaMensajes = document.getElementById("mensajes")
    listaMensajes.innerHTML = mensajesHTML

//    console.table(mensajesParaMostrar)
}



socket.on("productos", productos =>{
    mostrarProductos(productos)
})

socket.on("mensajes", mensajes =>{
    const objetoDesnormalizado = denormalize(mensajes.result,chatSchema,mensajes.entities)
    chat.mensajes = Object.values(objetoDesnormalizado)
    mostrarMensajes(objetoDesnormalizado)
})


let cObjeto = class {
    constructor (title, price, thumbnail){
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
    }
}

botonEnviar.addEventListener("click", e=>{
    
    const inputTitle = document.getElementById("inputtitle")
    const inputPrecio = document.getElementById("inputprice")
    const inputThumbnail = document.getElementById("inputthumbnail")

    if (inputTitle.value && inputPrecio.value && inputThumbnail.value){
        const producto = new cObjeto(inputTitle.value,inputPrecio.value,inputThumbnail.value)
        socket.emit("nuevoProducto", producto)
    } else {
        alert("Complete todos los campos")
    }
    
})

enviarMsg.addEventListener("click", e=>{
    e.preventDefault()
    let mensaje = [];
    const inputemail = document.getElementById("inputemail")
    const inputnombre = document.getElementById("inputnombre")
    const inputapellido = document.getElementById("inputapellido")
    const inputedad = document.getElementById("inputedad")
    const inputalias = document.getElementById("inputalias")
    const inputavatar = document.getElementById("inputavatar")
    const inputmsg = document.getElementById("inputmsg")
    //const input* = document.getElementById("input*")


    if (inputemail.value && inputmsg.value){
        mensaje = new buildMensaje(inputemail.value,inputnombre.value,inputapellido.value,inputedad.value,inputalias.value,inputavatar.value,inputmsg.value)
        const mensajesaOrdenar = JSON.parse(JSON.stringify(chat.mensajes))
        const mensajesOrdenados = mensajesaOrdenar.sort((a,b)=>{
            if (a.idmsg<b.idmsg){
                return 1
            }
            if (a.idmsg>b.idmsg){
                return -1
            }
            if (a.idmsg=b.idmsg){
                return 0
            }
        })
        if (mensajesOrdenados.length !== 0 ){
            mensaje.mensaje.idmsg = mensajesOrdenados[0].idmsg + 1 
        }
        else{
            mensaje.mensaje.idmsg = 1
        }

        mensaje.mensaje.timestamp = new Date().toLocaleString();

        chat.mensajes.unshift(mensaje.mensaje)
        const chatNormalizado = normalizar(chat,chatSchema)
        // for (let i=0;chatNormalizado.length;i++){

        // }
        console.log("CN",chatNormalizado)
        socket.emit("nuevoMensaje", chatNormalizado)
        inputmsg.value = ""
    }else{
        alert("Complete al menos el campo Email y Mensaje")
    }
})

