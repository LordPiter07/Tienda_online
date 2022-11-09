
const contenedorProductosCereal = document.getElementById("seccion-cereales");
const contenedorProductosDulces = document.getElementById("seccion-dulces");
const contenedorProductosInfusiones = document.getElementById("seccion-infusiones");
const contenedorProductosLacteos = document.getElementById("seccion-lacteos");
const contenedorCarrito = document.getElementById("contenedorCarrito");
const botonVaciar = document.getElementById("vaciarCarrito");
const contadorCarrito = document.getElementById("contadorCarrito");
const precioTotal = document.getElementById("precioTotal");

let carritoCompras = new Array();

document.addEventListener("DOMContentLoaded", () => {
    carritoCompras = JSON.parse(localStorage.getItem("claveCarrito")) || [];
    actualizarCarrito();  
})


//Distribuyo la lista de productos en cada seccion segun su tipo.
let productosCereales = listaDeProductos.filter(producto => producto.seccion === "cereal");
publicarPoductos(productosCereales);

let productosDulces = listaDeProductos.filter(producto => producto.seccion === "dulces");
publicarPoductos(productosDulces);

let productosInfusiones = listaDeProductos.filter(producto => producto.seccion === "infusiones");
publicarPoductos(productosInfusiones);

let productosLacteos = listaDeProductos.filter(producto => producto.seccion === "lacteos");
publicarPoductos(productosLacteos);


//funcion encargada de tomar los array ya filtados segun seccion e inyectarlos en el html.
function publicarPoductos(productos) {
    productos.forEach(prod => {
        const div = document.createElement("div");
        div.classList.add("card", "col-3", "tarjeta");
        div.setAttribute("style","width: 10rem;")
        div.innerHTML = `
                        <img src="../${prod.img}" class="card-img-top"  alt="">
                        <div class="card-body">
                            <h3 class="card-title">${prod.descripcion}</h3>
                            <p class="card-text">$${prod.precio},00</p>
                            <button id="agregar${prod.id}" class="botonAgregar">Agregar <i class="fa-sharp fa-solid fa-cart-arrow-down"></i></button>
                        </div>
                        `      

        if(prod.seccion === "cereal"){
            contenedorProductosCereal.appendChild(div);

        } else if (prod.seccion === "dulces"){
            contenedorProductosDulces.appendChild(div);

        } else if(prod.seccion === "infusiones"){
            contenedorProductosInfusiones.appendChild(div);

        } else if(prod.seccion === "lacteos"){
            contenedorProductosLacteos.appendChild(div);

        }; 
        
        //aca configuro el boton "agregar" al carrito
        const boton = document.getElementById(`agregar${prod.id}`);

        boton.addEventListener("click", () => {
            agregarcarrito(prod.id);    
        })

    });
}


//Defino mis funciones principales para gestionar la funcionalidad del carro de compras
const agregarcarrito = (prodId) => {

    const existeProducto = carritoCompras.some(prod => prod.id === prodId);
    if(existeProducto){
        const prod = carritoCompras.map(prod => {
            if(prod.id === prodId){
            prod.cantidad++
            }
        })
    } else {

        const item = listaDeProductos.find((prod) => prod.id === prodId);
        carritoCompras.push(item);
        console.log(carritoCompras);
    }

    actualizarCarrito();
}

const eliminarDelCarrito = (prodId) => {
    const item = carritoCompras.find((prod) => prod.id === prodId);

    if  (item.cantidad == 1){  
        const indice = carritoCompras.indexOf(item);
        carritoCompras.splice(indice, 1);

    } else {
        item.cantidad--;
       
    }

    actualizarCarrito();
}

botonVaciar.addEventListener("click", ()=> {
    //let confirm = confirm("Desea vaciar el Carro de compras?"); NO SE USA DE ESTE MODO. ERROR SEMANTICO.

    if(confirm){
        carritoCompras.length = 0;
        actualizarCarrito();    
    }
})

const actualizarCarrito = () => {

    contenedorCarrito.innerHTML = "";

    carritoCompras.forEach( (prod) => {
        const div = document.createElement("div");
        div.className = ("productoEnCarrito");
        div.innerHTML = `
                        <p>${prod.descripcion}</p>
                        <p>Precio: $${prod.precio},00</p>
                        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
                        <button onclick ="eliminarDelCarrito(${prod.id})" class="botonEliminar"></button>
                        `
        contenedorCarrito.appendChild(div);

    })

    contadorCarrito.innerText = carritoCompras.length;

    precioTotal.innerText = carritoCompras.reduce((acc, prod) => (acc + prod.precio*prod.cantidad), 0);

    localStorage.setItem("claveCarrito", JSON.stringify(carritoCompras));
}


