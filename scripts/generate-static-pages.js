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

// Helper function to parse policy text into HTML
function parsePolicyToHTML(policyText) {
  const lines = policyText.split('\n');
  let html = '';
  let inList = false;
  
  // Remove embedded TABLE OF CONTENTS
  const filtered = [];
  let skipToc = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().toUpperCase() === 'TABLE OF CONTENTS') {
      skipToc = true;
      continue;
    }
    if (skipToc && lines[i].trim() === '') {
      skipToc = false;
      continue;
    }
    if (!skipToc) {
      filtered.push(lines[i]);
    }
  }
  
  for (let i = 0; i < filtered.length; i++) {
    const line = filtered[i].trim();
    if (!line) {
      if (inList) {
        html += '</ul>\n';
        inList = false;
      }
      html += '<br>\n';
      continue;
    }
    
    // Numbered headings (1. ...)
    if (/^\d+\.\s+/.test(line)) {
      if (inList) {
        html += '</ul>\n';
        inList = false;
      }
      html += `<h2 class="text-xl font-semibold text-white mt-6 mb-2">${escapeHtml(line)}</h2>\n`;
    }
    // ALL CAPS headings
    else if (line.length > 3 && line === line.toUpperCase() && /^[A-Z0-9 '()-]+$/.test(line)) {
      if (inList) {
        html += '</ul>\n';
        inList = false;
      }
      html += `<h3 class="text-lg font-medium text-white mt-5 mb-2">${escapeHtml(line)}</h3>\n`;
    }
    // Bullet points
    else if (/^[•\-*]\s+/.test(line)) {
      if (!inList) {
        html += '<ul class="list-disc ml-6 text-slate-300 space-y-1">\n';
        inList = true;
      }
      html += `<li>${escapeHtml(line.replace(/^[•\-*]\s+/, ''))}</li>\n`;
    }
    // Regular paragraphs
    else {
      if (inList) {
        html += '</ul>\n';
        inList = false;
      }
      html += `<p class="text-slate-300 whitespace-pre-wrap leading-relaxed">${escapeHtml(line)}</p>\n`;
    }
  }
  
  if (inList) {
    html += '</ul>\n';
  }
  
  return html;
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
      <article class="prose prose-invert max-w-none">
        ${policyHTML}
      </article>
      <div class="mt-8">
        <a href="/" class="inline-flex items-center px-3 py-2 bg-slate-700 text-white rounded hover:bg-slate-600">
          ← Back to Home
        </a>
      </div>
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
      <article class="prose prose-invert max-w-none">
        ${termsHTML}
      </article>
      <div class="mt-8">
        <a href="/" class="inline-flex items-center px-3 py-2 bg-slate-700 text-white rounded hover:bg-slate-600">
          ← Back to Home
        </a>
      </div>
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
