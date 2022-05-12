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

function mostrarMensajes(mensajes){
    mensajesParaMostrar = mensajes.map(({fecha, autor, texto})=>{
        return `<li><p class="autor">${autor}</p> <p class="fecha">[${fecha}]:</p> <p class="texto">${texto}</p> </li>`   
    })
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

const socket = io();
const botonEnviar = document.getElementById("botonEnviar")
const enviarMsg = document.getElementById("enviarMsg")

socket.on("productos", productos =>{
    mostrarProductos(productos)
})

socket.on("mensajes", mensajes =>{
    mostrarMensajes(mensajes)
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
    const inputMensaje = document.getElementById("inputmsg")
    const inputAutor = document.getElementById("inputemail")
    if (inputMensaje.value && inputAutor.value){
        const mensaje = {
            autor: inputAutor.value,
            texto: inputMensaje.value
        }
        inputMensaje.value = ""
        socket.emit("nuevoMensaje", mensaje)
    } else {
        alert("Ingrese algun mensaje")
    }
    
})

