import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the built index.html
const indexPath = path.join(__dirname, '../dist/index.html');
const indexContent = fs.readFileSync(indexPath, 'utf8');

// Create 404.html with redirect script
const redirectScript = `
    <script>
      // Single Page Apps for GitHub Pages - Redirect to index.html with path in query string
      var pathSegmentsToKeep = 0;
      var l = window.location;
      if (l.pathname !== '/' && !l.pathname.startsWith('/assets/') && !l.pathname.startsWith('/images/')) {
        l.replace(
          l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
          '/?/' +
          l.pathname.slice(1).split('/').join('/').replace(/&/g, '~and~') +
          (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
          l.hash
        );
      }
    </script>`;

// Insert the redirect script right after the viewport meta tag
const viewportRegex = /(<meta name="viewport"[^>]*>)/;
const updatedContent = indexContent.replace(viewportRegex, `$1${redirectScript}`);

// Write 404.html
const outputPath = path.join(__dirname, '../dist/404.html');
fs.writeFileSync(outputPath, updatedContent);

console.log('404.html created with redirect script');
