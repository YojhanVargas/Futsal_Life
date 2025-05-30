const imagesContainer = document.querySelector('.carousel-images');
const images = document.querySelectorAll('.carousel-images img');
let index = 0;

function slideShow() {
    index++;
    if (index >= images.length) {
        index = 0;
    }
    imagesContainer.style.transform = `translateX(-${index * 100}%)`;
}

// Cambia de imagen automáticamente cada 3 segundos
setInterval(slideShow, 3000);
