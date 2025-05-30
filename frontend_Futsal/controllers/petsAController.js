let currentPage = 1;
const itemsPerPage = 3;

function filterPets(status) {
    const petItems = document.querySelectorAll('.pet-item');
    petItems.forEach(item => {
        if (item.getAttribute('data-status') === status || status === 'all') {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
    paginate();
}

function paginate() {
    const petItems = document.querySelectorAll('.pet-item');
    const totalItems = petItems.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    petItems.forEach((item, index) => {
        if (index < (currentPage - 1) * itemsPerPage || index >= currentPage * itemsPerPage) {
            item.style.display = 'none';
        } else {
            item.style.display = 'flex';
        }
    });

    document.getElementById('pagination').style.display = totalPages > 1 ? 'block' : 'none';
}

function nextPage() {
    currentPage++;
    paginate();
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        paginate();
    }
}

// Inicializar la paginación al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    paginate();
});