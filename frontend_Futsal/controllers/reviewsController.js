function openReviewModal() {
    // Verificar si el usuario ha iniciado sesión
    if (!isUserAuthenticated()) {
        Swal.fire({
            icon: 'warning',
            title: '¡Atención!',
            text: 'Por favor, inicie sesión para agregar una reseña.',
            confirmButtonText: 'Ir a Iniciar Sesión',
            showCloseButton: true, // Muestra el botón de cierre
            closeButtonHtml: '×', // Puedes personalizar el símbolo aquí si lo deseas
            customClass: {
                closeButton: 'swal2-close-button' // Puedes agregar clases personalizadas si deseas
            }
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '../views/login.html'; // Redirigir a la página de login
            }
        });
        return;
    }
    document.getElementById('review-modal').style.display = 'block';
}


function closeReviewModal() {
    document.getElementById('review-modal').style.display = 'none';
}

// Cerrar el modal al hacer clic fuera de él
window.onclick = function(event) {
    var modal = document.getElementById('review-modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

function isUserAuthenticated() {
    // Aquí deberías implementar la lógica real de verificación de sesión
    // Puede ser mediante un token en localStorage, sesión de PHP, etc.
    // Este es solo un ejemplo simplificado.
    return localStorage.getItem('userLoggedIn') === 'true';
}