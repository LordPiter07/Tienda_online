
alert("Para realizar compras debes Loguearte");

const usuario_login = "acceso";
const pass_login = "1234";


function loguearse(){
    let usuario = prompt("Usuario:");
    let pass = prompt("Contrasena:");

    if(validacion_login(usuario,pass)){

        alert("Bienvenido a tienda Online, ya podes realizar tus compras");

    }else{

        alert("Los datos Ingresados no son correctos");
        alert("Presione F5 o actualice la pagina para intentarlo nuevamente");
    }
}
   
function validacion_login(usuario,pass){

    if(usuario === usuario_login && pass === pass_login) {
        return true;

    }else{
        return false;
    }
}


let preguntar = confirm("Ya te encuentras Registrado?");
let cliente_activo = false;

if(preguntar){
    loguearse();

}else {
    
    while(cliente_activo === false){

        let nombre = prompt("Ingrese su nombre");
        let mail = prompt("Ingrese su email");
        let pass_nueva = prompt("Ingrese su nueva Contraseña");

        if(nombre === null || mail === null || pass_nueva === null){
            cliente_activo = true;

        }else{

            if( nombre === "" || mail === "" || pass_nueva === ""){
                alert("Los datos ingresados no son validos");

            }else{

                const usuario1 = new Crear_usuario(nombre, mail, pass_nueva);

                alert("Felicitaciones, tu cuenta fue creada exitosamente!\nTus datos de acceso son:\n"+"USUARIO: "+ mail+"\n"+"CONTRASENA: "+pass_nueva);
                cliente_activo = true;
            }
        }
    }
}

let array_lista = new Array();
let lista_de_compras = true;

if(cliente_activo){

    let i = 0;

    while(lista_de_compras){

            array_lista[i] = prompt("Que desea comprar?");

            if(array_lista[i] == null){
                lista_de_compras = false;

            }else {
            alert("Agrego con exito: "+array_lista[i]);
            i += 1;
            }

            let seguir_comprando = confirm("Desea seguir comprando?");

            if(seguir_comprando == false){
                lista_de_compras = false;
                alert("Pagar productos:\n"+array_lista);
            }
        }
    }


 
function Crear_usuario (nombre, mail, pass_nueva){
    this.nombre = nombre,
    this.user = mail,
    this.pass = pass_nueva;
}

    


