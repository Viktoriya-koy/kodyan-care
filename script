// js/script.js - SISTEMA MODULAR MODERNO
// ===== CONFIGURACIÓN GLOBAL =====
const CONFIG = {
    basePath: '/',
    version: 'v=5',
    debug: true
};

// ===== CLASE PRINCIPAL DE LA APLICACIÓN =====
class KodyanApp {
    static init() {
        if (this.initialized) return;
        this.initialized = true;
        
        this.log('🐙 Kodyan Care - Sistema modular iniciado');
        this.setupGlobalErrorHandling();
        this.initComponents();
        this.setupEventListeners();
        this.handleScrollAnimations();
        this.initServiceWorker();
    }

    static log(message, data = null) {
        if (CONFIG.debug) {
            console.log(message, data || '');
        }
    }

    // ===== MANEJO DE ERRORES GLOBALES =====
    static setupGlobalErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('🐙 Error global:', e.error);
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('🐙 Promise rechazada:', e.reason);
        });
    }

    // ===== INICIALIZACIÓN DE COMPONENTES =====
    static initComponents() {
        // Cargar componentes dinámicamente
        this.loadComponent('Header');
        this.loadComponent('Footer');
    }

    static async loadComponent(componentName) {
        try {
            await import(`./components/${componentName}.js`);
            this.log(`✅ Componente ${componentName} cargado`);
        } catch (error) {
            console.warn(`⚠️ Componente ${componentName} no encontrado, usando HTML estático`);
        }
    }

    // ===== CONFIGURACIÓN DE EVENT LISTENERS =====
    static setupEventListeners() {
        // Hamburguesa menu
        document.addEventListener('click', (e) => {
            const hamburger = e.target.closest('#hamburger');
            if (hamburger) {
                this.toggleMobileMenu();
            }
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            const navLinks = document.querySelector('.nav-links');
            const hamburger = document.getElementById('hamburger');
            
            if (navLinks?.classList.contains('active') && 
                !e.target.closest('.nav-links') && 
                !e.target.closest('#hamburger')) {
                this.closeMobileMenu();
            }
        });

        // Smooth scroll para enlaces internos
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                this.smoothScroll(link.getAttribute('href'));
            }
        });

        // Resize debounced
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));
    }

    // ===== FUNCIONALIDADES ESPECÍFICAS =====
    static toggleMobileMenu() {
        const navLinks = document.querySelector('.nav-links');
        const hamburger = document.getElementById('hamburger');
        
        if (navLinks && hamburger) {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Toggle aria-expanded para accesibilidad
            const isExpanded = navLinks.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isExpanded);
        }
    }

    static closeMobileMenu() {
        const navLinks = document.querySelector('.nav-links');
        const hamburger = document.getElementById('hamburger');
        
        if (navLinks && hamburger) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    }

    static smoothScroll(targetId) {
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // ===== ANIMACIONES SCROLL =====
    static handleScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observar elementos para animación
        document.querySelectorAll('.tool-item, .regulacion-item, .section-title').forEach(item => {
            observer.observe(item);
        });
    }

    // ===== LAZY LOADING IMÁGENES =====
    static initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    
                    // Loaded event para transición suave
                    img.onload = () => {
                        img.style.opacity = '1';
                    };
                    
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            imageObserver.observe(img);
        });
    }

    // ===== SERVICE WORKER (PWA) =====
    static async initServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                this.log('🐙 ServiceWorker registrado:', registration.scope);
            } catch (error) {
                this.log('⚠️ ServiceWorker no registrado:', error);
            }
        }
    }

    // ===== RESPONSIVE HANDLING =====
    static handleResize() {
        if (this.isMobile()) {
            document.body.classList.add('mobile');
        } else {
            document.body.classList.remove('mobile');
            this.closeMobileMenu();
        }
    }

    // ===== UTILIDADES =====
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static isMobile() {
        return window.innerWidth <= 768;
    }

    static getResourcePath(resource) {
        return `${CONFIG.basePath}resources/${resource}`;
    }

    static getCssPath() {
        return `${CONFIG.basePath}css/style.css?${CONFIG.version}`;
    }
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    KodyanApp.init();
});

// ===== EXPORTAR PARA USO GLOBAL =====
window.KodyanApp = KodyanApp;
window.PathHelper = {
    getResource: (resource) => KodyanApp.getResourcePath(resource),
    getCss: () => KodyanApp.getCssPath()
};

// ===== POLYFILLS PARA COMPATIBILIDAD =====
// Intersection Observer polyfill para navegadores antiguos
if (!('IntersectionObserver' in window)) {
    import('intersection-observer').then(() => {
        console.log('📦 IntersectionObserver polyfill cargado');
    });
}
