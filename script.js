
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
        alert("Presione F5 o actualice la pagina para intentarlo nuevamente")

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

if(preguntar){
    loguearse();

}else {
    
    let cliente_activo = false;

    while(cliente_activo === false){

        let nombre = prompt ("Ingrese su nombre");
        let mail = prompt ("Ingrese su email");

        if(nombre === null || mail === null){
            cliente_activo = true;

        }else{

            if( nombre === "" || mail === ""){
                alert("Los datos ingresados no son validos");

            }else{

                alert("Felicitaciones, tu cuenta fue creada exitosamente!\nTus datos de acceso son:\n"+"USUARIO: "+ usuario_login+"\n"+"CONTRASENA: "+pass_login);
                cliente_activo = true;
            }
        }
    }
}