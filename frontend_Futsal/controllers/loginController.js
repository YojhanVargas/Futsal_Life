// Ejecutando funciones
document.getElementById("btn__iniciar-sesion").addEventListener("click", iniciarSesion);
document.getElementById("btn__registrarse").addEventListener("click", register);
window.addEventListener("resize", anchoPage);

// Asegurarse de que el formulario de inicio de sesión se muestre inicialmente
document.addEventListener("DOMContentLoaded", function() {
    iniciarSesion(); // Llamar a la función de iniciar sesión al cargar la página
});

// Declarando variables
var formulario_login = document.querySelector(".formulario__login");
var formulario_register = document.querySelector(".formulario__register");
var contenedor_login_register = document.querySelector(".contenedor__login-register");
var caja_trasera_login = document.querySelector(".caja__trasera-login");
var caja_trasera_register = document.querySelector(".caja__trasera-register");

// FUNCIONES

function anchoPage() {
    if (window.innerWidth > 850) {
        caja_trasera_register.style.display = "block";
        caja_trasera_login.style.display = "block";
    } else {
        caja_trasera_register.style.display = "block";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.display = "none";
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_register.style.display = "none";
    }
}

anchoPage();

function iniciarSesion() {
    if (window.innerWidth > 850) {
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "10px";
        formulario_register.style.display = "none";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.opacity = "0";
    } else {
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_register.style.display = "none";
        caja_trasera_register.style.display = "block";
        caja_trasera_login.style.display = "none";
    }
}

function register() {
    if (window.innerWidth > 850) {
        formulario_register.style.display = "block";
        contenedor_login_register.style.left = "410px";
        formulario_login.style.display = "none";
        caja_trasera_register.style.opacity = "0";
        caja_trasera_login.style.opacity = "1";
    } else {
        formulario_register.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_login.style.display = "none";
        caja_trasera_register.style.display = "none";
        caja_trasera_login.style.display = "block";
        caja_trasera_login.style.opacity = "1";
    }
}
// Función para alternar la visibilidad de la contraseña
function togglePassword(inputId) {
   var input = document.getElementById(inputId);
   if (input.type === "password") {
       input.type = "text";
   } else {
       input.type = "password";
   }
}


function validarFormularioLogin() {
    const rol = document.getElementById('login-rol').value;

    if (rol === "entrenador") {
        window.location.href = "index_entrenador.html";
    } else if (rol === "jugador") {
        window.location.href = "index_jugador.html";
    } else if (rol === "acudiente") {
        window.location.href = "index_acudiente.html";
    }
    return false; // Evita que el formulario se envíe
}

function validarFormularioRegistro() {
    const rol = document.getElementById('register-rol').value;

    if (rol === "entrenador") {
        window.location.href = "index_entrenador.html";
    } else if (rol === "jugador") {
        window.location.href = "index_jugador.html";
    } else if (rol === "acudiente") {
        window.location.href = "index_acudiente.html";
    }
    return false; // Evita que el formulario se envíe
}

// Función para mostrar/ocultar contraseña
function togglePassword(inputId) {
   const input = document.getElementById(inputId);
   if (input.type === 'password') {
       input.type = 'text';
   } else {
       input.type = 'password';
   }
}