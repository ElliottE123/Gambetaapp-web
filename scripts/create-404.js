import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the built index.html
const indexPath = path.join(__dirname, '../dist/index.html');
const indexContent = fs.readFileSync(indexPath, 'utf8');

// Simply copy index.html to 404.html
// GitHub Pages will serve 404.html for any 404, and React Router will handle routing
const outputPath = path.join(__dirname, '../dist/404.html');
fs.writeFileSync(outputPath, indexContent);

console.log('404.html created (identical to index.html)');
