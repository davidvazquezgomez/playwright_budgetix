#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function usage() {
  console.log('Usage: node run.js <input-file> [--out <output-file>]');
  process.exit(1);
}

const argv = process.argv.slice(2);
if (argv.length === 0) usage();

let input = argv[0];
let outIndex = argv.indexOf('--out');
let outFile = outIndex !== -1 && argv[outIndex+1] ? argv[outIndex+1] : 'EXPLAINER_JUNIOR.md';

if (!fs.existsSync(input)) {
  console.error('Input not found:', input);
  process.exit(2);
}

const ext = path.extname(input).toLowerCase();
let content = fs.readFileSync(input, 'utf8');
let result = [];

function explainGherkin(text) {
  const lines = text.split(/\r?\n/).map(l => l.trim());
  let out = [];
  let currentFeature = null;
  let currentScenario = null;

  for (const line of lines) {
    if (line.startsWith('Feature:')) {
      currentFeature = line.replace('Feature:', '').trim();
      out.push(`# Feature: ${currentFeature}`);
      out.push('Descripción (en palabras simples):');
      out.push(`Esta característica comprueba: ${currentFeature}`);
      out.push('');
    } else if (/^(Background:)/i.test(line)) {
      out.push('Contexto previo (Background):');
    } else if (/^(Scenario|Scenario Outline):/i.test(line)) {
      currentScenario = line.replace(/Scenario( Outline)?:/i, '').trim();
      out.push(`## Escenario: ${currentScenario}`);
      out.push('- Objetivo: Explicar en una frase qué valida este escenario.');
      out.push('- Pasos para reproducir manualmente:');
    } else if (/^(Given|When|Then|And)/i.test(line)) {
      const step = line.replace(/^(Given|When|Then|And)\s*/i, '').trim();
      out.push(`  - ${step}`);
    }
  }
  return out.join('\n');
}

function explainJsonTasks(text) {
  try {
    const j = JSON.parse(text);
    if (!Array.isArray(j.tasks)) return 'JSON válido pero no contiene `tasks` array.';
    const out = [];
    out.push('# Explicación para QA junior');
    j.tasks.forEach((t, i) => {
      out.push(`\n## Tarea ${i+1}: ${t.title || 'Sin título'}`);
      out.push(`Objetivo: ${t.description || 'Descripción no disponible'}`);
      out.push('Pasos sugeridos para verificar manualmente:');
      if (Array.isArray(t.steps)) {
        t.steps.forEach((s, idx) => out.push(`  ${idx+1}. ${s}`));
      } else {
        out.push('  - Revisar los elementos relacionados; ejecutar el escenario BDD si procede.');
      }
      if (t.risks) out.push(`Riesgos conocidos: ${t.risks}`);
    });
    return out.join('\n');
  } catch (e) {
    return 'Error parseando JSON: ' + e.message;
  }
}

let output = '';
if (ext === '.feature') {
  output = explainGherkin(content);
} else if (ext === '.json') {
  output = explainJsonTasks(content);
} else {
  // fallback: simple text -> echo with small header
  output = '# Explicación simplificada\n\n' + content.split(/\r?\n/).slice(0,200).join('\n');
}

fs.writeFileSync(outFile, output, 'utf8');
console.log('Explainer-Junior: output written to', outFile);
