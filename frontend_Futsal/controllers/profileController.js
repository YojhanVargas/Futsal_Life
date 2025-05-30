document.getElementById("edit-profile-button").addEventListener("click", function() {
    document.getElementById("profile-container").style.display = "none";
    document.getElementById("edit-profile-container").style.display = "block";
});

document.getElementById("edit-profile-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Obtener valores actualizados del formulario
    const updatedName = document.getElementById("name").value;
    const updatedAge = document.getElementById("age").value;
    const updatedEmail = document.getElementById("email").value;
    const updatedPhone = document.getElementById("phone").value;
    const updatedAddress = document.getElementById("address").value;
    const updatedPetPreference = document.getElementById("pet-preference").value;

    // Actualizar imagen de perfil si se selecciona una nueva
    const profilePicInput = document.getElementById("profile-pic-input");
    if (profilePicInput.files && profilePicInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("profile-pic").src = e.target.result;
        };
        reader.readAsDataURL(profilePicInput.files[0]);
    }

    // Actualizar el perfil con los nuevos datos
    document.getElementById("profile-name").innerText = updatedName;
    document.getElementById("profile-age").innerText = updatedAge;
    document.getElementById("profile-email").innerText = updatedEmail;
    document.getElementById("profile-phone").innerText = updatedPhone;
    document.getElementById("profile-address").innerText = updatedAddress;
    document.getElementById("profile-pet-preference").innerText = updatedPetPreference;

    // Volver a mostrar el perfil y ocultar el formulario de edición
    document.getElementById("profile-container").style.display = "block";
    document.getElementById("edit-profile-container").style.display = "none";

    document.addEventListener('DOMContentLoaded', function() {
        // Supongamos que la URL de la foto de perfil del usuario se guarda en una variable o se obtiene de una API.
        // Aquí, por simplicidad, la URL de la foto de perfil está hardcodeada.
        var userProfilePicUrl = '../css/image/default-profile.png'; // Reemplaza con la URL real
    
        // Obtén el elemento del ícono del perfil en el header
        var profileIcon = document.getElementById('header-profile-icon');
    
        // Actualiza el src del ícono con la URL de la foto del perfil del usuario
        profileIcon.src = userProfilePicUrl;
    });
});