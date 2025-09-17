// build.js - SISTEMA PROFESIONAL DE BUILD
import fs from 'fs';
import path from 'path';

// Configuración
const CONFIG = {
  basePath: process.env.GITHUB_PAGES ? '/kodyan-care/' : '/',
  isProduction: process.env.NODE_ENV === 'production'
};

// Herramientas para generar
const tools = [
  { 
    name: 'anclaje', 
    title: 'Técnicas de Anclaje',
    subtitle: 'Herramientas para grounding y conexión con el presente',
    icon: '🧠'
  },
  { 
    name: 'descarga', 
    title: 'Descarga Emocional',
    subtitle: 'Liberación segura de emociones intensas',
    icon: '📝'
  },
  { 
    name: 'audio', 
    title: 'Espacio Seguro',
    subtitle: 'Sonidos y audios para calmar la mente',
    icon: '🎧'
  },
  { 
    name: 'sensorial', 
    title: 'Herramientas Sensoriales',
    subtitle: 'Recursos visuales y táctiles para regular emociones',
    icon: '🎨'
  },
  { 
    name: 'guias', 
    title: 'Guías Rápidas',
    subtitle: 'Pasos concretos para momentos difíciles',
    icon: '📋'
  },
  { 
    name: 'chat', 
    title: 'Chat de Apoyo',
    subtitle: 'Kody te acompaña en momentos difíciles',
    icon: '🐙'
  },
  { 
    name: 'emergencia', 
    title: 'Contactos de Emergencia',
    subtitle: 'Líneas de crisis y recursos de ayuda inmediata',
    icon: '🚨'
  }
];

// Plantilla base para herramientas
const BASE_HTML = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{TITLE}} | Kodyan Care</title>
    <link rel="stylesheet" href="{{CSS_PATH}}">
    <style>
        .herramienta-container {
            max-width: 800px;
            margin: 2rem auto;
            padding: 2rem;
        }
        {{STYLES}}
    </style>
</head>
<body>
    <header-component></header-component>
    
    <main class="herramienta-detalle">
        <div class="container">
            <h1>{{ICON}} {{TITLE}}</h1>
            <p class="subtitulo">{{SUBTITULO}}</p>
            
            <div class="herramienta-container">
                {{CONTENT}}
            </div>
        </div>
    </main>
    
    <footer-component></footer-component>
    
    <script type="module" src="{{JS_PATH}}"></script>
    {{SCRIPTS}}
</body>
</html>
`;

// Estilos específicos por herramienta
const TOOL_STYLES = {
  anclaje: `
    .tecnica {
      background: var(--color-secondary);
      padding: 1.5rem;
      border-radius: 10px;
      margin-bottom: 1.5rem;
    }
  `,
  descarga: `
    textarea {
      width: 100%;
      min-height: 200px;
      padding: 1rem;
      border: 2px solid var(--color-primary);
      border-radius: 10px;
      margin-bottom: 1.5rem;
    }
  `,
  chat: `
    .mensajes {
      height: 300px;
      overflow-y: auto;
      margin-bottom: 1rem;
      padding: 1rem;
      background: var(--color-secondary);
      border-radius: 10px;
    }
  `
};

// Contenido específico por herramienta
const TOOL_CONTENT = {
  anclaje: `
    <div class="tecnica">
      <h2>Técnica 5-4-3-2-1</h2>
      <p>5 cosas que ves, 4 que tocas, 3 que oyes, 2 que hueles, 1 que saboreas</p>
    </div>
    <div class="tecnica">
      <h2>Respiración Cuadrada</h2>
      <p>Inhalar 4s, mantener 4s, exhalar 4s, pausa 4s</p>
    </div>
  `,
  descarga: `
    <textarea placeholder="Escribí aquí todo lo que necesites sacar..."></textarea>
    <div class="opciones-destruccion">
      <button onclick="liberarTexto('desvanecer')">🌫️ Desvanecer</button>
      <button onclick="liberarTexto('estallar')">🔥 Estallar</button>
      <button onclick="liberarTexto('desintegrar')">🌪️ Desintegrar</button>
    </div>
  `,
  emergencia: `
    <div class="emergencia-item">
      <h3>📞 Argentina</h3>
      <ul>
        <li><strong>Línea 141</strong>: <a href="tel:141">141</a> (Suicidio)</li>
        <li><strong>Línea 135</strong>: <a href="tel:135">135</a> (Salud Mental)</li>
      </ul>
    </div>
  `
};

// Scripts específicos por herramienta
const TOOL_SCRIPTS = {
  descarga: `
    <script>
      function liberarTexto(tipo) {
        console.log('Liberando texto con:', tipo);
        // Tu código de liberación aquí
      }
    </script>
  `,
  chat: `
    <script>
      function enviarMensaje() {
        console.log('Mensaje enviado');
        // Tu código de chat aquí
      }
    </script>
  `
};

function build() {
  console.log('🚀 Building Kodyan Care...');
  
  // Crear dist si no existe
  if (!fs.existsSync('dist')) fs.mkdirSync('dist', { recursive: true });
  
  // 1. COPIAR ARCHIVOS ESTÁTICOS
  const copyDirs = ['css', 'js', 'recursos'];
  copyDirs.forEach(dir => {
    const srcPath = `src/${dir}`;
    const distPath = `dist/${dir}`;
    
    if (fs.existsSync(srcPath)) {
      if (fs.existsSync(distPath)) fs.rmSync(distPath, { recursive: true });
      fs.cpSync(srcPath, distPath, { recursive: true });
      console.log(`✅ Copiada carpeta: ${dir}`);
    }
  });
  
  // 2. COPIAR INDEX.HTML PRINCIPAL
  if (fs.existsSync('src/index.html')) {
    let indexHtml = fs.readFileSync('src/index.html', 'utf8');
    indexHtml = processHtml(indexHtml, '');
    fs.writeFileSync('dist/index.html', indexHtml);
    console.log('✅ Procesado index.html');
  }
  
  // 3. GENERAR HERRAMIENTAS AUTOMÁTICAMENTE
  if (!fs.existsSync('dist/herramientas')) {
    fs.mkdirSync('dist/herramientas', { recursive: true });
  }
  
  tools.forEach(tool => {
    const depth = 'herramientas/';
    const cssPath = `../css/style.css`;
    const jsPath = `../js/script.js`;
    
    const content = TOOL_CONTENT[tool.name] || `
      <div class="tool-content">
        <h2>${tool.title}</h2>
        <p>${tool.subtitle}</p>
        <p>Contenido en desarrollo...</p>
      </div>
    `;
    
    const styles = TOOL_STYLES[tool.name] || '';
    const scripts = TOOL_SCRIPTS[tool.name] || '';
    
    let html = BASE_HTML
      .replace('{{TITLE}}', tool.title)
      .replace('{{ICON}}', tool.icon)
      .replace('{{SUBTITULO}}', tool.subtitle)
      .replace('{{CONTENT}}', content)
      .replace('{{STYLES}}', styles)
      .replace('{{SCRIPTS}}', scripts)
      .replace('{{CSS_PATH}}', cssPath)
      .replace('{{JS_PATH}}', jsPath);
    
    // Ajustar rutas para producción
    if (CONFIG.isProduction) {
      html = html.replace(/\.\.\//g, CONFIG.basePath);
    }
    
    fs.writeFileSync(`dist/herramientas/${tool.name}.html`, html);
    console.log(`✅ Generada: herramientas/${tool.name}.html`);
  });
  
  console.log('🎉 Build completado!');
  console.log('📁 Archivos en: /dist/');
  console.log('🌐 Para probar local: npm run dev');
}

// Función para procesar HTML
function processHtml(content, relativePath) {
  const depth = relativePath.split('/').length;
  const prefix = depth > 0 ? '../'.repeat(depth) : './';
  
  return content
    .replace(/href="\.\.\/css\//g, `href="${prefix}css/`)
    .replace(/src="\.\.\/recursos\//g, `src="${prefix}recursos/`)
    .replace(/src="\.\.\/js\//g, `src="${prefix}js/`);
}

// Ejecutar build
build();
