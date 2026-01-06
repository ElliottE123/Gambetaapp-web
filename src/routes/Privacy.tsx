import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { privacyPolicy, effectiveDate } from '../constants/legalTexts';

// Heading detection for TOC: numbered top-level sections (e.g., "1. ...")
const TOP_HEADING_REGEX = /^\d+\.\s+(.+)$/;
const ALL_CAPS_HEADING = /^[A-Z0-9 '()-]+$/;

const makeId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

type Block =
  | { type: 'h2'; text: string; id: string }
  | { type: 'h3'; text: string; id: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] };

const parsePolicy = (lines: string[]): { blocks: Block[]; toc: { id: string; text: string }[] } => {
  const blocks: Block[] = [];
  const toc: { id: string; text: string }[] = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trimEnd();

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
      const items: string[] = [];
      while (i < lines.length && /^[•\-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[•\-*]\s+/, ''));
        i++;
      }
      blocks.push({ type: 'ul', items });
      continue;
    }

    // Otherwise, consume consecutive non-empty non-list lines into a paragraph
    let para = line;
    i++;
    while (i < lines.length && lines[i].trim() !== '' && !TOP_HEADING_REGEX.test(lines[i].trim()) && !/^[•\-*]\s+/.test(lines[i].trim()) && !(lines[i].trim() === lines[i].trim().toUpperCase() && ALL_CAPS_HEADING.test(lines[i].trim()))) {
      para += ' ' + lines[i].trim();
      i++;
    }
    blocks.push({ type: 'p', text: para });
  }

  return { blocks, toc };
};

const Privacy: React.FC = () => {
  const navigate = useNavigate();
  const lines = useMemo(() => privacyPolicy.split('\n'), []);

  // Remove embedded textual TABLE OF CONTENTS block
  const filtered = useMemo(() => {
    const start = lines.findIndex((l) => l.trim().toUpperCase() === 'TABLE OF CONTENTS');
    if (start === -1) return lines;
    let end = -1;
    for (let j = start + 1; j < lines.length; j++) {
      if (lines[j].trim() === '') {
        end = j;
        break;
      }
    }
    if (end === -1) return lines;
    return [...lines.slice(0, start), ...lines.slice(end + 1)];
  }, [lines]);

  const { blocks, toc } = useMemo(() => parsePolicy(filtered), [filtered]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-slate-200 pt-24">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-slate-400 mb-6">{effectiveDate}</p>

        <div className="mb-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-3 py-2 bg-slate-700 text-white rounded hover:bg-slate-600"
            aria-label="Go back"
          >
            ← Back
          </button>
        </div>

        {toc.length > 0 && (
          <nav className="mb-8 p-4 bg-slate-800/60 rounded">
            <h2 className="text-lg font-semibold text-white mb-2">Table of contents</h2>
            <ul className="list-disc list-inside text-slate-300 space-y-1">
              {toc.map((item) => (
                <li key={item.id}>
                  <a
                    className="text-sky-300 hover:underline cursor-pointer"
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById(item.id);
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <article className="prose prose-invert max-w-none">
          {blocks.map((b, idx) => {
            if (b.type === 'h2') return (
              <h2 key={idx} id={b.id} className="text-xl font-semibold text-white mt-6 mb-2">{b.text}</h2>
            );
            if (b.type === 'h3') return (
              <h3 key={idx} id={b.id} className="text-lg font-medium text-white mt-5 mb-2">{b.text}</h3>
            );
            if (b.type === 'ul') return (
              <ul key={idx} className="list-disc ml-6 text-slate-300 space-y-1">
                {b.items.map((it, i) => <li key={i}>{it}</li>)}
              </ul>
            );
            return (
              <p key={idx} className="text-slate-300 whitespace-pre-wrap leading-relaxed">{b.text}</p>
            );
          })}
        </article>
      </div>
    </div>
  );
};

export default Privacy;
