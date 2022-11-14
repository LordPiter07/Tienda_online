
document.addEventListener("DOMContentLoaded", () => {
   carroCompras = JSON.parse(localStorage.getItem("iniciarCarro")) || [];

   //filtra lista total de productos y arma destacados 
   let productosDestacados = listaDeProductos.filter(pd => pd.destacado == 1); 
   this.publicarProductosDestacados(productosDestacados);  

})


function publicarProductosDestacados(productos){
   const divProductosDestacados = document.querySelector("#productosDestacados");
   divProductosDestacados.innerHTML = "";

   if (productos.lenght === 0){
       this.cajaDeMensajes("En este momento no tenemos productos destacados");

   }else{
       productos.forEach(producto => {

           let prod = document.createElement("div");
           prod.classList.add("tarjeta");
           prod.setAttribute("id","Codigo_"+producto.id);

           prod.innerHTML = `
                           <div class="card animacionCard">
                               <img src="./${producto.img}" class="card-img-top"></img>
                               <h3 class="h3Index">${producto.descripcion}</h3>
                               <p class="card-text">$${producto.precio}</p>
                               <button id="agregar${producto.id}" class="botonAgregar">Agregar <i class="fa-sharp fa-solid fa-cart-arrow-down"></i></button>
                           </div>
                           `
           divProductosDestacados.appendChild(prod);
                                          
       });
   }
}

// metodo de la clase gestorProductos que muestra mensajes dinamicos dentro del DIV "Productos destacados"
function cajaDeMensajes(msj){
   const cajaMsj = document.querySelector("#cajaMsj");
   cajaMsj.innerHTML = msj;
}
