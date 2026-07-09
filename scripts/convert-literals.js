#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
// load .env if present
try { require('dotenv').config(); } catch (e) { /* dotenv optional */ }
// Roles we want to convert into constants
const ROLE_NAMES = ['button', 'link', 'menuitem', 'menu', 'textbox', 'dialog'];

function ensureConsts(content, consts) {
  // Place constants after the last import or at top
  const importMatch = content.match(/^(?:import .*\n)+/m);
  const insertPos = importMatch ? importMatch[0].length : 0;
  const existing = new Set();
  for (const name of consts) existing.add(name.name);

  // avoid duplicating constants if already present
  const toAdd = consts.filter(c => !new RegExp(`const\s+${c.name}\s*=`, 'm').test(content));
  if (toAdd.length === 0) return content;
  const decls = toAdd.map(c => `const ${c.name} = ${JSON.stringify(c.value)};`).join('\n') + '\n\n';
  return content.slice(0, insertPos) + decls + content.slice(insertPos);
}

function processFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // convert getByRole('button', ...) -> getByRole(ROLE_BUTTON, ...)
  const foundRoles = new Set();
  for (const role of ROLE_NAMES) {
    const re = new RegExp(`getByRole\\(\\s*(['"])(?:${role})\\1`, 'g');
    if (re.test(content)) {
      changed = true;
      foundRoles.add(role);
      const constName = 'ROLE_' + role.toUpperCase();
      content = content.replace(re, `getByRole(${constName}`);
    }
  }

  if (changed) {
    const consts = Array.from(foundRoles).map(r => ({ name: 'ROLE_' + r.toUpperCase(), value: r }));
    content = ensureConsts(content, consts);
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file, '-> added constants:', Array.from(foundRoles).join(', '));
  }
}

function walkDir(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (file === 'node_modules' || file.startsWith('.')) continue;
      walkDir(full, filelist);
    } else if (stat.isFile() && full.endsWith('.ts')) {
      filelist.push(full);
    }
  }
  return filelist;
}

function checkCredentialsIfDebug() {
  const requireFlag = process.argv.includes('--require-credentials');
  if (process.env.PWDEBUG || requireFlag) {
    const missing = [];
    if (!process.env.USER_NAME) missing.push('USER_NAME');
    if (!process.env.USER_PASSWORD) missing.push('USER_PASSWORD');
    if (missing.length > 0) {
      console.error('Missing environment variables required for debug:', missing.join(', '));
      console.error('Create a .env file or set the variables in your environment. Aborting.');
      process.exit(2);
    }
  }
}

function main() {
  checkCredentialsIfDebug();
  const target = process.argv[2] || 'features';
  const start = path.resolve(process.cwd(), target);
  if (!fs.existsSync(start)) {
    console.error('Start path not found:', start);
    process.exit(1);
  }
  const files = walkDir(start);
  for (const f of files) {
    processFile(f);
  }
}

main();
