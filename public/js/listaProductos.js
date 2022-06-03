function mostrarProductos(input){
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

