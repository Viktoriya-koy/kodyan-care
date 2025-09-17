// build.js - Script para generar páginas automáticamente
const fs = require('fs');
const path = require('path');

const tools = [
    { 
        name: 'anclaje', 
        title: 'Técnicas de Anclaje',
        subtitle: 'Herramientas para grounding y conexión con el presente'
    },
    { 
        name: 'descarga', 
        title: 'Descarga Emocional',
        subtitle: 'Liberación segura de emociones intensas'
    },
    // ... agregar todas las herramientas
];

tools.forEach(tool => {
    const content = `
        <div class="tool-content">
            <h2>${tool.title}</h2>
            <p>${tool.subtitle}</p>
            <!-- Tu contenido específico aquí -->
        </div>
    `;

    const html = fs.readFileSync('herramientas/_base.html', 'utf8')
        .replace('{{TITLE}}', tool.title)
        .replace('{{TITULO_PRINCIPAL}}', tool.title)
        .replace('{{SUBTITULO}}', tool.subtitle)
        .replace('{{CONTENIDO}}', content);

    fs.writeFileSync(`herramientas/${tool.name}.html`, html);
});

console.log('✅ Todas las herramientas generadas automáticamente');
