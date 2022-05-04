
const express = require('express');

const notFound = {
    error : "producto no encontrado"
};

const GetRutas = (micontenedor, io) => {

    const router = express.Router();

    router.get('/', async (_ , res) => {
        res.send(await micontenedor.getAll())
    })
    
    router.get('/:id',async (req,res) => {
        const id = parseInt(req.params.id);
        const encontrado = await micontenedor.getById(id);
        if(encontrado){
          res.send(encontrado);  
        }
        else{
            res.status(404).json(notFound)
        }
        
    
    })
    router.post('/',async (req , res) => {
        const productoRecibido = req.body;
        res.send(await micontenedor.postProduct(productoRecibido))
        io.emit("nuevo_producto", await micontenedor.getAll())
        console.log(await micontenedor.getAll())
    })
    router.put('/:id',async (req, res) => {
        const id = parseInt(req.params.id)
        const nuevoProducto = req.body;
        const actualizado = await micontenedor.putProduct(id , nuevoProducto);
        if(actualizado){
          res.send(actualizado);  
        }
        else{
            res.status(404).json(notFound)
        }
    })
    router.delete('/:id',async (req , res)=>{
        const id = parseInt(req.params.id);
        const eliminado = await micontenedor.deleteProduct(id);
        if(eliminado){
            res.send(eliminado)    
        } 
        else{
            res.status(404).json(notFound)
        }
    });
    return router
}

module.exports = GetRutas