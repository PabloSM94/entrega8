//ejecución de handlebars
const camposChat = [
    {nombreCampo: "Correo Electronico", type:"email", name:"email"},
    {nombreCampo: "Mensaje", type:"text", name:"msg"},
]

const renderChat = Handlebars.compile(`<h2>Chat</h2>
    <br>
    <div class="principal">
        <form class="row gx-4 gy-4">
        <div id="mensajes"></div>
            {{#each campo}}
            <div class="entradas col-md-4">
                <input id="input{{this.name}}" class="form-control" type="{{this.type}}" name="{{this.name}}" placeholder="{{this.nombreCampo}}">
            </div>
            {{/each}}
            <br>
            <div class="col-12 justify-items-center">
                <button id="enviarMsg" class="btn btn-primary">Enviar</button>
            </div>
        </form>
    </div>`)
document.getElementById("chat").innerHTML = renderChat({
    campo: camposChat
})   