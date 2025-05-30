// Animación de sacudida en los íconos sociales
document.querySelectorAll('.social-icons a').forEach(icon => {
    icon.addEventListener('mouseover', () => {
        icon.style.animation = 'shake 0.5s';
    });
    icon.addEventListener('animationend', () => {
        icon.style.animation = '';
    });
});

// Definición de la animación sacudida
const style = document.createElement('style');
style.innerHTML = `
@keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
}`;
document.head.appendChild(style);
