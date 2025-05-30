// script.js
document.getElementById('logoutBtn').addEventListener('click', function(event) {
    event.preventDefault(); // Evita la redirección inmediata
    document.getElementById('logoutModal').style.display = 'flex';
});

document.getElementById('confirmLogoutBtn').addEventListener('click', function() {
    // Redirige al usuario a la página de inicio (index.html)
    window.location.href = 'index.html';
});

document.getElementById('cancelLogoutBtn').addEventListener('click', function() {
    document.getElementById('logoutModal').style.display = 'none';
});