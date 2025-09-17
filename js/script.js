// js/script.js - VERSIÓN SUPER SIMPLE
console.log('🐙 Kodyan Care cargado');

// Función para el menú mobile
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.getElementById('hamburger');
    
    if (navLinks && hamburger) {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    }
}

// Cerrar menú al hacer clic fuera
document.addEventListener('click', (e) => {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.getElementById('hamburger');
    
    if (navLinks?.classList.contains('active') && 
        !e.target.closest('.nav-links') && 
        !e.target.closest('#hamburger')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Smooth scroll para enlaces internos
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Todo cargado');
});
