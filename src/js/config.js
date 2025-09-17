// src/js/config.js
const isGitHubPages = window.location.hostname.includes('github.io');
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export const CONFIG = {
  basePath: isGitHubPages ? '/kodyan-care/' : '/',
  isProduction: !isLocal,
  version: 'v=' + (isGitHubPages ? Date.now() : 'dev')
};

export const getResourcePath = (resource) => `${CONFIG.basePath}recursos/${resource}`;
export const getCssPath = () => `${CONFIG.basePath}css/style.css?${CONFIG.version}`;
export const getJsPath = () => `${CONFIG.basePath}js/script.js`;
