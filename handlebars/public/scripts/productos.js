const socket = io()
console.log("FUE CARGADO")


socket.on(
    "nuevo_producto", (productos) => {
        // si hay uno previo lo elimino
    
        var previoUl = document.body.getElementById('productos')
        if (previoUl) {
            document.body.removeChild(previoUl);
        }
        // siempre creo una lista nueva y la agrego
        var ul = document.createElement('ul');
        ul.setAttribute('id','productos');

        productos.forEach( (producto) => {
            var li = document.createElement('li');
            li.innerText = producto.producto.title
            ul.appendChild(li)
        })
        document.body.appendChild(ul)
    }
)

