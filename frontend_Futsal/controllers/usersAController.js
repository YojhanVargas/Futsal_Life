// usersAController.js

// Simulación de datos de usuarios
const users = [
    { id: 1, name: 'Carlos Pérez', email: 'carlos@example.com', role: 'Usuario', status: 'Activo' },
    { id: 2, name: 'Ana Gómez', email: 'ana@example.com', role: 'Administrador', status: 'Inactivo' },
    { id: 3, name: 'Juan Rodríguez', email: 'juan@example.com', role: 'Usuario', status: 'Activo' },
    { id: 4, name: 'María López', email: 'maria@example.com', role: 'Usuario', status: 'Inactivo' },
];

// Función para cargar los usuarios en la tabla
function loadUsers() {
    const userTableBody = document.getElementById('userTableBody');
    userTableBody.innerHTML = ''; // Limpiar la tabla antes de agregar los datos

    users.forEach(user => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>${user.status}</td>
            <td class="action-buttons">
                <button class="edit-btn" onclick="editUser(${user.id})">Editar</button>
                <button class="activate-btn" onclick="activateUser(${user.id})">Activar</button>
                <button class="inactivate-btn" onclick="inactivateUser(${user.id})">Inactivar</button>
            </td>
        `;

        userTableBody.appendChild(row);
    });
}

// Función para editar un usuario
function editUser(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        const newName = prompt('Editar nombre:', user.name);
        const newEmail = prompt('Editar email:', user.email);
        if (newName) user.name = newName;
        if (newEmail) user.email = newEmail;
        loadUsers(); // Recargar la tabla con los datos actualizados
    }
}

// Función para activar un usuario
function activateUser(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        user.status = 'Activo';
        loadUsers(); // Recargar la tabla con los datos actualizados
    }
}

// Función para inactivar un usuario
function inactivateUser(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        user.status = 'Inactivo';
        loadUsers(); // Recargar la tabla con los datos actualizados
    }
}

// Cargar los usuarios al iniciar la página
document.addEventListener('DOMContentLoaded', loadUsers);