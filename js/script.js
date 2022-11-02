const contenedorProductosCereal = document.getElementById("seccion-cereales");
const contenedorProductosDulces = document.getElementById("seccion-dulces");
const contenedorProductosInfusiones = document.getElementById("seccion-infusiones");
const contenedorProductosLacteos = document.getElementById("seccion-lacteos");

let productosCereales = productos.filter(producto => producto.seccion === "cereal");
publicarPoductos(productosCereales);

let productosDulces = productos.filter(producto => producto.seccion === "dulces");
publicarPoductos(productosDulces);

let productosInfusiones = productos.filter(producto => producto.seccion === "infusiones");
publicarPoductos(productosInfusiones);

let productosLacteos = productos.filter(producto => producto.seccion === "lacteos");
publicarPoductos(productosLacteos);


function publicarPoductos(productos) {
    productos.forEach(prod => {
        const div = document.createElement("div");
        div.classList.add("card", "col-3", "tarjeta");
        div.setAttribute("style","width: 10rem;")
        div.innerHTML = `
                        <img src="../${prod.img}" class="card-img-top"  alt="">
                        <div class="card-body">
                            <h3 class="card-title">${prod.descripcion}</h3>
                            <p class="card-text">$${prod.precio}</p>
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

        }
    });
}
