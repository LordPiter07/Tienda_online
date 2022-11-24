
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
    cargarProductos();
})


//funcion encargada de tomar los array ya filtados segun seccion e inyectarlos en el html.
function cargarProductos() {

    fetch("../js/listadeproductos.json")
        .then( (resp) => resp.json() )
        .then( (data) => data.forEach(prod => {

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

        }));
}


//Defino mis funciones principales para gestionar la funcionalidad del carro de compras.

//avisa que el producto se agrego, corrobora que no exista y en caso afirmativo, suma una unidad en cantidad.
const agregarcarrito = (prodId) => {

    Toastify({
        text: "Se agrego el Producto con Exito",
        duration: 1000,
        className: "info",
        style: {
          background: "linear-gradient(to right, #393E46, #497174)",
        }
      }).showToast();

    const existeProducto = carritoCompras.some(prod => prod.id === prodId);
    if(existeProducto){
        const prod = carritoCompras.map(prod => {
            if(prod.id === prodId){
            prod.cantidad++
            }
        })
    } else {

        fetch("../js/listadeproductos.json")
            .then( (resp) => resp.json() )
            .then( (listaproductos) => {
                const item = listaproductos.find( (prod) => prod.id === prodId);
                carritoCompras.push(item);
                actualizarCarrito();
             })             
    }

    actualizarCarrito();
}

//quita el producto del array carritoCompras. En caso que existan varias unidades solo quita una.
const eliminarDelCarrito = (prodId) => {

    Swal.fire({
        title: 'Desea quitar el producto?',
        text: "Una unidad sera eliminada del Carrito",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, quitar'
        }).then((result) => {

            if (result.isConfirmed) {

                const item = carritoCompras.find((prod) => prod.id === prodId);
                if  (item.cantidad == 1){  
                    const indice = carritoCompras.indexOf(item);
                    carritoCompras.splice(indice, 1);
                } else {
                    item.cantidad--;     
                }

                Swal.fire(
                'Borrado',
                'Se elimino el producto',
                'success'
                )    
            }

            actualizarCarrito();
        })
}

// En caso de tener productos, vacia el array carritoCompras
botonVaciar.addEventListener("click", ()=> {

    if(carritoCompras.length == 0){
        Swal.fire({
            title: 'El carrito de compras se encuentra vacio',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
        })

    } else {

        Swal.fire({
            title: 'Desea Eliminar todos los productos?',
            text: "El carrito de compras quedara vacio",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
            }).then((result) => {

                if (result.isConfirmed) {

                    carritoCompras.length = 0;

                    Swal.fire(
                    'Se vacio el carrito',
                    )    
                }

                actualizarCarrito();
            })
        }
})


const actualizarCarrito = () => {

    contenedorCarrito.innerHTML = "";

    carritoCompras.forEach( (prod) => {
        const div = document.createElement("div");
        div.className = ("productoEnCarrito");
        div.innerHTML = `
                        <img src="../${prod.img}" alt="">
                        <p>${prod.descripcion}</p>
                        <p>Precio: $${prod.precio},00</p>
                        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
                        <button onclick ="eliminarDelCarrito(${prod.id})" class="botonEliminar"><i class="fa-solid fa-trash-can"></i></button>
                        `
        contenedorCarrito.appendChild(div);

    })

    // Contador del carro, suma total de productos y guardado local.
    contadorCarrito.innerText = carritoCompras.length;

    precioTotal.innerText = carritoCompras.reduce((acc, prod) => (acc + prod.precio*prod.cantidad), 0);

    localStorage.setItem("claveCarrito", JSON.stringify(carritoCompras));
}



//Finalizar compra

const buttonFinalizar = document.getElementById("btnFinalizar");
buttonFinalizar.addEventListener("click", () => {

    if(carritoCompras.length == 0){
        Swal.fire({
            title: 'El carrito de compras se encuentra vacio',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
        })
    } else {

        document.querySelector(".contenedorOrdenCompra").style.display ="flex";
        validarFormulario();
    }
})



const validarFormulario = () => {

    const forms = document.querySelectorAll('.needs-validation')

    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (form.checkValidity()) {
                Swal.fire({
                    icon: 'success',
                    title: 'Realizaste la compra!',
                    text: 'Un mail estara llegando a la casilla indicada con los pasos a seguir para recibir tus productos.',
                  }).then((result) => {
                    
                    form.submit();
                    carritoCompras.length = 0;
                    actualizarCarrito();
                  })          
            }

            event.preventDefault();
            form.classList.add('was-validated');    
                                 
        }, false)
    })
}


const buttonVolver = document.getElementById("btnSeguir");
buttonVolver.addEventListener("click", ()=> {
    document.querySelector(".contenedorOrdenCompra").style.display ="none";
})
