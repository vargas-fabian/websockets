const knex = require('knex');

class Producto{
    title;
    price;
    thumbnail;
    constructor(title, price, thumbnail){
        this.title = title;
        this.price = price;
        this.thumbnail =thumbnail;
    } 
}

class Contenedor {
    client;
    tabla;
    constructor(config, tabla){
        this.tabla = tabla;
        this.client = knex(config)
    }

    async add(producto){
        const result = await this.client.table(this.tabla).insert(
            producto
        )
        return result[0]
    }

    async getAll(){
        return await this.client.from(this.tabla).select()
    }
    async getById(id){
        const resultado = await this.client.from(this.tabla).where({'id': id}).first()
        return resultado
    }

    async postProduct(producto){
        const id = await this.add(producto)
        const resultado = await this.getById(id);
        return resultado
    }

    async putProduct(id,producto){
        await this.client.from(this.tabla).where({'id': id}).update(producto)
    }

    async deleteProduct(id){
        await this.client.from(this.tabla).where({'id': id}).delete()
    }
}

module.exports = {
    Producto,
    Contenedor
}