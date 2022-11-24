
const divProductosDestacados = document.querySelector("#productosDestacados");

document.addEventListener("DOMContentLoaded", () => {
   
   //filtra lista total de productos y arma destacados 
    cargarProductosDestacados();  
})


function cargarProductosDestacados(){
   divProductosDestacados.innerHTML = "";

   fetch("./js/listadeproductos.json")
    .then( (resp) => resp.json() )
    .then( (data) => {
        let destacados = data.filter(pd => pd.destacado == 1)

        if (destacados.lenght === 0){
            cajaDeMensajes("En este momento no tenemos productos destacados");
     
        }else{
            destacados.forEach(producto => {
     
                let prod = document.createElement("div");
                prod.classList.add("tarjeta");
                prod.setAttribute("id","Codigo_"+producto.id);
     
                prod.innerHTML = `
                                <div class="card animacionCard">
                                    <img src="./${producto.img}" class="card-img-top"></img>
                                    <h3 class="h3Index">${producto.descripcion}</h3>
                                    <p class="card-text">$${producto.precio}</p>
                                </div>
                                `
                divProductosDestacados.appendChild(prod);                                              
            });
        }
    })
}


function cajaDeMensajes(msj){
   const cajaMsj = document.querySelector("#cajaMsj");
   cajaMsj.innerHTML = msj;
}