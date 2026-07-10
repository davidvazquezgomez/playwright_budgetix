---
name: Explainer-Junior
version: 1.0
owner: equipo-de-qa
description: |
  Agente orientado a generar explicaciones en lenguaje natural (español
  sencillo) pensadas para QA junior sin experiencia. Toma como entrada los
  artefactos que genera el agente BDD (features, JSON con tareas, o diffs) y
  produce un `EXPLAINER_JUNIOR.md` con instrucciones paso-a-paso y contexto.

readOnly: true
explicitWriteAllowed: false

files:
  - features/**
  - .github/agents/**
  - test-results/**
  - allure-results/**

usage:
  - description: Ejecutar sobre un feature o un JSON con tareas
    command: |
      node .github/agents/explainer-junior/run.js path/to/input.feature

notes: |
  - Por defecto el agente opera en modo lectura y escribe localmente un archivo
    `EXPLAINER_JUNIOR.md` en el directorio actual si se pasa `--out <file>`.
  - Si quieres integración CI: invoca el mismo comando en un job y sube el
    artefacto al PR.

examples:
  - input: features/login.feature
    output: EXPLAINER_JUNIOR.md

security:
  - ensure-separate-branch-for-writes: true
  - minimize-resource-usage: true

---

# Objetivo

Este agente facilita que un QA junior entienda qué pruebas automáticas fueron
generadas por el agente BDD y qué pasos manuales (si los hay) debe verificar.

# Formato de salida

- `EXPLAINER_JUNIOR.md`: explica cada tarea con título, objetivo, pasos para
  verificar manualmente, criterios de aceptación y notas de riesgo.

# Cómo ejecutar

- Localmente:

```bash
node .github/agents/explainer-junior/run.js features/login.feature --out EXPLAINER_JUNIOR.md
```

***
