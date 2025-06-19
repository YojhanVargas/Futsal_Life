document.addEventListener("DOMContentLoaded", function() {

    // --- SECCIÓN 1: DECLARACIÓN DE VARIABLES DEL DOM ---
    
    // Contenedores y Cajas Traseras (para la animación)
    const contenedor_login_register = document.querySelector(".contenedor__login-register");
    const caja_trasera_login = document.querySelector(".caja__trasera-login");
    const caja_trasera_register = document.querySelector(".caja__trasera-register");

    // Formularios
    const formulario_login = document.getElementById("login-form");
    const formulario_register = document.getElementById("register-form"); 

    // Divs para mostrar errores
    const loginErrorMessageDiv = document.getElementById('login-error-message');
    const registerErrorMessageDiv = document.getElementById('register-error-message');

    // Botones para cambiar entre vistas
    const btn_iniciar_sesion = document.getElementById("btn__iniciar-sesion");
    const btn_registrarse = document.getElementById("btn__registrarse");
    
    // Nuevas variables para la lógica de categoría
    const rolSelector = document.getElementById('register-rol');
    const categoriaContainer = document.getElementById('categoria-container');
    const categoriaSelector = document.getElementById('register-categoria');


    // --- SECCIÓN 2: LÓGICA DE ANIMACIÓN (MOSTRAR/OCULTAR FORMULARIOS) ---

    function iniciarSesionVista() {
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

    function registerVista() {
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
    
    function anchoPage() {
        if (window.innerWidth > 850) {
            caja_trasera_register.style.display = "block";
            caja_trasera_login.style.display = "block";
        } else {
            caja_trasera_register.style.display = "block";
            caja_trasera_register.style.opacity = "1";
            caja_trasera_login.style.display = "none";
            formulario_login.style.display = "block";
            formulario_register.style.display = "none";
            contenedor_login_register.style.left = "0px";
        }
    }
    
    // Asignar los eventos a los botones de la animación y al cambio de tamaño
    btn_iniciar_sesion.addEventListener("click", iniciarSesionVista);
    btn_registrarse.addEventListener("click", registerVista);
    window.addEventListener("resize", anchoPage);
    
    // Ejecutar las funciones iniciales para establecer el estado correcto
    anchoPage();
    iniciarSesionVista(); 


    // --- SECCIÓN 3: LÓGICA CONDICIONAL DE CATEGORÍA ---

    // Escuchamos el evento 'change' en el selector de rol
    rolSelector.addEventListener('change', function() {
        const selectedRol = this.value; // 'this' se refiere a rolSelector

        // Si el rol es Jugador (valor '2') o Acudiente (valor '3')
        if (selectedRol === '2' || selectedRol === '3') {
            categoriaContainer.style.display = 'block'; // Mostramos el contenedor de categoría
            categoriaSelector.required = true; // Hacemos que la categoría sea obligatoria
        } else {
            categoriaContainer.style.display = 'none'; // Ocultamos el contenedor
            categoriaSelector.required = false; // Ya no es obligatoria
            categoriaSelector.value = ''; // Reseteamos su valor
        }
    });


    // --- SECCIÓN 4: LÓGICA DE CONEXIÓN CON EL BACKEND ---

    // -- CONEXIÓN DEL FORMULARIO DE LOGIN --
    formulario_login.addEventListener('submit', async function (e) {
        e.preventDefault();
        loginErrorMessageDiv.textContent = '';
        const Correo = document.getElementById('login-email').value;
        const Contraseña = document.getElementById('login-password').value;

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Correo, Contraseña })
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.mensaje);
                localStorage.setItem('token', data.token);
                localStorage.setItem('usuario', JSON.stringify(data.usuario));
                if (data.usuario.rol === 1) window.location.href = 'indexEntrenador.html';
                else if (data.usuario.rol === 2) window.location.href = 'indexJugador.html';
            } else {
                loginErrorMessageDiv.textContent = data.mensaje;
            }
        } catch (error) {
            loginErrorMessageDiv.textContent = 'Error de conexión con el servidor.';
        }
    });

    // -- CONEXIÓN DEL FORMULARIO DE REGISTRO --
    formulario_register.addEventListener('submit', async function (e) {
        e.preventDefault();
        registerErrorMessageDiv.textContent = '';

        const Nombre = document.getElementById('register-nombre').value;
        const Apellido = document.getElementById('register-apellido').value;
        const Correo = document.getElementById('register-email').value;
        const Direccion = document.getElementById('register-direccion').value;
        const Telefono = document.getElementById('register-telefono').value;
        const Contraseña = document.getElementById('register-password').value;
        const Id_Rol = rolSelector.value;
        
        const datosAEnviar = { Nombre, Apellido, Correo, Direccion, Telefono, Contraseña, Id_Rol };

        if (categoriaContainer.style.display === 'block') {
            const Id_Categoria = categoriaSelector.value;
            if (!Id_Categoria) {
                registerErrorMessageDiv.textContent = 'Por favor, selecciona una categoría.';
                return;
            }
            datosAEnviar.Id_Categoria = Id_Categoria;
        }

        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosAEnviar)
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.mensaje);
                iniciarSesionVista(); 
            } else {
                registerErrorMessageDiv.textContent = data.mensaje;
            }
        } catch (error) {
            registerErrorMessageDiv.textContent = 'Error de conexión con el servidor.';
        }
    });
});

// Función global para el onclick del HTML
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
    } else {
        input.type = 'password';
    }
}