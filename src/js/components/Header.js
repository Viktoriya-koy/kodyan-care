// js/components/Header.js
class HeaderComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <header>
                <div class="container header-container">
                    <a href="/" class="logo">
                        <img src="/resources/pulpo-logo.png" alt="Kodyan Care" class="logo-pulpo">
                        Kodyan Care
                    </a>
                    <nav>
                        <ul class="nav-links">
                            <li><a href="/#herramientas">Herramientas</a></li>
                            <li><a href="/#regulacion">Regulación</a></li>
                            <li><a href="/#recursos">Recursos</a></li>
                            <li><a href="/herramientas/emergencia.html" class="btn-emergencia">🚨 Emergencia</a></li>
                        </ul>
                    </nav>
                    <div class="hamburger" id="hamburger">
                        <i class="fas fa-bars"></i>
                    </div>
                </div>
            </header>
        `;
    }
}

customElements.define('header-component', HeaderComponent);
