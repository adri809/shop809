// Configuración inicial de imágenes
const images = {
    duki: ["duki-shirt1.PNG"],
    mora: ["mora-shirt1.PNG"]
};

// Estado inicial
const currentIndex = {
    duki: 0,
    mora: 0
};
// Contador de cuenta regresiva
function startCountdown() {
    const countdownElement = document.getElementById('countdown-timer');

    // Intentar obtener la fecha objetivo de localStorage
    let targetDate = localStorage.getItem('targetDate');

    if (targetDate) {
        targetDate = new Date(targetDate); // Si existe, usarla
    } else {
        targetDate = new Date(); // Si no, crear nueva fecha objetivo
        targetDate.setDate(targetDate.getDate() + 7);
        localStorage.setItem('targetDate', targetDate); // Guardarla en localStorage
    }

    function updateCountdown() {
        const now = new Date();
        let diff = targetDate - now;

        if (diff <= 0) {
            // Si el tiempo se agota, reiniciar el contador y guardar la nueva fecha
            targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + 7);
            localStorage.setItem('targetDate', targetDate);
            diff = targetDate - now; // Actualizar la diferencia
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    }

    // Actualizar cada segundo
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Llamada inicial
}

// Contador de camisas vendidas
let shirtsSold = 0;

function incrementShirtsSold() {
    shirtsSold++;
    document.getElementById('sold-count').textContent = shirtsSold;
}

// Inicializar contadores
document.addEventListener('DOMContentLoaded', () => {
    startCountdown();
    setInterval(incrementShirtsSold, 5000); // Simula una venta cada 5 segundos
});
// Función para cambiar la imagen
function changeImage(artist, direction) {
    // Calcular el nuevo índice
    const totalImages = images[artist].length;
    currentIndex[artist] = (currentIndex[artist] + direction + totalImages) % totalImages;

    // Actualizar la imagen en el carrusel
    const imgElement = document.getElementById(artist);
    imgElement.src = images[artist][currentIndex[artist]];
}

// Inicializar imágenes al cargar la página
window.onload = () => {
    Object.keys(images).forEach(artist => {
        const imgElement = document.getElementById(artist);
        if (imgElement) {
            imgElement.src = images[artist][0]; // Primera imagen de cada artista
        }
    });
};
