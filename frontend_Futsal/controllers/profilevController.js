document.addEventListener('DOMContentLoaded', function() {
    const profileContainer = document.getElementById('profile-container');
    const editProfileContainer = document.getElementById('edit-profile-container');
    const editProfileButton = document.getElementById('edit-profile-button');
    const profilePic = document.getElementById('profile-pic');
    const profileName = document.getElementById('profile-name');
    const profileEmail = document.getElementById('profile-email');
    const profilePhone = document.getElementById('profile-phone');
    const profileAddress = document.getElementById('profile-address');

    const editProfileForm = document.getElementById('edit-profile-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const addressInput = document.getElementById('address');

    // Mostrar el formulario de edición de perfil
    editProfileButton.addEventListener('click', function() {
        profileContainer.style.display = 'none';
        editProfileContainer.style.display = 'block';
    });

    // Manejar el envío del formulario de edición
    editProfileForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el comportamiento por defecto del formulario

        // Actualizar la información del perfil
        profileName.textContent = nameInput.value;
        profileEmail.textContent = emailInput.value;
        profilePhone.textContent = phoneInput.value;
        profileAddress.textContent = addressInput.value;


        // Ocultar el formulario de edición y mostrar el perfil actualizado
        editProfileContainer.style.display = 'none';
        profileContainer.style.display = 'block';
    });

    // Actualizar la imagen de perfil al seleccionar un nuevo archivo
    const profilePicInput = document.getElementById('profile-pic-input');
    profilePicInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePic.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
});