const knex = require('knex');

cfg = {
    client: 'mysql',
    connection: {
      host : 'localhost',
      port : 3306,
      user : 'root',
      password : 'mypass',
    }
}

const iniciar = async (cfg) => {
    client = knex(cfg)
    // operacion crear base de datos si no exite
    await client.schema.raw('CREATE DATABASE IF NOT EXISTS websockets;')
    await client.schema.raw('USE websockets;')
    // operacion de crear la tabla si no exite
    const existe = await client.schema.hasTable('productos')
    if (!existe){
        await client.schema.createTable("productos", (table) => {
            // definimos id
            table.increments();
            // titulo
            table.string('title');
            // url
            table.string('thumbnail');
            // price
            table.float('price');
        })
    }
}

config = {
    client: 'mysql',
    connection: {
      host : 'localhost',
      port : 3306,
      user : 'root',
      password : 'mypass',
      database : 'websockets'
    }
}
const init = async () => await iniciar(cfg)
module.exports = {
    config,
    init,
    tabla: "productos",
}