import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read and parse the legal texts TypeScript file
const legalTextsPath = path.join(__dirname, '../src/constants/legalTexts.ts');
const legalTextsContent = fs.readFileSync(legalTextsPath, 'utf8');

// Extract the constants using regex
const effectiveDateMatch = legalTextsContent.match(/export const effectiveDate = ['"]([^'"]+)['"]/);
const privacyPolicyMatch = legalTextsContent.match(/export const privacyPolicy = `([\s\S]*?)`;/);
const termsOfServiceMatch = legalTextsContent.match(/export const termsOfService = `([\s\S]*?)`;/);

const effectiveDate = effectiveDateMatch ? effectiveDateMatch[1] : 'Effective: January 1, 2026 — GAMBETA LLC';
const privacyPolicy = privacyPolicyMatch ? privacyPolicyMatch[1].trim() : '';
const termsOfService = termsOfServiceMatch ? termsOfServiceMatch[1].trim() : '';

// Helper function to parse policy text into HTML (matches React component logic)
function parsePolicyToHTML(policyText) {
  const lines = policyText.split('\n');
  
  // Remove embedded TABLE OF CONTENTS (matches React component logic)
  const filtered = [];
  const start = lines.findIndex((l) => l.trim().toUpperCase() === 'TABLE OF CONTENTS');
  if (start !== -1) {
    let end = -1;
    for (let j = start + 1; j < lines.length; j++) {
      if (lines[j].trim() === '') {
        end = j;
        break;
      }
    }
    if (end !== -1) {
      filtered.push(...lines.slice(0, start), ...lines.slice(end + 1));
    } else {
      filtered.push(...lines.slice(0, start));
    }
  } else {
    filtered.push(...lines);
  }
  
  // Parse blocks (matches React component logic)
  const TOP_HEADING_REGEX = /^\d+\.\s+(.+)$/;
  const ALL_CAPS_HEADING = /^[A-Z0-9 '()-]+$/;
  const blocks = [];
  const toc = [];
  
  let i = 0;
  while (i < filtered.length) {
    const line = filtered[i].trimEnd();
    
    // skip empty lines
    if (line.trim() === '') {
      i++;
      continue;
    }
    
    // Top-level numbered heading
    const topMatch = line.match(TOP_HEADING_REGEX);
    if (topMatch) {
      const text = line;
      const id = makeId(text + '-' + i);
      blocks.push({ type: 'h2', text, id });
      toc.push({ id, text });
      i++;
      continue;
    }
    
    // ALL CAPS headings (short)
    if (line.length > 3 && line === line.toUpperCase() && ALL_CAPS_HEADING.test(line)) {
      const text = line;
      const id = makeId(text + '-' + i);
      blocks.push({ type: 'h3', text, id });
      i++;
      continue;
    }
    
    // Bullet list starting with • or - or *
    if (/^[•\-*]\s+/.test(line)) {
      const items = [];
      while (i < filtered.length && /^[•\-*]\s+/.test(filtered[i].trim())) {
        items.push(filtered[i].trim().replace(/^[•\-*]\s+/, ''));
        i++;
      }
      blocks.push({ type: 'ul', items });
      continue;
    }
    
    // Otherwise, consume consecutive non-empty non-list lines into a paragraph
    let para = line;
    i++;
    while (i < filtered.length && filtered[i].trim() !== '' && !TOP_HEADING_REGEX.test(filtered[i].trim()) && !/^[•\-*]\s+/.test(filtered[i].trim()) && !(filtered[i].trim() === filtered[i].trim().toUpperCase() && ALL_CAPS_HEADING.test(filtered[i].trim()))) {
      para += ' ' + filtered[i].trim();
      i++;
    }
    blocks.push({ type: 'p', text: para });
  }
  
  // Generate HTML from blocks
  let html = '';
  if (toc.length > 0) {
    html += '<nav class="mb-8 p-4 bg-slate-800/60 rounded">\n';
    html += '<h2 class="text-lg font-semibold text-white mb-2">Table of contents</h2>\n';
    html += '<ul class="list-disc list-inside text-slate-300 space-y-1">\n';
    toc.forEach((item) => {
      html += `<li><a class="text-sky-300 hover:underline cursor-pointer" href="#${item.id}">${escapeHtml(item.text)}</a></li>\n`;
    });
    html += '</ul>\n';
    html += '</nav>\n';
  }
  
  blocks.forEach((b) => {
    if (b.type === 'h2') {
      html += `<h2 id="${b.id}" class="text-xl font-semibold text-white mt-6 mb-2">${escapeHtml(b.text)}</h2>\n`;
    } else if (b.type === 'h3') {
      html += `<h3 id="${b.id}" class="text-lg font-medium text-white mt-5 mb-2">${escapeHtml(b.text)}</h3>\n`;
    } else if (b.type === 'ul') {
      html += '<ul class="list-disc ml-6 text-slate-300 space-y-1">\n';
      b.items.forEach((it) => {
        html += `<li>${escapeHtml(it)}</li>\n`;
      });
      html += '</ul>\n';
    } else {
      html += `<p class="text-slate-300 whitespace-pre-wrap leading-relaxed">${escapeHtml(b.text)}</p>\n`;
    }
  });
  
  return html;
}

function makeId(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Generate privacy page HTML
function generatePrivacyHTML() {
  const policyHTML = parsePolicyToHTML(privacyPolicy);
  
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="/images/logo/gambeta_logo_bgr_cropped.png?v=1" />
    <meta name="theme-color" content="#0f172a" />
    <meta name="description" content="Gambeta Privacy Policy - ${escapeHtml(effectiveDate)}" />
    <title>Privacy Policy - Gambeta</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      body { margin: 0; padding: 0; }
    </style>
  </head>
  <body class="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-slate-200">
    <div class="max-w-3xl mx-auto px-4 py-12 pt-24">
      <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">Privacy Policy</h1>
      <p class="text-slate-400 mb-6">${escapeHtml(effectiveDate)}</p>
      <div class="mb-4">
        <a href="/" class="inline-flex items-center px-3 py-2 bg-slate-700 text-white rounded hover:bg-slate-600">
          ← Back
        </a>
      </div>
      <article class="prose prose-invert max-w-none">
        ${policyHTML}
      </article>
    </div>
  </body>
</html>`;
}

// Generate terms page HTML
function generateTermsHTML() {
  const termsHTML = parsePolicyToHTML(termsOfService);
  
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="/images/logo/gambeta_logo_bgr_cropped.png?v=1" />
    <meta name="theme-color" content="#0f172a" />
    <meta name="description" content="Gambeta Terms of Service - ${escapeHtml(effectiveDate)}" />
    <title>Terms of Service - Gambeta</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      body { margin: 0; padding: 0; }
    </style>
  </head>
  <body class="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-slate-200">
    <div class="max-w-3xl mx-auto px-4 py-12 pt-24">
      <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">Terms of Service</h1>
      <p class="text-slate-400 mb-6">${escapeHtml(effectiveDate)}</p>
      <div class="mb-4">
        <a href="/" class="inline-flex items-center px-3 py-2 bg-slate-700 text-white rounded hover:bg-slate-600">
          ← Back
        </a>
      </div>
      <article class="prose prose-invert max-w-none">
        ${termsHTML}
      </article>
    </div>
  </body>
</html>`;
}

// Create directories and write files
const distPath = path.join(__dirname, '../dist');
const privacyDir = path.join(distPath, 'privacy');
const termsDir = path.join(distPath, 'terms');

fs.mkdirSync(privacyDir, { recursive: true });
fs.mkdirSync(termsDir, { recursive: true });

fs.writeFileSync(path.join(privacyDir, 'index.html'), generatePrivacyHTML());
fs.writeFileSync(path.join(termsDir, 'index.html'), generateTermsHTML());

console.log('Static privacy and terms pages generated');
