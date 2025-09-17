// js/components/Footer.js
class FooterComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <footer>
                <div class="container">
                    <div class="footer-content">
                        <div class="footer-about">
                            <a href="/" class="footer-logo">Kodyan Care</a>
                            <p>Tu puerto seguro para tormentas emocionales.</p>
                        </div>
                        
                        <div class="footer-links">
                            <h4>Herramientas</h4>
                            <ul>
                                <li><a href="/herramientas/anclaje.html">Técnicas de Anclaje</a></li>
                                <li><a href="/herramientas/descarga.html">Descarga Rápida</a></li>
                                <li><a href="/herramientas/audio.html">Espacio Seguro</a></li>
                            </ul>
                        </div>
                        
                        <div class="footer-links">
                            <h4>Recursos</h4>
                            <ul>
                                <li><a href="/herramientas/emergencia.html">Líneas de Crisis</a></li>
                                <li><a href="/herramientas/guias.html">Guías Rápidas</a></li>
                                <li><a href="/#regulacion">Regulación Emocional</a></li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="copyright">
                        <p><strong>💡 Importante:</strong> Esto no es un substituto de terapia profesional.</p>
                        <p>&copy; 2025 Kodyan Care. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('footer-component', FooterComponent);
