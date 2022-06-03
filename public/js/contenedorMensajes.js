const buildMensaje = class {
    constructor(id,nombre,apellido,edad,alias,avatar,text){
        this.id = id
        this.nombre = nombre
        this.apellido = apellido
        this.edad = edad
        this.alias = alias
        this.avatar = avatar
        this.text = text
        mensaje = {
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

export default buildMensaje