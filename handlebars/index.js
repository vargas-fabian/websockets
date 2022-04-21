const express = require('express');
const { create } = require("express-handlebars");
const { entidades, getRutas } = require('../Productos')
const { Contenedor, Producto } = entidades;
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require("socket.io");
const path = require('path');

const cargarProductosScripts = [{ script: './scripts/productos.js'}]

const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const hbs = create({
    extname: ".hbs",
    defaultLayout: 'index.hbs',
    layouDir: __dirname+ "/views/layouts",
    partialsDir: __dirname+ "/views/partials",
})
const micontenedor = new Contenedor();
const rutas = getRutas(micontenedor, io);

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', rutas);
app.engine(
    "hbs",
    hbs.engine
)
app.set("view engine", "hbs");
app.set("views", __dirname+"/views");

app.get("/productos", (req,res) => {
    res.render("productos", { productos: micontenedor.getAll() })
})
app.get("/", (req,res) => {
    res.render("cargar-productos", { scripts: cargarProductosScripts })
})
app.post('/productos', function(req, res) {
    res.redirect('/');
});

const server = httpServer.listen(8080, () =>{
    // Datos de prueba
    micontenedor.add(new Producto("auricular",5,"url1"));
    micontenedor.add(new Producto("teclado",56,"url2"));
    micontenedor.add(new Producto("mouse",64,"url3"));
    console.log("servidor http en el puerto 8080");
});

server.on('error', (err) => {
    console.log("Se ha producido un error,", err.message);
});

io.on('connection', (socket) => {
    console.log(socket.id , 'a user connected');
});