#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function usage() {
  console.log('Usage: node cli.js [<input-file>]');
  console.log('If no <input-file> is provided, cli reads from stdin.');
  process.exit(1);
}

const argv = process.argv.slice(2);
let inputPath = argv[0];

function explainGherkinText(text) {
  return require('./run.js').explainGherkin ? require('./run.js').explainGherkin(text) : (() => {
    // fallback simple explanation
    return '# Explicación\n\n' + text.split(/\r?\n/).slice(0,200).join('\n');
  })();
}

function explainJsonText(text) {
  return require('./run.js').explainJsonTasks ? require('./run.js').explainJsonTasks(text) : (() => {
    try { return JSON.stringify(JSON.parse(text), null, 2); } catch(e) { return 'JSON inválido'; }
  })();
}

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString('utf8');
}

(async function main(){
  let content = '';
  if (!inputPath) {
    // read from stdin
    content = await readStdin();
    if (!content) usage();
  } else {
    if (!fs.existsSync(inputPath)) {
      console.error('File not found:', inputPath);
      process.exit(2);
    }
    content = fs.readFileSync(inputPath, 'utf8');
  }

  const ext = inputPath ? path.extname(inputPath).toLowerCase() : (content.trim().startsWith('{') ? '.json' : '.feature');

  let output = '';
  if (ext === '.feature') {
    // require run.js functions dynamically
    const r = require('./run.js');
    if (typeof r.explainGherkin === 'function') {
      output = r.explainGherkin(content);
    } else {
      output = explainGherkinText(content);
    }
  } else if (ext === '.json') {
    const r = require('./run.js');
    if (typeof r.explainJsonTasks === 'function') {
      output = r.explainJsonTasks(content);
    } else {
      output = explainJsonText(content);
    }
  } else {
    output = '# Explicación simplificada\n\n' + content.split(/\r?\n/).slice(0,200).join('\n');
  }

  console.log(output);
})();
