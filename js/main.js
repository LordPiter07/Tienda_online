let carroCompras = new Array();

const claveCarro = "iniciarCarro";

let gestor;

document.addEventListener("DOMContentLoaded", () => {
   carroCompras = JSON.parse(localStorage.getItem("iniciarCarro")) || [];

   gestor = new gestorProductos();
   gestor.iniciar();

})