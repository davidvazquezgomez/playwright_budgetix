# Budgetix — Documento de Requisitos y Documentación Completa

> **Versión del documento**: 1.5  
> **Fecha**: 2026-04-17  
> **Versión de la aplicación**: 2.4.0 (2026-04-17)  
> **URL producción**: https://www.budgetix.es  
> **Propósito**: Documento de referencia completo para testing y verificación funcional

---

## Índice

1. [Descripción General](#1-descripción-general)
2. [Arquitectura Técnica](#2-arquitectura-técnica)
3. [Base de Datos](#3-base-de-datos)
4. [Requisitos de Seguridad](#4-requisitos-de-seguridad)
5. [Módulo de Autenticación](#5-módulo-de-autenticación)
6. [Módulo de Registro](#6-módulo-de-registro)
7. [Módulo de Recuperación de Contraseña](#7-módulo-de-recuperación-de-contraseña)
8. [Módulo de Suscripciones y Pagos](#8-módulo-de-suscripciones-y-pagos)
9. [Módulo de Ingresos, Gastos y Ahorros](#9-módulo-de-ingresos-gastos-y-ahorros)
10. [Módulo de Resumen Anual](#10-módulo-de-resumen-anual)
11. [Módulo de Informes Anuales](#11-módulo-de-informes-anuales)
12. [Módulo de Estadísticas](#12-módulo-de-estadísticas)
13. [Módulo de Gastos Compartidos](#13-módulo-de-gastos-compartidos)
14. [Módulo de Metas Financieras](#14-módulo-de-metas-financieras)
15. [Módulo de Logros y Gamificación](#15-módulo-de-logros-y-gamificación)
16. [Módulo de Carreras](#16-módulo-de-carreras)
17. [Módulo de Vehículos y Revisiones](#17-módulo-de-vehículos-y-revisiones)
18. [Módulo de Portfolio de Inversiones](#18-módulo-de-portfolio-de-inversiones)
19. [Módulo de Salarios](#19-módulo-de-salarios)
20. [Módulo de Sueldo Neto](#20-módulo-de-sueldo-neto)
21. [Módulo de Categorías Personalizadas](#21-módulo-de-categorías-personalizadas)
22. [Módulo de Análisis Inteligente](#22-módulo-de-análisis-inteligente)
23. [Módulo de Datos a Recordar](#23-módulo-de-datos-a-recordar)
24. [Módulo de Comunidad (Consumo Eléctrico)](#24-módulo-de-comunidad-consumo-eléctrico)
25. [Módulo de TuWebCustom](#25-módulo-de-tuwebcustom)
26. [Módulo de Perfil de Usuario](#26-módulo-de-perfil-de-usuario)
27. [Módulo de Changelog](#27-módulo-de-changelog)
28. [Panel de Administración](#28-panel-de-administración)
29. [Sistema de Notificaciones](#29-sistema-de-notificaciones)
30. [API Endpoints](#30-api-endpoints)
31. [PWA y Soporte Offline](#31-pwa-y-soporte-offline)
32. [Sistema de Caché](#32-sistema-de-caché)
33. [Emails y Plantillas](#33-emails-y-plantillas)
34. [Jobs Programados (Cron)](#34-jobs-programados-cron)
35. [Landing Page y Páginas Legales](#35-landing-page-y-páginas-legales)
36. [Sistema de Build](#36-sistema-de-build)
37. [Matriz de Control de Acceso](#37-matriz-de-control-de-acceso)
38. [Módulo de Asistente IA (Chatbot)](#38-módulo-de-asistente-ia-chatbot)
39. [Módulo de Límites de Gasto por Categoría](#39-módulo-de-límites-de-gasto-por-categoría)

---

## 1. Descripción General

**Budgetix** es una aplicación web de gestión financiera personal desarrollada en PHP puro (sin framework) con MariaDB como base de datos. Ofrece funcionalidades de control de ingresos, gastos y ahorros, con sistemas avanzados de análisis predictivo, gamificación, gastos compartidos, gestión de inversiones y soporte PWA con capacidad offline.

### 1.1 Características Principales

| # | Característica | Descripción |
|---|---|---|
| 1 | Gestión de ingresos/gastos/ahorros | Registro, búsqueda y eliminación de movimientos financieros con categorización |
| 2 | Gastos compartidos | Sistema de parejas con reparto 50/50, deudas y liquidaciones |
| 3 | Portfolio de inversiones | Seguimiento de operaciones bursátiles, dividendos y rentabilidad |
| 4 | Vehículos y mantenimiento | Registro de vehículos, revisiones, repostajes y consumos |
| 5 | Metas financieras | Objetivos de ahorro con seguimiento de aportaciones |
| 6 | Análisis inteligente | Score de salud financiera, predicciones, patrones y consejos |
| 15 | Asistente IA (Chatbot) | Asistente financiero conversacional con contexto dinámico y fallback multi-modelo |
| 16 | Límites de gasto por categoría | Alertas configurables por categoría con barra de progreso y notificaciones |
| 7 | Gamificación | Logros, puntos, niveles, rachas y ranking |
| 8 | Informes y estadísticas | Resúmenes anuales, comparativas multi-año y KPIs |
| 9 | Gestión de salarios | Registro histórico de sueldos y cálculo de neto |
| 10 | Categorías personalizables | Sistema de categorías/subcategorías customizables |
| 11 | Sistema de suscripción | Trial de 1 año, pagos vía Bizum/transferencia |
| 12 | PWA con soporte offline | Instalable, funciona sin conexión, sincronización en segundo plano |
| 13 | Notificaciones múltiples | Gastos compartidos, suscripciones, logros, versiones, pagos web |
| 14 | Panel de administración | Gestión de usuarios, suscripciones, caché, logs, versiones, gastos compartidos |

---

## 2. Arquitectura Técnica

### 2.1 Stack Tecnológico

| Componente | Tecnología |
|---|---|
| Backend | PHP 8.3.30 (sin framework) |
| Base de datos | MariaDB 10.x con utf8mb4 |
| Caché / Sesiones | Redis 7.x (DB 2 caché, DB 3 sesiones) — opcional, fallback graceful |
| Frontend | HTML5, CSS3 puro, JavaScript vanilla (ES6+) |
| Gráficos | Chart.js + chartjs-plugin-datalabels |
| Iconos | Font Awesome 6 (self-hosted) |
| Emails | PHPMailer vía SMTP |
| OAuth | Google OAuth 2.0 (implementación propia) |
| PWA | Service Worker + IndexedDB + Web App Manifest |
| Build | PHP CLI (build.php) — minificación y bundling |

### 2.2 Infraestructura de Producción

#### Servidor VPS

| Recurso | Especificación |
|---|---|
| Sistema Operativo | Ubuntu 24.04 LTS |
| Panel de control | Plesk |
| CPU | 2 núcleos |
| RAM | 4 GB |
| Almacenamiento | 120 GB |

#### Configuración PHP (PHP-FPM servido por Apache)

| Directiva | Valor |
|---|---|
| **Versión PHP** | **8.3.30** |
| **Modo de ejecución** | **Aplicación FPM servido por Apache** |
| `memory_limit` | 128M |
| `max_execution_time` | 30s |
| `max_input_time` | 60s |
| `post_max_size` | 8M |
| `upload_max_filesize` | 2M |
| `opcache.enable` | on |
| `display_errors` | off |
| `log_errors` | on |
| `error_reporting` | `E_ALL & ~E_NOTICE & ~E_STRICT & ~E_DEPRECATED` |
| `allow_url_fopen` | on |
| `file_uploads` | on |
| `short_open_tag` | off |
| `session.save_path` | Redis DB 3 (auto-detectado vía `REDIS_HOST` en `.env`; fallback a `/var/lib/php/sessions`) |
| `open_basedir` | none (sin restricción) |
| `disable_functions` | `opcache_get_status` |

#### Configuración PHP-FPM (actualizada 2026-03-24)

| Directiva | Valor |
|---|---|
| `pm` | dynamic |
| `pm.max_children` | 15 |
| `pm.start_servers` | 3 |
| `pm.min_spare_servers` | 2 |
| `pm.max_spare_servers` | 8 |
| `pm.max_requests` | 500 |

> **Nota:** VPS compartido con otra app prioritaria. 15 workers × 40MB = 600MB. Capacidad ~300 req/s (~2.000 usuarios concurrentes).

#### Configuración OPcache (optimización Plesk)

| Directiva | Valor |
|---|---|
| `opcache.memory_consumption` | 128 MB |
| `opcache.interned_strings_buffer` | 64 MB |
| `opcache.max_accelerated_files` | 1000 |
| `opcache.max_wasted_percentage` | 15% |
| `opcache.revalidate_path` | 0 (desactivado) |
| `opcache.jit` | 1254 (tracing JIT) |
| `opcache.jit_buffer_size` | 32M |
| `opcache.huge_code_pages` | 1 (activado) |

### 2.4 Infraestructura Actual (post-optimización Fases 0–2)

```
[Usuarios] → [Nginx (Plesk proxy)] → [Apache + PHP-FPM (15 workers)] → [MariaDB]
                                                    ↓
                                              [Redis DB 2 (caché)]
                                              [Redis DB 3 (sesiones)]
```

**Optimizaciones activas:**
- Conexiones persistentes MySQL (prefijo `p:` en mysqli)
- Caché HTTP inmutable (1 año) + gzip para assets estáticos
- Redis: caché de notificaciones (TTL 30s) + sesiones
- Endpoint de notificaciones unificado (1 req/2min en lugar de 5 req/30s–60s)
- Índices DB optimizados (covering index en presupuestos, actividad, alertas, consejos)
- SSE desactivado (VPS compartido — bloquearía workers)

### 2.5 Estructura de Directorios

```
budgetix/
├── index.php / index.html       → Landing page
├── build.php                     → Sistema de build
├── composer.json                 → Dependencias PHP
├── app/
│   ├── index.php                 → Router → public/
│   ├── sw.php                    → Service Worker (PHP-generated JS)
│   ├── manifest.php              → Web App Manifest (PHP-generated JSON)
│   ├── api/                      → 13 endpoints API REST
│   ├── assets/
│   │   ├── css/
│   │   │   ├── design-tokens.css → Variables CSS centralizadas (colores, spacing, tipografía)
│   │   │   └── ...               → 31 archivos CSS (global + page-specific)
│   │   ├── js/
│   │   │   ├── core/             → 6 módulos core (utils, ajax, forms, tables, menu, lazy)
│   │   │   ├── services/         → 10 servicios (offline, PWA, notificaciones)
│   │   │   ├── pages/            → 20 scripts de página
│   │   │   └── vendor/           → Chart.js
│   │   └── dist/                 → Build output (minificado + bundles)
│   ├── includes/
│   │   ├── middleware.php        → Funciones de validación centralizadas (CSRF, auth, rate limit)
│   │   ├── constants.php         → Constantes de la aplicación (incluye APP_MIN_YEAR, rate limits, TTLs)
│   │   └── ...                   → 17 archivos PHP (config, helpers, seguridad, GDPR export)
│   ├── pages/                    → 26 páginas de la aplicación
│   │   └── handlers/             → AJAX handlers extraídos (estadisticas_ajax.php, csv_import_handler.php)
│   ├── public/                   → 9 páginas públicas (auth)
│   ├── templates/                → Sistema de email templates (5 plantillas)
│   └── logs/                     → Logs de aplicación
├── data/
│   ├── schema_production.sql     → Esquema completo de BD
│   └── migrations/               → Migraciones de BD (001_soft_delete_usuarios.sql, ...)
├── docs/                         → Documentación
├── landing/                      → Páginas legales y landing
└── vendor/                       → Dependencias Composer
```

### 2.6 Flujo de Navegación

```
Landing (index.php) → Login/Register → resumenAnual.php (Dashboard)
                                            ↓
                    ┌───────────────────────────────────────┐
                    │  Menú hamburguesa (sidebar)           │
                    ├───────────────────────────────────────┤
                    │  • Resumen Anual (dashboard)          │
                    │  • Añadir Ingreso/Gasto               │
                    │  • Informes Anuales                   │
                    │  • Gastos Compartidos                 │
                    │  • Metas                              │
                    │  • Logros                             │
                    │  • Carreras                           │
                    │  • Revisiones + Añadir Revisiones     │
                    │  • Datos a Recordar                   │
                    │  • Sueldo Neto                        │
                    │  • Categorías Personalizadas          │
                    │  • Análisis Inteligente               │
                    │  • Suscripción                        │
                    │  • Perfil                             │
                    │  • Changelog                          │
                    │  ─── Solo Admin ───                   │
                    │  • Portfolio                          │
                    │  • Salarios                           │
                    │  • Estadísticas                       │
                    │  • Comunidad                          │
                    │  • TuWebCustom                        │
                    │  • Admin Caché                        │
                    │  • Admin Gastos Compartidos           │
                    │  • Admin Suscripciones                │
                    │  • Admin Logs                         │
                    │  • Admin Versiones                    │
                    └───────────────────────────────────────┘
```

---

## 3. Base de Datos

### 3.1 Tablas Principales (35 tablas + 1 vista)

| Tabla | Descripción | FK a usuarios |
|---|---|---|
| `usuarios` | Usuarios del sistema (auth local + Google OAuth) | — |
| `password_reset_tokens` | Tokens de recuperación de contraseña | Sí (CASCADE) |
| `login_attempts` | Intentos fallidos de login (por IP) | No |
| `api_rate_limits` | Rate limiting de API (por IP+endpoint) | No |
| `cookie_consent` | Consentimiento RGPD de cookies | Sí (CASCADE) |
| `presupuestos` | **Tabla principal**: ingresos, gastos, ahorros (PARTICIONADA por año) | No FK (app-level) |
| `cache_resumen_mensual` | Caché de resúmenes mensuales | No FK (app-level) |
| `carreras` | Eventos deportivos/carreras | Sí (CASCADE) |
| `datos_recordar` | Notas personales | Sí (CASCADE) |
| `portfolio` | Operaciones de inversión | Sí (CASCADE) |
| `salarios` | Registro histórico de salarios | Sí (CASCADE) |
| `r_vehiculos` | Vehículos registrados | Sí (CASCADE) |
| `r_libro_mantenimiento` | Libro de mantenimiento planificado | FK a r_vehiculos |
| `r_mantenimientos_realizados` | Mantenimientos realizados | FK a r_vehiculos |
| `r_repostajes` | Historial de repostajes | FK a r_vehiculos |
| `consumo_luz` | Consumo eléctrico comunitario | Sí (app-level) |
| `tarifas` | Tarifas eléctricas | Sí (app-level) |
| `pagos_web` | Pagos de dominios/hosting | Sí (app-level) |
| `metas` | Metas financieras | Sí (CASCADE) |
| `metas_aportaciones` | Aportaciones a metas | FK a metas |
| `gastos_compartidos_grupos` | Parejas de gastos compartidos | Sí (CASCADE) |
| `gastos_compartidos_solicitudes` | Solicitudes de emparejamiento | Sí (CASCADE) |
| `deuda_saldada` | Registro de deudas saldadas | Sí (CASCADE) |
| `notificaciones_gastos_compartidos` | Notificaciones de gastos compartidos | Sí (CASCADE) |
| `notificaciones_tuwebcustom` | Notificaciones de pagos web | Sí (CASCADE) |
| `planes_suscripcion` | Planes de suscripción disponibles | No |
| `pagos_suscripcion` | Pagos de suscripción realizados | Sí (CASCADE) |
| `logros_definiciones` | Catálogo de logros (54 predefinidos) | No |
| `usuarios_logros` | Logros obtenidos por usuario | Sí (CASCADE) |
| `usuarios_puntos` | Puntos, nivel y rachas por usuario | Sí (CASCADE) |
| `usuarios_actividad` | Actividad diaria para rachas | Sí (CASCADE) |
| `categorias_personalizadas` | Categorías custom del usuario | Sí (CASCADE) |
| `subcategorias_personalizadas` | Subcategorías custom del usuario | Sí (CASCADE) |
| `categorias_desactivadas` | Categorías sistema ocultas | Sí (CASCADE) |
| `subcategorias_desactivadas` | Subcategorías sistema ocultas | Sí (CASCADE) |
| `categorias_orden_usuario` | Orden/personalización de categorías | Sí (CASCADE) |
| `analisis_usuario` | Métricas de análisis financiero | Sí (CASCADE) |
| `consejos_mostrados` | Historial de consejos mostrados | Sí (CASCADE) |
| `patrones_detectados` | Patrones de comportamiento | Sí (CASCADE) |
| `historial_scores` | Evolución del score de salud | Sí (CASCADE) |
| `alertas_anomalias` | Alertas de gastos anómalos | Sí (CASCADE) |
| `versiones` | Versiones de la aplicación | No |
| `cambios_version` | Changelog por versión | FK a versiones |
| `usuario_versiones_vistas` | Control de versiones vistas | Sí (CASCADE) |

**Vista**: `vista_gastos_compartidos` — JOIN de `presupuestos` con `usuarios` para gastos compartidos.

### 3.2 Tabla `presupuestos` (Tabla Principal — Particionada)

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | INT AUTO_INCREMENT | Identificador único |
| `tipo` | ENUM('Gastos','Ingresos','Ahorros') | Tipo de movimiento |
| `mes` | ENUM (12 meses en español) | Mes del movimiento |
| `anno` | INT(4) | Año del movimiento |
| `categoria` | VARCHAR(50) | Categoría del movimiento |
| `subcategoria` | VARCHAR(50) | Subcategoría del movimiento |
| `concepto` | VARCHAR(255) | Descripción libre |
| `cantidad` | DECIMAL(10,2) | Importe (negativo solo para Ahorros) |
| `fecha_creacion` | TIMESTAMP | Fecha de creación del registro |
| `id_usuario` | INT | ID del usuario propietario |
| `id_carrera` | INT | FK a carreras (si aplica) |
| `gasto_fijo` | TINYINT(1) | Si es gasto fijo (automático por subcategoría) |
| `gasto_compartido` | TINYINT(1) | Si es gasto compartido |
| `pagado_por` | VARCHAR(30) | Quién pagó (en gastos compartidos) |

**Particionamiento**: Por año (RANGE), particiones p2023–p2029 + p_future.  
**Sin FK**: No tiene FOREIGN KEY a `usuarios` (limitación de MariaDB en tablas particionadas). La integridad se gestiona a nivel de aplicación con `validateUserExists()`.

### 3.3 Triggers de Base de Datos

| Trigger | Tabla | Evento | Lógica |
|---|---|---|---|
| `insertar_en_presupuestos` | `carreras` | AFTER INSERT | Si carrera pagada → inserta gasto en presupuestos |
| `actualizar_presupuesto_carrera` | `carreras` | AFTER UPDATE | Pagada→gasto; no pagada→elimina gasto |
| `borrar_presupuesto_carrera` | `carreras` | AFTER DELETE | Elimina gasto asociado |
| `after_insert_portfolio` | `portfolio` | AFTER INSERT | Inserta ingreso (Inversiones) + ahorro (Cuentas) |
| `after_update_portfolio` | `portfolio` | AFTER UPDATE | Elimina antiguos, inserta actualizados |
| `before_delete_portfolio` | `portfolio` | BEFORE DELETE | Elimina presupuestos asociados |
| `after_insert_revision` | `r_mantenimientos_realizados` | AFTER INSERT | Inserta gasto Coche/Moto Mantenimiento |
| `after_delete_revision` | `r_mantenimientos_realizados` | AFTER DELETE | Elimina gasto asociado |
| `after_insert_repostaje_combined` | `r_repostajes` | AFTER INSERT | Actualiza km + inserta gasto Combustible |
| `trg_after_delete_repostaje` | `r_repostajes` | AFTER DELETE | Actualiza km + elimina gasto |
| `after_update_pagos_web` | `pagos_web` | AFTER UPDATE | Marcado pagado → inserta ingreso Webs |

### 3.4 Procedimientos Almacenados

| Procedimiento | Parámetros | Función |
|---|---|---|
| `actualizar_cache_resumen` | `(user_id, anno, mes)` | Recalcula y upsert caché mensual |
| `reconstruir_cache_usuario` | `(user_id, anno_inicio, anno_fin)` | Reconstruye caché para rango de años |

### 3.5 Funciones de BD

| Función | Parámetros | Retorno |
|---|---|---|
| `get_spanish_month` | `(month_num INT)` | ENUM mes en español |

---

## 4. Requisitos de Seguridad

### 4.1 Protección CSRF

| REQ-SEC-001 | Todos los formularios POST incluyen un token CSRF |
|---|---|
| REQ-SEC-002 | El token CSRF se genera con `bin2hex(random_bytes(32))` |
| REQ-SEC-003 | El token CSRF se regenera cada 1 hora |
| REQ-SEC-004 | La verificación del token usa `hash_equals()` (timing-safe) |
| REQ-SEC-005 | Los endpoints API con datos sensibles validan CSRF |

### 4.2 Protección XSS

| REQ-SEC-010 | Toda salida HTML se escapa con `htmlspecialchars(ENT_QUOTES, UTF-8)` |
|---|---|
| REQ-SEC-011 | Los inputs se sanitizan con `sanitizeString()` (strip_tags + trim) |
| REQ-SEC-012 | Los emails se validan con `FILTER_VALIDATE_EMAIL` |
| REQ-SEC-013 | Las URLs se validan con `FILTER_VALIDATE_URL` |

### 4.3 Protección SQL Injection

| REQ-SEC-020 | Todas las consultas a BD usan prepared statements con bind_param |
|---|---|
| REQ-SEC-021 | Los valores enum se validan contra listas permitidas antes de la consulta |

### 4.4 Control de Sesiones

| REQ-SEC-030 | Las cookies de sesión tienen httponly=true |
|---|---|
| REQ-SEC-031 | Las cookies tienen samesite=Lax |
| REQ-SEC-032 | En HTTPS: cookies con secure=true |
| REQ-SEC-033 | La sesión se regenera en cada login (`session_regenerate_id(true)`) |
| REQ-SEC-034 | La sesión dura 7 días con renovación en cada petición |
| REQ-SEC-035 | Se verifica hash de contraseña en sesión cada 5 minutos (invalidación remota) |
| REQ-SEC-036 | Sesiones almacenadas en Redis (DB 3) si `REDIS_HOST` configurado; fallback a ficheros |
| REQ-SEC-037 | Rotación periódica del session ID cada hora (`session_regenerate_id(true)`) para prevenir session fixation |

### 4.5 Rate Limiting

| REQ-SEC-040 | Login: backoff exponencial — 3 intentos → 1min, 5 → 5min, 8 → 15min, 10+ → 60min (BD, tabla `login_attempts`) |
|---|---|
| REQ-SEC-041 | Registro: 3 intentos por IP en 10 minutos (basado en BD, tabla `api_rate_limits`) |
| REQ-SEC-042 | Recuperación de contraseña: 3 intentos en 10 minutos (basado en BD) |
| REQ-SEC-043 | Cambio de contraseña: 3 intentos en 10 minutos (basado en BD) |
| REQ-SEC-044 | APIs: 60 requests/minuto por IP+endpoint (basado en BD) |
| REQ-SEC-045 | Operaciones CRUD en páginas: 5-10 por minuto (basado en BD con fallback a sesión) |
| REQ-SEC-046 | `checkRateLimit()` usa tabla `api_rate_limits` con UPSERT atómico; resistente a borrado de cookies |
| REQ-SEC-047 | Cookie consent: máximo 10 peticiones por IP en 5 minutos (basado en sesión) |

### 4.6 Headers de Seguridad

| REQ-SEC-050 | `X-Content-Type-Options: nosniff` |
|---|---|
| REQ-SEC-051 | `X-Frame-Options: SAMEORIGIN` |
| REQ-SEC-052 | `X-XSS-Protection: 1; mode=block` |
| REQ-SEC-053 | `Referrer-Policy: strict-origin-when-cross-origin` |
| REQ-SEC-054 | `Permissions-Policy: geolocation=(), microphone=(), camera=()` |
| REQ-SEC-055 | CSP enforced con whitelist de CDNs (jsdelivr, cdnjs, googleapis, gstatic) |
| REQ-SEC-056 | CSP nonce generado por petición (`$GLOBALS['csp_nonce']` = `bin2hex(random_bytes(16))`) para scripts inline |
| REQ-SEC-057 | `Content-Security-Policy` enforced: `script-src 'self' 'nonce-{random}' https://cdn.jsdelivr.net` — sin `unsafe-inline` ni `unsafe-eval` |
| REQ-SEC-058 | Migración completa: 93 inline handlers migrados a `addEventListener`, 52 scripts con nonce, 26 ficheros PHP |

### 4.7 Prevención de Open Redirect

| REQ-SEC-060 | Las URLs de redirección se validan como internas (no esquema, empiezan con `/`) |
|---|---|
| REQ-SEC-061 | Intentos de redirect externo se loguean y redirigen a página por defecto |

### 4.8 Logging de Seguridad

| REQ-SEC-070 | Todos los eventos de seguridad se registran en archivos de log |
|---|---|
| REQ-SEC-071 | Se registra: IP, URL, método, username para cada evento |
| REQ-SEC-072 | Los errores fatales de PHP se capturan y devuelven respuesta JSON 500 genérica |
| REQ-SEC-073 | En producción: `display_errors=0` |

### 4.9 CORS (Cross-Origin Resource Sharing)

| REQ-SEC-080 | Todos los endpoints API devuelven `Access-Control-Allow-Origin` con el valor de `BASE_URL` |
|---|---|
| REQ-SEC-081 | Se permiten credenciales cross-origin (`Access-Control-Allow-Credentials: true`) |
| REQ-SEC-082 | Métodos permitidos: `GET, POST, OPTIONS` |
| REQ-SEC-083 | Headers personalizados permitidos: `Content-Type, X-Requested-With, X-CSRF-Token` |
| REQ-SEC-084 | Las peticiones OPTIONS (preflight) se resuelven en `_bootstrap.php` con 204 No Content |

### 4.10 Middleware de Validación Centralizado

| REQ-SEC-090 | Existe `middleware.php` con funciones reutilizables para auth, CSRF, rate limit y validación |
|---|---|
| REQ-SEC-091 | `requireCsrf()` valida tanto `$_POST['csrf_token']` como header `X-CSRF-Token` |
| REQ-SEC-092 | `requireCsrfUnlessOffline()` permite bypass de CSRF para sync offline (campo `_offline_sync`) |
| REQ-SEC-093 | `requireAuth()` / `requireAdmin()` centralizan la verificación de sesión y rol |
| REQ-SEC-094 | `requireMaxBodySize()` limita el tamaño del body a 1MB por defecto |

### 4.11 Soft Delete de Usuarios

| REQ-SEC-100 | El borrado de cuenta realiza soft delete: `deleted_at=NOW()`, `activo=0` |
|---|---|
| REQ-SEC-101 | Los datos personales se anonimizan al soft delete (username, email, nombre) |
| REQ-SEC-102 | Las queries de auth filtran `WHERE deleted_at IS NULL` |
| REQ-SEC-103 | Tras `SOFT_DELETE_RETENTION_DAYS` (30 días), el cron ejecuta hard delete con CASCADE |

### 4.12 Rate Limiting Global API

| REQ-SEC-110 | Rate limit global: 100 req/min por IP para todos los endpoints API |
|---|---|
| REQ-SEC-111 | Exentos: cron jobs (CLI/token) y SSE (conexiones long-lived) |
| REQ-SEC-112 | Body size > 1MB rechazado con HTTP 413 antes de procesamiento |

### 4.13 Separación de AJAX Handlers

| REQ-ARCH-001 | Handlers AJAX extraídos a `app/pages/handlers/` para reducir tamaño de archivos de página |
|---|---|
| REQ-ARCH-002 | `estadisticas_ajax.php`: búsqueda, actualización, gestión de usuarios admin, emails recordatorio |
| REQ-ARCH-003 | `csv_import_handler.php`: 3 pasos de importación CSV (upload, process, import) + plantilla |
| REQ-ARCH-004 | Archivos padre incluyen handlers con `require_once`, variables de scope compartidas |

### 4.14 Auditoría de Índices

| REQ-DB-010 | Script `data/audit_indices.sql` con 5 consultas diagnósticas para detección de índices redundantes |
|---|---|
| REQ-DB-011 | Incluye: duplicados, no usados, tablas sobre-indexadas, sin PK, baja cardinalidad |

---

## 5. Módulo de Autenticación

### 5.1 Login Local (login.php)

| ID | Requisito |
|---|---|
| REQ-AUTH-001 | El usuario puede autenticarse con username y contraseña |
| REQ-AUTH-002 | Si el usuario ya está logueado, se redirige a `resumenAnual.php` |
| REQ-AUTH-003 | Si la suscripción está expirada tras login exitoso, se redirige a `suscripcion.php` |
| REQ-AUTH-004 | El campo username se sanitiza con `sanitizeString()` |
| REQ-AUTH-005 | La contraseña NO se sanitiza (comparación directa contra hash) |
| REQ-AUTH-006 | Tras login exitoso se actualiza `ultimo_acceso` en BD |
| REQ-AUTH-007 | Tras login exitoso se limpian los intentos fallidos de la IP |
| REQ-AUTH-008 | La sesión se regenera en login exitoso |
| REQ-AUTH-009 | Se almacena en sesión: `user_id`, `username`, `user_email`, `user_role`, `password_hash` |
| REQ-AUTH-010 | Si la IP está bloqueada (10 intentos en 30 min), se muestra tiempo restante en minutos |
| REQ-AUTH-011 | Se soporta parámetro `?redirect=` para redirección post-login (validado como URL interna) |
| REQ-AUTH-012 | Se muestra mensaje "Tu cuenta ha sido eliminada correctamente" cuando `?deleted=1` |
| REQ-AUTH-013 | Todos los intentos (exitosos, fallidos, bloqueados, CSRF inválido) se loguean con IP |

### 5.2 Login con Google OAuth

| ID | Requisito |
|---|---|
| REQ-AUTH-020 | El usuario puede iniciar sesión con Google OAuth 2.0 |
| REQ-AUTH-021 | Se usa parámetro `state` en OAuth para protección CSRF |
| REQ-AUTH-022 | El `state` se verifica con `hash_equals()` (timing-safe) contra el almacenado en sesión y es de un solo uso |
| REQ-AUTH-023 | Se requiere email verificado de Google (`email_verified=true`) |
| REQ-AUTH-024 | Si el Google ID coincide con un usuario existente → login directo |
| REQ-AUTH-025 | Si el email coincide con un usuario existente (sin Google ID) → vinculación automática + login |
| REQ-AUTH-026 | Si no hay coincidencia → redirige a formulario de completar registro |
| REQ-AUTH-027 | Las llamadas a Google API usan verificación SSL (`verify_peer=true`) |
| REQ-AUTH-028 | Timeout de 30 segundos para llamadas a Google API |

### 5.3 Vinculación de Cuenta Google (desde perfil)

| ID | Requisito |
|---|---|
| REQ-AUTH-030 | Un usuario autenticado puede vincular su cuenta con Google desde `?action=google_link` |
| REQ-AUTH-031 | Se verifica que el Google ID no esté ya vinculado a otra cuenta Budgetix |
| REQ-AUTH-032 | Tras vinculación, se actualiza `google_id` y `avatar_url` del usuario |
| REQ-AUTH-033 | Se redirige a `perfil.php` con mensaje de éxito/error |

### 5.4 Logout

| ID | Requisito |
|---|---|
| REQ-AUTH-040 | Logout destruye toda la sesión (`$_SESSION = []`) |
| REQ-AUTH-041 | Se elimina la cookie de sesión |
| REQ-AUTH-042 | Se llama a `session_destroy()` |
| REQ-AUTH-043 | Se redirige a `login.php` |

### 5.5 Verificación de Sesión Activa

| ID | Requisito |
|---|---|
| REQ-AUTH-050 | `is_user_logged_in()` verifica `user_id` y `username` en sesión |
| REQ-AUTH-051 | Cada 5 minutos se verifica que el hash de contraseña no haya cambiado en BD |
| REQ-AUTH-052 | Si la contraseña cambió en BD, la sesión se invalida automáticamente |
| REQ-AUTH-053 | Todas las páginas protegidas llaman a `require_login()` que redirige a login si no autenticado |

---

## 6. Módulo de Registro

### 6.1 Registro Local (register.php)

| ID | Requisito |
|---|---|
| REQ-REG-001 | Si el usuario ya está logueado, se redirige a `resumenAnual.php` |
| REQ-REG-002 | **Username**: requerido, 3–50 caracteres, solo `[a-z0-9_]` (minúsculas, números, guiones bajos) |
| REQ-REG-003 | **nombre_completo**: opcional, máximo 100 caracteres |
| REQ-REG-004 | **Email**: requerido, formato válido (`FILTER_VALIDATE_EMAIL`) |
| REQ-REG-005 | **Contraseña**: requerida, mínimo 8 caracteres, fortaleza ≥ 2 (al menos 2 de: minúsculas, mayúsculas, números, caracteres especiales) |
| REQ-REG-006 | **Confirmar contraseña**: debe coincidir exactamente |
| REQ-REG-007 | Username y email deben ser únicos en BD; se muestra mensaje genérico “El nombre de usuario o email ya están en uso” (anti-enumeración) |
| REQ-REG-008 | La contraseña se hashea con `password_hash(PASSWORD_DEFAULT)` (bcrypt) |
| REQ-REG-009 | Los nuevos usuarios reciben **trial de 1 año** (`estado_suscripcion='trial'`, `fecha_fin_trial=+1 año`) |
| REQ-REG-010 | Tras registro exitoso, redirección automática a `login.php` en 2 segundos |
| REQ-REG-011 | Se envía notificación por email al administrador (`notificarAdminNuevoUsuario()`) |
| REQ-REG-012 | Rate limit: máximo 3 registros por IP en 10 minutos |

### 6.2 Registro vía Google OAuth (google-complete-registration.php)

| ID | Requisito |
|---|---|
| REQ-REG-020 | Requiere `google_pending_registration` en sesión (establecido por google-callback) |
| REQ-REG-021 | Si no existe la sesión pendiente, redirige a login |
| REQ-REG-022 | Pre-rellena username sugerido y nombre completo desde datos de Google |
| REQ-REG-023 | **Username**: mismas reglas que registro local (3–50 chars, `[a-z0-9_]`) |
| REQ-REG-024 | **Contraseña**: opcional. Si se proporciona: min 8 chars, debe coincidir con confirmación |
| REQ-REG-025 | Si se proporciona contraseña → `auth_provider='local'` (permite login con ambos métodos) |
| REQ-REG-026 | Si NO se proporciona contraseña → se genera contraseña aleatoria de 32 chars + `auth_provider='google'` |
| REQ-REG-027 | Trial de 1 año igual que registro local |
| REQ-REG-028 | Tras creación → auto-login (sesión configurada) → redirige a `resumenAnual.php` |
| REQ-REG-029 | Se notifica al administrador del nuevo usuario |
| REQ-REG-030 | Generación de username: nombre Google → minúsculas, sin acentos, sin caracteres especiales, max 20 chars; si existe → añade sufijo numérico o `bin2hex(random_bytes(3))` |

### 6.3 Validación Client-Side del Registro

| ID | Requisito |
|---|---|
| REQ-REG-040 | Username: auto-conversión a minúsculas, eliminación de acentos (`normalize('NFD')`), eliminación de caracteres no permitidos en tiempo real |
| REQ-REG-041 | Medidor de fortaleza de contraseña con 4 niveles visuales |
| REQ-REG-042 | Indicador de coincidencia de contraseñas en tiempo real |
| REQ-REG-043 | El botón de envío se bloquea si fortaleza < 2 o contraseñas no coinciden |

---

## 7. Módulo de Recuperación de Contraseña

### 7.1 Solicitud de Recuperación (recuperar_password.php)

| ID | Requisito |
|---|---|
| REQ-PWD-001 | El usuario puede solicitar recuperación con username O email |
| REQ-PWD-002 | Solo se buscan usuarios activos (`activo=1`) |
| REQ-PWD-003 | Se genera token de 64 caracteres hex (`bin2hex(random_bytes(32))`) |
| REQ-PWD-004 | En BD se almacena el hash SHA-256 del token (nunca el token en texto plano) |
| REQ-PWD-005 | El token expira en **1 hora** |
| REQ-PWD-006 | Se envía email con enlace conteniendo el token en texto plano |
| REQ-PWD-007 | **Anti-enumeración**: si el usuario no existe, se muestra mensaje genérico "Si el usuario existe, se enviará un correo" |
| REQ-PWD-008 | Rate limit: 3 intentos en 10 minutos |
| REQ-PWD-009 | Si el email falla: en desarrollo (`APP_ENV=local/development`) se muestra el enlace de reset; en producción se muestra mensaje genérico sin exponer el enlace |

### 7.2 Restablecimiento de Contraseña (restablecer_password.php)

| ID | Requisito |
|---|---|
| REQ-PWD-010 | El token llega como parámetro GET `?token=` |
| REQ-PWD-011 | El token se hashea con SHA-256 y se compara contra BD |
| REQ-PWD-012 | El token debe estar sin usar (`used=0`) y no expirado (`expiry_date > NOW()`) |
| REQ-PWD-013 | Nueva contraseña: mínimo 8 caracteres, fortaleza ≥ 2 |
| REQ-PWD-014 | Confirmación debe coincidir |
| REQ-PWD-015 | Tras reset exitoso: token marcado como `used=1` |
| REQ-PWD-016 | Contraseña hasheada con `password_hash(PASSWORD_DEFAULT)` |
| REQ-PWD-017 | Redirección automática a `login.php` en 3 segundos tras éxito |

### 7.3 Cambio de Contraseña (cambiar_password.php)

| ID | Requisito |
|---|---|
| REQ-PWD-020 | Requiere autenticación (redirige a login si no logueado) |
| REQ-PWD-021 | Se debe proporcionar: contraseña actual, nueva contraseña, confirmación |
| REQ-PWD-022 | La contraseña actual se verifica con `password_verify()` contra hash en BD |
| REQ-PWD-023 | Nueva contraseña: mínimo 8 caracteres |
| REQ-PWD-024 | Tras cambio exitoso: `session_regenerate_id(true)` |
| REQ-PWD-025 | Se actualiza `$_SESSION['password_hash']` para invalidar otras sesiones activas |
| REQ-PWD-026 | Se muestra mensaje "Las demás sesiones activas han sido cerradas" |
| REQ-PWD-027 | Rate limit: 3 intentos en 10 minutos |

---

## 8. Módulo de Suscripciones y Pagos

### 8.1 Estados de Suscripción

| Estado | Descripción |
|---|---|
| `trial` | Período de prueba (1 año desde registro) |
| `active` | Suscripción activa con pago confirmado |
| `expired` | Suscripción o trial expirado |
| `administrador` (rol) | Licencia ilimitada, sin restricciones de suscripción |

### 8.2 Requisitos de Suscripción (suscripcion.php)

| ID | Requisito |
|---|---|
| REQ-SUB-001 | Los administradores ven "Licencia ilimitada" y no necesitan suscripción |
| REQ-SUB-002 | Se muestra el estado actual: activa (con fecha fin), trial (con días restantes), o expirada |
| REQ-SUB-003 | Se muestran los planes disponibles desde tabla `planes_suscripcion` |
| REQ-SUB-004 | Plan por defecto: "Plan Completo" — 1,99€/mes o 19,99€/año |
| REQ-SUB-005 | El usuario puede solicitar suscripción eligiendo: período (mensual/anual), método de pago (Bizum/transferencia), teléfono |
| REQ-SUB-006 | **Validación de teléfono**: regex `/^[0-9]{9,15}$/` |
| REQ-SUB-007 | Se verifica que no exista ya una solicitud pendiente |
| REQ-SUB-008 | Se crea registro en `pagos_suscripcion` con `estado='pendiente'` |
| REQ-SUB-009 | Se envía email al administrador con los datos de la solicitud |
| REQ-SUB-010 | Soporte de renovación: usuarios activos pueden renovar (período comienza tras el actual) |

### 8.3 Verificación Post-Login

| ID | Requisito |
|---|---|
| REQ-SUB-020 | Tras login exitoso se ejecuta `checkSubscriptionStatus()` |
| REQ-SUB-021 | Si trial/suscripción expirada → redirige a `suscripcion.php` en lugar de dashboard |
| REQ-SUB-022 | Los administradores siempre pasan la verificación |

---

## 9. Módulo de Ingresos, Gastos y Ahorros

### 9.1 Añadir Movimientos (anadirIngresoGasto.php)

| ID | Requisito |
|---|---|
| REQ-MOV-001 | Se pueden añadir movimientos de tipo: Ingresos, Gastos, Ahorros |
| REQ-MOV-002 | Campos requeridos: tipo, mes, año, categoría, subcategoría, cantidad |
| REQ-MOV-003 | Campo opcional: concepto (descripción libre, VARCHAR 255) |
| REQ-MOV-004 | **Cantidades negativas** solo permitidas para tipo Ahorros |
| REQ-MOV-005 | Año: entero entre 2020 y año actual + 1 |
| REQ-MOV-006 | El tipo, mes, categoría y subcategoría se validan contra listas enum permitidas |
| REQ-MOV-007 | Si la subcategoría es fija (`esSubcategoriaFijaUsuario()`), se marca `gasto_fijo=1` automáticamente |
| REQ-MOV-008 | Se valida que el usuario existe en BD (`validateUserExists()`) antes de insertar |
| REQ-MOV-009 | Rate limit: 10 inserciones por minuto |

### 9.2 Gasto Anual / Ahorro Anual

| ID | Requisito |
|---|---|
| REQ-MOV-010 | Si `gasto_anual=1`: se duplica el registro en los 12 meses del año |
| REQ-MOV-011 | Si `ahorro_anual=1`: se duplica el registro en los 12 meses del año |
| REQ-MOV-012 | Para gasto anual: se verifica que no exista un registro duplicado (misma cat, subcat, concepto, cantidad, mes, año) antes de insertar cada mes (lógica upsert) |
| REQ-MOV-013 | La cantidad para gasto/ahorro anual NO se divide entre 12 — se replica completa en cada mes |

### 9.3 Caso Especial: Intereses

| ID | Requisito |
|---|---|
| REQ-MOV-020 | Si el tipo es "Ingresos" y categoría="Otros" y subcategoría="Intereses": se crea automáticamente un registro espejo en "Ahorros > Cuentas > Bancaria" con la misma cantidad |

### 9.4 Vinculación con Metas

| ID | Requisito |
|---|---|
| REQ-MOV-030 | Un movimiento de tipo Ahorros puede vincularse a una meta activa |
| REQ-MOV-031 | Al vincular: se crea entrada en `metas_aportaciones` y se actualiza `cantidad_actual` de la meta |
| REQ-MOV-032 | Si la cantidad acumulada alcanza/supera el objetivo, la meta se marca como completada automáticamente |

### 9.5 Búsqueda y Eliminación

| ID | Requisito |
|---|---|
| REQ-MOV-040 | Búsqueda AJAX: muestra últimos 30 registros o filtra por término (mínimo 3 caracteres) |
| REQ-MOV-041 | Búsqueda en campos: concepto, categoría, subcategoría (LIKE %term%) |
| REQ-MOV-042 | La eliminación de registros está en `resumenAnual.php` (ver sección 10) |

### 9.6 Sincronización Offline

| ID | Requisito |
|---|---|
| REQ-MOV-050 | Las operaciones se pueden ejecutar offline (detectado por header `X-Offline-Sync` o campo `_offline_sync`) |
| REQ-MOV-051 | Las operaciones offline se encolan en IndexedDB y se sincronizan al volver online |

### 9.7 Post-Inserción

| ID | Requisito |
|---|---|
| REQ-MOV-060 | Tras cada inserción se ejecuta `verificarTodosLosLogros()` |
| REQ-MOV-061 | Tras cada inserción se actualiza `cache_resumen_mensual` via `actualizarCacheResumen()` |

---

## 10. Módulo de Resumen Anual

### 10.1 Dashboard (resumenAnual.php)

| ID | Requisito |
|---|---|
| REQ-RES-001 | Muestra tabla de 12 columnas (meses) con filas para: ingresos, gastos, ahorros, gastos fijos |
| REQ-RES-002 | Muestra balance mensual = ingresos - gastos - ahorros |
| REQ-RES-003 | Gráfico de evolución del balance mensual (Chart.js) |
| REQ-RES-004 | Selector de año con todos los años que tienen datos |
| REQ-RES-005 | Para el año actual: el mes de referencia es el mes actual |
| REQ-RES-006 | Para años pasados: el mes de referencia es el último mes con datos |
| REQ-RES-007 | Tarjetas KPI con estadísticas resumidas |
| REQ-RES-008 | Muestra el mayor gasto individual del año (categoría, subcategoría, mes) |
| REQ-RES-009 | ~~Muestra los últimos 10 registros añadidos~~ *(eliminado — redundante con la sección de búsqueda en Añadir Ingreso/Gasto)* |
| REQ-RES-010 | Utiliza sistema de caché para datos optimizados |
| REQ-RES-011 | Sección **Límites de Gasto por Categoría**: permite configurar límites mensuales por categoría con alertas al 80% y 100% |
| REQ-RES-012 | Las tarjetas de límite muestran: barra de progreso, porcentaje, importe gastado/límite, nivel (ok/warning/exceeded) |
| REQ-RES-013 | Niveles: verde (< 80%), ámbar (≥ 80%), rojo (≥ 100% — superado) |
| REQ-RES-014 | Límites configurables vía modal: categoría, importe mensual, alertas opcionales al 80% y 100% |

### 10.2 Eliminación de Registros

| ID | Requisito |
|---|---|
| REQ-RES-020 | Se pueden eliminar registros por ID via AJAX (`eliminarRegistroInteligente()`) o POST tradicional |
| REQ-RES-021 | Solo se pueden eliminar registros propios del usuario |
| REQ-RES-022 | Tras eliminación: se actualiza el caché del resumen mensual |

---

## 11. Módulo de Informes Anuales

| ID | Requisito |
|---|---|
| REQ-INF-001 | Muestra tabla comparativa multi-año: Ingresos, Gastos, Balance, Saldo Total por año |
| REQ-INF-002 | Saldo Total = suma acumulativa de balances hasta cada año |
| REQ-INF-003 | Desglose de ingresos por categoría y año con totales y promedios |
| REQ-INF-004 | Desglose de gastos por categoría y año con totales y promedios |
| REQ-INF-005 | Los promedios se calculan solo sobre años completados (excluyen año actual) |
| REQ-INF-006 | Gráficos de evolución year-over-year (Chart.js) |
| REQ-INF-007 | Colores: verde para balances positivos, rojo para negativos |

---

## 12. Módulo de Estadísticas

| ID | Requisito |
|---|---|
| REQ-EST-001 | Muestra comparativa multi-usuario de ingresos y gastos |
| REQ-EST-002 | Para el año actual, solo cuenta hasta el mes actual (comparación justa) |
| REQ-EST-003 | Filtra años ≥ 2025 |
| REQ-EST-004 | **Búsqueda**: Los usuarios normales solo buscan en sus propios registros (`WHERE id_usuario = ?`). Los admins buscan en registros de todos los usuarios (JOIN con usuarios). Retorna hasta 100 resultados |
| REQ-EST-005 | **Edición de registros**: admins pueden editar registros de cualquier usuario; usuarios normales solo los suyos |
| REQ-EST-006 | Campos editables: tipo, mes, categoría, subcategoría, concepto, cantidad, gasto_compartido |

---

## 13. Módulo de Gastos Compartidos

### 13.1 Requisitos de Acceso

| ID | Requisito |
|---|---|
| REQ-GC-001 | Requiere tener un grupo de gastos compartidos activo (pareja asignada) |
| REQ-GC-002 | Si no hay grupo activo: se muestra formulario de solicitud |
| REQ-GC-003 | La solicitud requiere username del compañero + mensaje opcional (al admin) |
| REQ-GC-004 | Username del compañero: validación regex `[a-z0-9_]+`, 3–50 chars |
| REQ-GC-005 | No se puede solicitar emparejamiento consigo mismo |
| REQ-GC-006 | El compañero debe existir y estar activo en BD |
| REQ-GC-007 | Ninguno de los dos puede tener ya gastos compartidos configurados |
| REQ-GC-008 | Ninguno de los dos puede tener solicitudes pendientes (como solicitante o como objetivo) |
| REQ-GC-009 | Estados de solicitud: pendiente → aprobada / rechazada |
| REQ-GC-010 | La aprobación/rechazo es gestionada por un administrador |

### 13.2 Operaciones de Gastos Compartidos

| ID | Requisito |
|---|---|
| REQ-GC-020 | **Gasto compartido (50/50)**: Se divide la cantidad entre ambos usuarios, insertando en `presupuestos` de ambos con `gasto_compartido=1` |
| REQ-GC-021 | **Gasto único (100% al compañero)**: La cantidad completa se asigna al compañero; se registra en `deuda_saldada` |
| REQ-GC-022 | Se registra `pagado_por` en cada registro |
| REQ-GC-023 | Las subcategorías fijas se detectan automáticamente |
| REQ-GC-024 | **Eliminar gasto compartido**: elimina de presupuestos de ambos usuarios |
| REQ-GC-025 | **Eliminar gasto único**: elimina del compañero |
| REQ-GC-026 | **Saldar deuda**: permite liquidar deudas entre usuarios |
| REQ-GC-027 | Se generan notificaciones al compañero en cada operación (crear, eliminar) |

---

## 14. Módulo de Metas Financieras

### 14.1 Gestión de Metas (metas.php)

| ID | Requisito |
|---|---|
| REQ-META-001 | Tipos de meta: ahorro, compra, vivienda, viaje, inversión, deuda, emergencia, personalizada |
| REQ-META-002 | Prioridades: alta, media, baja (afecta orden de visualización) |
| REQ-META-003 | Estados: activa → pausada / completada / cancelada |
| REQ-META-004 | Campos: nombre (requerido), tipo, descripción, cantidad_objetivo (>0, requerida), cantidad_actual (inicial), fecha_inicio, fecha_objetivo, prioridad, icono, color, imagen_url |
| REQ-META-005 | Porcentaje de progreso = `(cantidad_actual / cantidad_objetivo) × 100` |
| REQ-META-006 | Días restantes calculados desde `fecha_objetivo` |
| REQ-META-007 | Fecha de completación se establece automáticamente al cambiar estado a "completada" |

### 14.2 Aportaciones

| ID | Requisito |
|---|---|
| REQ-META-010 | Se pueden añadir aportaciones manuales a una meta activa |
| REQ-META-011 | Cada aportación actualiza `cantidad_actual` de la meta |
| REQ-META-012 | Si `cantidad_actual ≥ cantidad_objetivo`, la meta se marca como completada |
| REQ-META-013 | Se pueden eliminar aportaciones (revierte la cantidad) |
| REQ-META-014 | Tipos de aportación: manual, automática, vinculada (a presupuesto) |

### 14.3 Eliminación de Metas

| ID | Requisito |
|---|---|
| REQ-META-020 | Al eliminar una meta: se eliminan presupuestos vinculados, aportaciones, y la meta (transaccional) |

### 14.4 Gamificación

| ID | Requisito |
|---|---|
| REQ-META-030 | Se ejecuta `verificarLogrosMetas()` al crear o cambiar estado de una meta |

---

## 15. Módulo de Logros y Gamificación

### 15.1 Sistema de Puntos y Niveles

| ID | Requisito |
|---|---|
| REQ-LOG-001 | Cada logro otorga puntos (5–1000 según dificultad) |
| REQ-LOG-002 | Niveles 1–10 basados en puntos acumulados: Principiante(0), Aprendiz(100), Conocedor(250), Experto(500), Maestro(1000), Gurú(2000), Leyenda(3500), Élite(5500), Campeón(8000), Leyenda Suprema(11000) |
| REQ-LOG-003 | Más allá del nivel 10: "Leyenda Suprema +N" cada 3000 puntos adicionales |
| REQ-LOG-004 | Barra de progreso: muestra experiencia en nivel actual vs. siguiente |

### 15.2 Sistema de Rachas

| ID | Requisito |
|---|---|
| REQ-LOG-010 | Se registra actividad diaria (1 entrada por usuario/día) |
| REQ-LOG-011 | Racha = días consecutivos con actividad |
| REQ-LOG-012 | Si se pierde un día, la racha se reinicia a 1 |
| REQ-LOG-013 | Se guarda la mejor racha histórica |
| REQ-LOG-014 | Milestones de racha: 3, 7, 14, 30, 60, 90, 180, 365 días |

### 15.3 Catálogo de Logros (54 predefinidos)

| Categoría | Logros | Descripción |
|---|---|---|
| **Ahorro** (9) | primer_ahorro → ahorro_100k | De 0,01€ a 100.000€ en ahorros acumulados |
| **Reducción** (5) | reduccion_10 → categoria_controlada | Reducción de gastos 10%–50%, gastos hormiga, categoría controlada |
| **Ingresos** (4) | primer_ingreso → diversificacion | Primer ingreso, ingreso extra, aumento 10%, 3+ fuentes |
| **Metas** (5) | primera_meta → diez_metas | Crear meta, completar 1/5/10, completar anticipada |
| **Constancia** (13) | racha_3 → registros_1000 | Rachas 3–365 días, registros 1–1000 |
| **Balance** (7) | balance_positivo_1 → ahorro_mes_50 | 1–12 meses balance positivo, ahorro 20%–50% de ingresos |
| **Categorías** (3) | todas_categorias → presupuesto_cumplido | 5+ categorías, categoría cero, presupuesto cumplido |
| **Especiales** (8) | bienvenida → noctambulo | Bienvenida, perfil completo, año nuevo, aniversario 1–2 años, madrugador (<7h), noctámbulo (≥23h), fin de semana |

### 15.4 Niveles de Dificultad

| Nivel | Color | Ejemplos |
|---|---|---|
| Bronce | #CD7F32 | Primeros pasos, registros básicos |
| Plata | #C0C0C0 | Milestones intermedios |
| Oro | #FFD700 | Logros avanzados |
| Platino | #E5E4E2 | Logros de élite |
| Diamante | #B9F2FF | Logros supremos |

### 15.5 Requisitos de Verificación

| ID | Requisito |
|---|---|
| REQ-LOG-020 | Los logros se verifican automáticamente al cargar la página de logros |
| REQ-LOG-021 | Los logros se verifican tras cada inserción de movimiento |
| REQ-LOG-022 | Los logros se verifican tras cambios en metas |
| REQ-LOG-023 | Los logros son de única obtención (UNIQUE KEY usuario+logro) |
| REQ-LOG-024 | Los logros nuevos (no vistos) generan toast de notificación |
| REQ-LOG-025 | El usuario puede marcar logros como "vistos" |

### 15.6 Ranking

| ID | Requisito |
|---|---|
| REQ-LOG-030 | Ranking global de usuarios por puntos totales |
| REQ-LOG-031 | Se muestra: posición, username, puntos, nivel, total logros |
| REQ-LOG-032 | Límite configurable (por defecto top 10) |

---

## 16. Módulo de Carreras

| ID | Requisito |
|---|---|
| REQ-CAR-001 | Registro de carreras/eventos deportivos con: nombre, tipología, distancia, fecha, precio, estado |
| REQ-CAR-002 | Tipologías: Asfalto, Trail, OCR |
| REQ-CAR-003 | Estados de pago: pagada, no_pagada, no_puedo_ir |
| REQ-CAR-004 | Posiciones: general y categoría (enteros opcionales) |
| REQ-CAR-005 | Al marcar como "pagada": trigger inserta gasto en presupuestos (`Gastos > Deporte > Carreras`) |
| REQ-CAR-006 | Al desmarcar "pagada" o eliminar: trigger elimina gasto de presupuestos |
| REQ-CAR-007 | Visualización por año con selector |
| REQ-CAR-008 | Gráficos con Chart.js + datalabels |
| REQ-CAR-009 | Edición inline: precio, posiciones, estado |
| REQ-CAR-010 | Rate limit: 10 operaciones por minuto |

---

## 17. Módulo de Vehículos y Revisiones

### 17.1 Gestión de Vehículos (anadirRevisiones.php)

| ID | Requisito |
|---|---|
| REQ-VEH-001 | Registro de vehículos con: marca, modelo, año, kms actuales, tipo (Coche/Moto) |
| REQ-VEH-002 | Un usuario puede tener múltiples vehículos |
| REQ-VEH-003 | Rate limit: 5 vehículos por minuto |

### 17.2 Libro de Mantenimiento

| ID | Requisito |
|---|---|
| REQ-VEH-010 | Cada vehículo tiene un libro de mantenimiento con tareas planificadas |
| REQ-VEH-011 | Cada tarea indica: nombre, intervalo en km, notas |
| REQ-VEH-012 | Se calcula "próximo cambio" = último km de la tarea + intervalo |

### 17.3 Mantenimientos Realizados

| ID | Requisito |
|---|---|
| REQ-VEH-020 | Registro de servicios: vehículo, fecha, concepto, precio, km, notas |
| REQ-VEH-021 | Trigger inserta gasto en presupuestos (`Gastos > [Coche/Moto] > Mantenimiento`) |
| REQ-VEH-022 | Al eliminar: trigger elimina gasto de presupuestos |
| REQ-VEH-023 | Si los km del servicio > km actuales del vehículo: se actualizan los km |
| REQ-VEH-024 | Rate limit: 10 servicios por minuto |

### 17.4 Repostajes

| ID | Requisito |
|---|---|
| REQ-VEH-030 | Registro de repostajes: vehículo, fecha, litros, precio total, km, precio/litro (calculado), gasolinera (opcional) |
| REQ-VEH-031 | `precio_litro` se calcula automáticamente como `precio / litros` |
| REQ-VEH-032 | Trigger inserta gasto en presupuestos (`Gastos > [Coche/Moto] > Combustible`) |
| REQ-VEH-033 | Trigger actualiza km del vehículo |
| REQ-VEH-034 | Al eliminar: trigger ajusta km (busca máximo entre repostajes y mantenimientos restantes) |

### 17.5 Indicadores (revisiones.php)

| ID | Requisito |
|---|---|
| REQ-VEH-040 | Consumo medio = `(litros / (km_actual - km_anterior)) × 100` |
| REQ-VEH-041 | KPIs: consumo medio anual, consumo medio total, gasto en mantenimiento, gasto en combustible |
| REQ-VEH-042 | Barra de vida del vehículo basada en km y antigüedad |
| REQ-VEH-043 | Paginación de resultados (10 por página por defecto) |

---

## 18. Módulo de Portfolio de Inversiones

| ID | Requisito |
|---|---|
| REQ-PORT-001 | Registro de posiciones con: ticker (abreviatura), inversión, venta, dividendo, beneficio/pérdida, rentabilidad, año |
| REQ-PORT-002 | `beneficioPerdida` = venta + dividendo - inversión (calculado client-side) |
| REQ-PORT-003 | `rentabilidad` = `(beneficio / inversión) × 100` (calculado client-side) |
| REQ-PORT-004 | `ganPer`: 1 = ganadora, 0 = perdedora (auto-determinado) |
| REQ-PORT-005 | Trigger on INSERT: crea registro en `Ingresos > Inversiones > [Plusvalías/Dividendos]` + `Ahorros > Cuentas > Bancaria` |
| REQ-PORT-006 | Si solo hay dividendo (inversión=0, venta=0) → subcategoría "Dividendos"; si hay inversión/venta → "Plusvalías" |
| REQ-PORT-007 | Trigger on UPDATE: elimina registros antiguos y crea actualizados |
| REQ-PORT-008 | Trigger on DELETE: elimina registros de presupuestos asociados |
| REQ-PORT-009 | Resumen anual: inversión total, ventas, dividendos, beneficio, rentabilidad media, posiciones ganadoras/perdedoras |
| REQ-PORT-010 | Totales globales (todos los años) |
| REQ-PORT-011 | Gráficos: evolución de ventas por año, desglose tipo pie |
| REQ-PORT-012 | Últimas 30 posiciones listadas |

---

## 19. Módulo de Salarios

| ID | Requisito |
|---|---|
| REQ-SAL-001 | Registro de salarios por año y persona: sueldo_bruto, sueldo_mensual_14 pagas, sueldo_mensual_12 pagas, bonus, variable, IRPF% |
| REQ-SAL-002 | `total_año` se auto-calcula: `(sueldo_mensual_14 × 14) + bonus + variable` |
| REQ-SAL-003 | Edición inline vía AJAX de cualquier campo |
| REQ-SAL-004 | Al editar sueldo_mensual_14, bonus o variable: se recalcula total_año automáticamente |
| REQ-SAL-005 | Listado ordenado por año descendente |
| REQ-SAL-006 | Rate limit: 5 operaciones por minuto |

---

## 20. Módulo de Sueldo Neto

| ID | Requisito |
|---|---|
| REQ-NET-001 | Calculadora 100% client-side (sin interacción con servidor) |
| REQ-NET-002 | Input: salario bruto anual, número de pagas (12 o 14) |
| REQ-NET-003 | Output: mensual neto, paga extra, %IRPF, total IRPF, anual neto |
| REQ-NET-004 | Usa tramos fiscales españoles (implementados en `sueldoNeto.js`) |

---

## 21. Módulo de Categorías Personalizadas

### 21.1 Sistema de Categorías

| ID | Requisito |
|---|---|
| REQ-CAT-001 | Tres tipos de categorías: Gastos, Ingresos, Ahorros (tabs separados) |
| REQ-CAT-002 | Existen 24 categorías del sistema predefinidas con iconos y colores por defecto |
| REQ-CAT-003 | Las categorías del sistema se pueden activar/desactivar (toggle, no eliminar) |
| REQ-CAT-004 | Las categorías del sistema se pueden personalizar: icono, color, orden, favorita |
| REQ-CAT-005 | Se pueden crear categorías personalizadas con: nombre (único por usuario+tipo), icono, color |
| REQ-CAT-006 | Las categorías personalizadas se pueden editar y eliminar |
| REQ-CAT-007 | Orden de visualización: Activas primero → Favoritas primero → Orden configurado |

### 21.2 Sistema de Subcategorías

| ID | Requisito |
|---|---|
| REQ-CAT-010 | Las categorías (sistema y custom) tienen subcategorías |
| REQ-CAT-011 | Las subcategorías del sistema se pueden activar/desactivar |
| REQ-CAT-012 | Se pueden crear subcategorías personalizadas vinculadas a categoría sistema o custom |
| REQ-CAT-013 | Las subcategorías custom tienen: nombre, icono, flag `es_gasto_fijo` |
| REQ-CAT-014 | Si `es_gasto_fijo=1`: los gastos con esa subcategoría se marcan automáticamente como fijos |
| REQ-CAT-015 | Las subcategorías personalizadas se pueden eliminar |

### 21.3 Disponibilidad (97 iconos, 20 colores)

| ID | Requisito |
|---|---|
| REQ-CAT-020 | 97 iconos FontAwesome disponibles para selección |
| REQ-CAT-021 | 20 colores predefinidos disponibles para categorías |

---

## 22. Módulo de Análisis Inteligente

### 22.1 Score de Salud Financiera

| ID | Requisito |
|---|---|
| REQ-AI-001 | Puntuación de 0 a 100, compuesta por 5 componentes ponderados |
| REQ-AI-002 | Componente 1 — Tasa de ahorro (25 pts): % ahorro sobre ingresos |
| REQ-AI-003 | Componente 2 — Meses con balance positivo (25 pts): últimos 12 meses |
| REQ-AI-004 | Componente 3 — Tendencia de gastos (20 pts): regresión lineal, premia tendencia bajista |
| REQ-AI-005 | Componente 4 — Diversificación (15 pts): variedad de categorías usadas |
| REQ-AI-006 | Componente 5 — Consistencia (15 pts): regularidad en registro de movimientos |
| REQ-AI-007 | Clasificación: Excelente ≥80, Bueno ≥60, Regular ≥40, Mejorable ≥20, Crítico <20 |
| REQ-AI-008 | Histórico de scores guardado mensualmente (gráfico de evolución) |

### 22.2 Predicción de Gastos

| ID | Requisito |
|---|---|
| REQ-AI-010 | Separa gastos fijos de gastos variables |
| REQ-AI-011 | Proyección = gastos fijos + (media diaria de variables × días restantes) |
| REQ-AI-012 | Media ponderada: 60% meses recientes + 40% mismo mes histórico |
| REQ-AI-013 | Muestra: gasto actual, media diaria (solo variables), proyección fin de mes, predicción histórica con % confianza |

### 22.3 Detección de Patrones

| ID | Requisito |
|---|---|
| REQ-AI-020 | Patrón de gasto por día de la semana (identifica días de mayor gasto) |
| REQ-AI-021 | Categoría dominante (donde se concentra el gasto) |
| REQ-AI-022 | Tendencia ingreso vs. gasto (evolución comparativa) |
| REQ-AI-023 | Patrón primera vs. segunda mitad del mes |

### 22.4 Detección de Anomalías

| ID | Requisito |
|---|---|
| REQ-AI-030 | Un gasto se considera anómalo si es ≥3× la media de su categoría |
| REQ-AI-031 | O si está a más de 2 desviaciones estándar de la media |

### 22.5 Consejos Personalizados

| ID | Requisito |
|---|---|
| REQ-AI-040 | Se generan hasta 8 consejos ordenados por prioridad (alta, media, baja) |
| REQ-AI-041 | 8 tipos de consejo: predicción, patrón, anomalía, sugerencia, comparativa, proyección, salud, contextual |
| REQ-AI-042 | **Consejos básicos**: alertas de predicción, mejora de score, comparativas año-a-año, anomalías por categoría, balance negativo |
| REQ-AI-043 | **Consejos de metas**: evaluación de riesgo (meta en riesgo / va bien), sugerencia de crear metas |
| REQ-AI-044 | **Consejos de gastos fijos**: alerta si fijos >70% de gastos; elogio si <30% |
| REQ-AI-045 | **Consejos estacionales**: Navidad (dic), Año Nuevo (ene), vuelta al cole (sep), fin/inicio de mes |
| REQ-AI-046 | **Consejos de salario**: alerta IRPF >25%, recordatorio Renta (abr-jun), sugerir registrar salario |
| REQ-AI-047 | **Consejos de vehículos**: mantenimiento pendiente (>180 días), combustible caro (>15€/100km) |
| REQ-AI-048 | **Consejos de gamificación**: racha ≥7 días, racha récord, cerca del siguiente nivel, logros sin ver |
| REQ-AI-049 | Deduplicación: no se repite el mismo consejo en 7 días |
| REQ-AI-050 | Sistema de feedback: el usuario puede marcar consejos como útil/no útil |

### 22.6 Ahorro Efectivo

| ID | Requisito |
|---|---|
| REQ-AI-060 | Combina movimientos de ahorro + progreso de metas |
| REQ-AI-061 | Muestra promedio mensual, total y tendencia |

---

## 23. Módulo de Datos a Recordar

| ID | Requisito |
|---|---|
| REQ-DAT-001 | CRUD de notas personales con: título, contenido, categoría |
| REQ-DAT-002 | Categorías: General, Trabajo, Personal, Otros |
| REQ-DAT-003 | Edición inline via `contenteditable` + AJAX save en blur |
| REQ-DAT-004 | Categoría editable via dropdown select |
| REQ-DAT-005 | Listado ordenado por fecha de creación descendente |
| REQ-DAT-006 | Campos editables restringidos a whitelist: `titulo`, `contenido`, `categoria` |

---

## 24. Módulo de Comunidad (Consumo Eléctrico)

| ID | Requisito |
|---|---|
| REQ-COM-001 | Tablas de consumo eléctrico y tarifas con scope por usuario (`id_usuario`) |
| REQ-COM-002 | Gestión de tarifas: CRUD con nombre único |
| REQ-COM-003 | No se puede eliminar una tarifa si está referenciada por registros de consumo |
| REQ-COM-004 | Registro de consumo: mes, año, tarifa, consumo_kw, importe |
| REQ-COM-005 | Un solo registro por combinación mes/año (prevención de duplicados) |
| REQ-COM-006 | KPIs: consumo medio y coste medio por tarifa |
| REQ-COM-007 | Valores mínimos/máximos de consumo y coste |
| REQ-COM-008 | Registros ordenados por año/mes descendente |
| REQ-COM-009 | Rate limit: 10 operaciones por minuto |

---

## 25. Módulo de TuWebCustom

| ID | Requisito |
|---|---|
| REQ-TW-001 | Gestión de pagos de dominios/hosting web con: dominio, día vencimiento, mes, importe, notas, estado pagado |
| REQ-TW-002 | Al marcar como "pagado": trigger inserta ingreso en presupuestos (`Ingresos > Webs > Mantenimiento`) |
| REQ-TW-003 | Al marcar como "no pagado": se elimina el registro de presupuestos correspondiente |
| REQ-TW-004 | Los registros son anuales-independientes (misma lista, estado de pago por año) |
| REQ-TW-005 | Selector de año para ver estados de pago de diferentes años |
| REQ-TW-006 | Rate limits: 10/min crear y eliminar, 20/min actualizar |

---

## 26. Módulo de Perfil de Usuario

| ID | Requisito |
|---|---|
| REQ-PER-001 | Edición de perfil: username (3–50 chars, único), email (formato válido, único), nombre_completo (max 100 chars) |
| REQ-PER-002 | Cambio de contraseña con verificación de contraseña actual |
| REQ-PER-003 | Validación de contraseña: min 8 chars, 1 mayúscula, 1 minúscula, 1 número |
| REQ-PER-004 | Vinculación/desvinculación de cuenta Google |
| REQ-PER-005 | **Eliminación de cuenta**: requiere escribir "ELIMINAR" como confirmación |
| REQ-PER-006 | La eliminación borra todos los datos relacionados en cascada (incluyendo `presupuestos` y `cache_resumen_mensual` que no tienen FK) |
| REQ-PER-007 | Muestra estado de suscripción: admin/active/trial/expired |
| REQ-PER-008 | Muestra historial de últimos 10 pagos |
| REQ-PER-009 | Rate limit para cambio de contraseña: 3 intentos en 10 minutos |
| REQ-PER-010 | **Exportación GDPR (Art. 20)**: botón "Descargar mis datos" genera ZIP con CSVs de todas las tablas del usuario |
| REQ-PER-011 | La exportación requiere verificación de contraseña actual antes de generar el ZIP |
| REQ-PER-012 | Rate limit para exportación: 1 por hora por usuario |
| REQ-PER-013 | El ZIP incluye: `indice.json` (metadata), `perfil.csv` (datos de usuario sin hash), CSV por cada tabla con datos (27 tablas posibles) |
| REQ-PER-014 | Prevención de CSV injection: celdas que empiezan por `=`, `+`, `-`, `@` se prefijan con comilla simple |
| REQ-PER-015 | El ZIP se genera en fichero temporal y se elimina inmediatamente tras envío — nunca se almacena en servidor |
| REQ-PER-016 | Separador CSV: `;` con BOM UTF-8 para compatibilidad con Excel |
| REQ-PER-017 | Límite de tamaño: 50MB por exportación |
| REQ-PER-018 | Log de auditoría de cada exportación (usuario, fecha, IP) |

---

## 27. Módulo de Changelog

| ID | Requisito |
|---|---|
| REQ-CHL-001 | Muestra todas las versiones ordenadas por fecha descendente |
| REQ-CHL-002 | Cada versión muestra: número de versión, título, fecha, contador de cambios |
| REQ-CHL-003 | Cambios agrupados por tipo: nuevo (verde), mejora (azul), corrección (naranja), seguridad (rojo) |
| REQ-CHL-004 | La versión actual se resalta con banner especial |
| REQ-CHL-005 | Se compara con `APP_VERSION` del código |

---

## 28. Panel de Administración

### 28.1 Admin Caché (adminCache.php)

| ID | Requisito |
|---|---|
| REQ-ADM-001 | **Solo administradores** (non-admin redirigido a resumenAnual) |
| REQ-ADM-002 | Reconstruir caché para usuario específico + rango de años |
| REQ-ADM-003 | Invalidar y recalcular caché de un mes específico |
| REQ-ADM-004 | Truncar toda la caché (requiere escribir "CONFIRMAR") |
| REQ-ADM-005 | Estadísticas: registros totales, usuarios, años, última actualización |
| REQ-ADM-006 | Lista de usuarios con entradas de caché |
| REQ-ADM-007 | 20 actualizaciones más recientes |

### 28.2 Admin Gastos Compartidos (adminGastosCompartidos.php)

| ID | Requisito |
|---|---|
| REQ-ADM-010 | **Solo administradores** |
| REQ-ADM-011 | Crear grupo: emparejar dos usuarios (se ordenan user1_id < user2_id para unicidad) |
| REQ-ADM-012 | Verificación: ambos usuarios deben existir y estar activos |
| REQ-ADM-013 | Verificación: no hay grupos duplicados (comprueba ambos órdenes) |
| REQ-ADM-014 | Un usuario no puede estar en múltiples grupos activos simultáneamente |
| REQ-ADM-015 | Toggle activar/desactivar grupo |
| REQ-ADM-016 | Eliminar grupo completamente |
| REQ-ADM-017 | Procesar solicitudes pendientes: aprobar (crea grupo + notifica a ambos) o rechazar (notifica al solicitante) |
| REQ-ADM-018 | Administradores excluidos de la lista de usuarios disponibles |
| REQ-ADM-019 | Estadísticas: total grupos, activos, inactivos, usuarios disponibles, solicitudes pendientes |

### 28.3 Admin Suscripciones (adminSuscripciones.php)

| ID | Requisito |
|---|---|
| REQ-ADM-020 | **Solo administradores** |
| REQ-ADM-021 | Activar suscripción: aprueba pago pendiente (transaccional: actualiza pago + estado usuario); envía email de confirmación |
| REQ-ADM-022 | Desactivar suscripción: marca como expirada |
| REQ-ADM-023 | Renovar manualmente: crea nuevo registro de pago + actualiza estado |
| REQ-ADM-024 | Rechazar pago: marca como fallido |
| REQ-ADM-025 | Flujo: usuario solicita → admin revisa → activa/rechaza |
| REQ-ADM-026 | Vistas: pagos pendientes, suscriptores activos (+ admins), usuarios expirados, usuarios en trial, historial de pagos |

### 28.4 Admin Logs (adminLogs.php)

| ID | Requisito |
|---|---|
| REQ-ADM-030 | **Solo administradores** (403 para non-admin) |
| REQ-ADM-031 | Navegador de archivos de log en sidebar con tamaños y fechas |
| REQ-ADM-032 | Visor de logs con filtro por nivel: ERROR, WARNING, INFO, DEBUG, SECURITY |
| REQ-ADM-033 | Búsqueda de texto dentro de logs |
| REQ-ADM-034 | Limpieza de logs antiguos configurable: 1, 3, 7, 14, 30 días |
| REQ-ADM-035 | Descarga de archivos de log |
| REQ-ADM-036 | Resumen: número de archivos, tamaño total |

### 28.5 Admin Versiones (adminVersiones.php)

| ID | Requisito |
|---|---|
| REQ-ADM-040 | **Solo administradores** |
| REQ-ADM-041 | Crear versión con: número (formato X.Y.Z), título, fecha, descripción, activa, notificar usuarios |
| REQ-ADM-042 | Formato de versión validado: regex `/^[0-9]+\.[0-9]+\.[0-9]+$/` |
| REQ-ADM-043 | Verificación de versión duplicada antes de crear |
| REQ-ADM-044 | Cambios asociados: tipo (nuevo/mejora/corrección/seguridad), categoría, descripción, orden |
| REQ-ADM-045 | Activar versión: solo una activa a la vez; limpia registros de "vistas" para que todos vean la notificación |
| REQ-ADM-046 | No se puede eliminar la versión activa |
| REQ-ADM-047 | Opción de notificar por email a todos los usuarios con changelog formateado |
| REQ-ADM-048 | Track de visualizaciones: qué usuarios han visto cada versión |

---

## 29. Sistema de Notificaciones

### 29.1 Tipos de Notificación

| Sistema | Mecanismo | Destino | Intervalo |
|---|---|---|---|
| **Endpoint unificado** | Polling único (`api/notificaciones.php`) | Todos los usuarios | 2 min |
| Gastos compartidos | Badge en menú + popup expandible | Todos los usuarios | Vía endpoint unificado |
| TuWebCustom (pagos web) | Badge en menú + popup | Todos los usuarios | Vía endpoint unificado |
| Suscripciones pendientes | Badge en menú | Solo admins | Vía endpoint unificado |
| Solicitudes de gastos | Badge en menú | Solo admins | Vía endpoint unificado |
| Nueva versión | Modal con changelog | Todos los usuarios | Vía endpoint unificado |
| Logros nuevos | Toast popup | Todos los usuarios | Al cargar página |

> **Nota:** El endpoint unificado reemplaza los 5 servicios de polling individuales. Usa caché Redis (TTL 30s) para minimizar queries a DB.

### 29.2 Notificaciones de Gastos Compartidos

| ID | Requisito |
|---|---|
| REQ-NOT-001 | Se generan al crear/eliminar gastos compartidos y únicos, y al saldar deudas |
| REQ-NOT-002 | Nunca se auto-notifica (no se notifica a uno mismo) |
| REQ-NOT-003 | Tipos: gasto_compartido, gasto_unico, deuda_saldada, gasto_eliminado, gasto_unico_eliminado |
| REQ-NOT-004 | Cada tipo tiene icono y mensaje formateado distinto |
| REQ-NOT-005 | Se pueden marcar como leídas (individual o todas) |
| REQ-NOT-006 | Limpieza automática: notificaciones leídas > 30 días se eliminan |

### 29.3 Notificaciones de Versión

| ID | Requisito |
|---|---|
| REQ-NOT-010 | Modal con changelog de la versión activa no vista |
| REQ-NOT-011 | Muestra top 5 cambios + indicador "y X más" |
| REQ-NOT-012 | Se marca como vista al cerrar el modal |
| REQ-NOT-013 | Badge con contador de versiones no vistas |

---

## 30. API Endpoints

### 30.1 Listado de Endpoints

| Endpoint | Método | Auth | Rol | CSRF | Rate Limit | Descripción |
|---|---|---|---|---|---|---|
| `api/_bootstrap.php` | — | — | — | — | — | Inicialización común |
| `api/admin-versiones.php` | GET/POST | Session | Admin | No | No | CRUD de versiones |
| `api/cookie-consent.php` | POST | Ninguna | — | No | No | Consentimiento RGPD |
| `api/cron-limpieza.php` | CLI/GET | Token | — | No | No | Limpieza de datos temporales |
| `api/cron-notificaciones-suscripcion.php` | CLI/GET | Token | — | No | No | Recordatorios de suscripción |
| `api/gestionar-solicitud-gastos.php` | POST | Session | Admin | **Sí** | No | Aprobar/rechazar solicitudes |
| `api/log-sync.php` | POST | Session | Usuario | No | No | Log de sincronización offline |
| `api/notificaciones.php` | GET | Session | Usuario | No | 60/min | **Endpoint unificado**: devuelve contadores de todas las notificaciones en una sola petición (con caché Redis 30s) |
| `api/notificaciones-gastos-compartidos.php` | GET/POST | Session | Usuario | No | 60/min | Notificaciones de gastos compartidos |
| `api/notificaciones-solicitudes-gastos.php` | GET | Session | Admin | No | 60/min | Contar solicitudes pendientes |
| `api/notificaciones-suscripciones.php` | GET | Session | Admin | No | 60/min | Pagos pendientes |
| `api/notificaciones-tuwebcustom.php` | GET/POST | Session | Usuario | No | 60/min | Notificaciones de pagos web |
| `api/solicitar-gastos-compartidos.php` | POST | Session | Usuario | **Sí** | No | Solicitar emparejamiento |
| `api/version-check.php` | GET/POST | Session | Usuario | No | No | Check/marcar versiones |

### 30.2 Formato de Respuesta API

Todas las APIs responden en JSON con estructura estándar:
```json
{
  "success": true|false,
  "message": "Descripción",
  "data": { ... }        // opcional
  "error": "Detalle"     // en caso de error
}
```

### 30.3 Crons - Acceso por Token

| ID | Requisito |
|---|---|
| REQ-API-001 | Los crons aceptan acceso vía CLI (sin token), HTTP con `Authorization: Bearer <token>` (preferido), o `?token=CRON_SECRET` (legacy) |
| REQ-API-002 | El token se compara con `hash_equals()` (timing-safe) |
| REQ-API-003 | Sin autorización válida: respuesta 403 |
| REQ-API-004 | Soporte para `REDIRECT_HTTP_AUTHORIZATION` (Apache + mod_rewrite) |

### 30.4 Bootstrap API

| ID | Requisito |
|---|---|
| REQ-API-010 | Errores PHP no se muestran al cliente (`display_errors=0`) |
| REQ-API-011 | Errores fatales devuelven JSON 500 con mensaje genérico |
| REQ-API-012 | CORS: `Access-Control-Allow-Origin` restringido a `BASE_URL`, preflight OPTIONS manejado |
| REQ-API-013 | Rate limit global: 100 req/min por IP (exentos: cron, SSE) |
| REQ-API-014 | Body size > 1MB rechazado con 413 Payload Too Large |
| REQ-API-015 | Middleware centralizado (`middleware.php`) cargado vía `_bootstrap.php` y `config.php` |

### 30.5 Validación Centralizada (middleware.php)

Todas las validaciones recurrentes se gestionan desde funciones middleware:

| Función | Descripción |
|---------|-------------|
| `requireCsrf()` | CSRF vía POST o header X-CSRF-Token |
| `requireCsrfUnlessOffline()` | CSRF con bypass para sync offline |
| `requireAuth()` | Verifica sesión activa |
| `requireAdmin()` | Verifica rol admin |
| `requireApiPost()` | Combo: POST + auth + CSRF + rate limit (60/min) |
| `requireApiGet()` | Combo: GET + auth + rate limit (120/min) |
| `requireApiAdmin()` | Combo: POST + admin + CSRF + rate limit (30/min) |

---

## 31. Importación CSV (Fase 3 — Feature 6.1)

| ID | Requisito |
|---|---|
| REQ-CSV-001 | El usuario puede subir un fichero CSV desde `anadirIngresoGasto.php` (tab "Importar CSV") |
| REQ-CSV-002 | Formatos soportados: CSV con separador `;`, `,` o tabulador (auto-detectado) |
| REQ-CSV-003 | Codificaciones soportadas: UTF-8, ISO-8859-1/Latin1 (auto-detectado vía `mb_detect_encoding`) |
| REQ-CSV-004 | Tamaño máximo: 2MB, extensiones permitidas: `.csv`, `.txt` |
| REQ-CSV-005 | Máximo 500 filas por importación (prevención de abuso) |
| REQ-CSV-006 | Paso 1 — **Upload**: subida con drag-and-drop y preview de primeras 5 filas |
| REQ-CSV-007 | Paso 2 — **Mapeo**: asignación de columnas CSV a campos Budgetix vía dropdowns |
| REQ-CSV-008 | Campos mapeables: fecha, concepto, cantidad, tipo (ingreso/gasto/ahorro) |
| REQ-CSV-009 | Formatos de cantidad: `1234.56`, `1.234,56`, `-1234.56`, `(1234.56)`, con símbolos de moneda |
| REQ-CSV-010 | Formatos de fecha: DD/MM/YYYY, YYYY-MM-DD, DD-MM-YYYY, DD.MM.YYYY (auto-detectado) |
| REQ-CSV-011 | Detección automática de tipo por signo de cantidad (configurable: negativo=gasto o negativo=ingreso) |
| REQ-CSV-012 | Categoría/subcategoría por defecto asignable, con dropdown poblado desde categorías del usuario |
| REQ-CSV-013 | Reglas de auto-categorización: si concepto contiene keyword → categoría/subcategoría específica |
| REQ-CSV-014 | Paso 3 — **Revisión**: tabla completa con duplicados marcados en amarillo, checkboxes para excluir |
| REQ-CSV-015 | Detección de duplicados: concepto + cantidad + mes + año coincidentes con registros existentes |
| REQ-CSV-016 | Resumen visual: tarjetas con total procesados, duplicados, a importar, y totales por tipo |
| REQ-CSV-017 | Paso 4 — **Importación**: transaccional con `BEGIN/COMMIT/ROLLBACK` |
| REQ-CSV-018 | Tras importación: actualiza `cache_resumen_mensual` para meses afectados y ejecuta `verificarTodosLosLogros()` |
| REQ-CSV-019 | Rate limit: 30 uploads/hora y 15 importaciones/hora por usuario |
| REQ-CSV-020 | Seguridad: validación MIME type, CSRF obligatorio, sanitización de campos, fichero temporal eliminado tras parseo |
| REQ-CSV-021 | Datos del wizard almacenados en `$_SESSION` con expiración de 30 minutos |
| REQ-API-012 | `apiRequireAuth()` devuelve 401 si no hay sesión |
| REQ-API-013 | `apiRequireAdmin()` devuelve 403 si no es administrador |

---

## 31. PWA y Soporte Offline

### 31.1 Service Worker (sw.php)

| ID | Requisito |
|---|---|
| REQ-PWA-001 | Service Worker generado dinámicamente en PHP (rutas adaptadas al entorno) |
| REQ-PWA-002 | Caché estática versionada (`budgetix-{APP_VERSION}`) — versión derivada automáticamente de APP_VERSION en config.php |
| REQ-PWA-003 | Caché dinámica (`budgetix-dynamic-{APP_VERSION}`) para recursos visitados |
| REQ-PWA-004 | Estrategia **Network-first** para recursos locales (con fallback a caché) |
| REQ-PWA-005 | Estrategia **Cache-first** para CDNs externos |
| REQ-PWA-006 | Fallback offline: devuelve `index.php` para peticiones de documentos sin caché |
| REQ-PWA-007 | Background sync: evento `sync` para `sync-pending-operations` |
| REQ-PWA-008 | App Badge API: muestra contador de notificaciones en icono de app |

### 31.2 Web App Manifest (manifest.php)

| ID | Requisito |
|---|---|
| REQ-PWA-010 | Generado dinámicamente en PHP |
| REQ-PWA-011 | Display mode: `standalone` |
| REQ-PWA-012 | Theme color: `#4CAF50` (verde) |
| REQ-PWA-013 | 7 tamaños de icono (48–512px) + maskable |
| REQ-PWA-014 | 3 shortcuts: Añadir Gasto, Estadísticas, Gastos Compartidos |
| REQ-PWA-015 | Categorías: finance, productivity, business |

### 31.3 Soporte Offline (IndexedDB)

| ID | Requisito |
|---|---|
| REQ-PWA-020 | Base de datos IndexedDB: `BudgetixDB` v2 |
| REQ-PWA-021 | 4 object stores: `pendingOperations`, `cachedGastos`, `cachedStats`, `syncAuditLog` |
| REQ-PWA-022 | Operaciones POST/PUT/DELETE se encolan cuando está offline |
| REQ-PWA-023 | Máximo 3 reintentos por operación |
| REQ-PWA-024 | Sincronización automática al recuperar conexión |
| REQ-PWA-025 | `window.fetch` interceptado: offline → simula respuesta 200 y encola |
| REQ-PWA-026 | Formularios `method="POST"` interceptados automáticamente |
| REQ-PWA-027 | Log de auditoría de sincronización enviado al servidor (`api/log-sync.php`) |
| REQ-PWA-028 | Indicador visual online/offline en la UI |

### 31.4 Instalación PWA

| ID | Requisito |
|---|---|
| REQ-PWA-030 | Detección de plataforma: iOS vs Android |
| REQ-PWA-031 | **Android**: captura `beforeinstallprompt` para prompt nativo |
| REQ-PWA-032 | **iOS**: muestra instrucciones paso a paso ("Añadir a pantalla de inicio") |
| REQ-PWA-033 | Modal customizado con focus trap para accesibilidad |
| REQ-PWA-034 | Opción "Recordar más tarde" guardada en localStorage |
| REQ-PWA-035 | Solicitud de permiso de notificaciones tras instalación |

---

## 32. Sistema de Caché

### 32.1 Caché en Base de Datos (MySQL)

| ID | Requisito |
|---|---|
| REQ-CACHE-001 | Tabla `cache_resumen_mensual` almacena: total_ingresos, total_gastos, total_ahorros, balance, gastos_fijos, gastos_variables |
| REQ-CACHE-002 | Se actualiza automáticamente al insertar/eliminar movimientos |
| REQ-CACHE-003 | Cache miss → auto-populate consultando `presupuestos` |
| REQ-CACHE-004 | Procedimiento almacenado `actualizar_cache_resumen` para recálculo |
| REQ-CACHE-005 | Procedimiento `reconstruir_cache_usuario` para rebuild masivo por rango de años |
| REQ-CACHE-006 | Invalidación explícita disponible (`invalidarCacheResumen`) |
| REQ-CACHE-007 | Panel admin para rebuild/invalidación/truncado |

### 32.2 Caché Redis (L1 — opcional)

| ID | Requisito |
|---|---|
| REQ-CACHE-010 | `RedisCache.php` — Singleton con fallback graceful (si Redis no disponible, toda operación retorna null/false) |
| REQ-CACHE-011 | Prefijo de claves: `budgetix:` (aislado de otras apps en el mismo Redis server) |
| REQ-CACHE-012 | Métodos: `get()`, `set()`, `delete()`, `deletePattern()`, `remember()` |
| REQ-CACHE-013 | Contadores de notificaciones cacheados en Redis con TTL 30s (`notif:counts:{user_id}`) |
| REQ-CACHE-014 | Configuración vía `.env`: `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD`, `REDIS_DATABASE` |

### 32.3 Sesiones en Redis

| ID | Requisito |
|---|---|
| REQ-CACHE-020 | Si `REDIS_HOST` está definido en `.env`, las sesiones PHP se migran automáticamente a Redis |
| REQ-CACHE-021 | Base de datos Redis separada para sesiones (`REDIS_SESSION_DB`, por defecto DB 3) |
| REQ-CACHE-022 | Fallback transparente a ficheros si Redis no está disponible |

### 32.4 Caché HTTP (Assets estáticos)

| ID | Requisito |
|---|---|
| REQ-CACHE-030 | Assets CSS/JS/img/fonts: `Cache-Control: public, max-age=31536000, immutable` (1 año) |
| REQ-CACHE-031 | Cache busting vía query param con hash MD5 del fichero (`?v=abc123`) |
| REQ-CACHE-032 | Gzip habilitado para CSS, JS, JSON, SVG |
| REQ-CACHE-033 | Configurado en Nginx (Plesk proxy) + `.htaccess` (Apache fallback) |

---

## 33. Emails y Plantillas

### 33.1 Sistema de Envío

| ID | Requisito |
|---|---|
| REQ-EMAIL-001 | Envío vía PHPMailer + SMTP con encriptación SMTPS |
| REQ-EMAIL-002 | En entorno local: los emails se loguean en lugar de enviarse |
| REQ-EMAIL-003 | Todas las plantillas usan CSS inline con branding de Budgetix |
| REQ-EMAIL-004 | Función `renderEmailTemplate()` con variables inyectadas |

### 33.2 Plantillas de Email

| Plantilla | Trigger | Destinatario |
|---|---|---|
| `nuevo_usuario.php` | Registro de nuevo usuario | Administrador |
| `activacion_suscripcion.php` | Admin activa suscripción | Usuario |
| `aviso_renovacion.php` | Cron: 14 y 7 días antes de expirar suscripción | Usuario |
| `aviso_trial.php` | Cron: 14 y 7 días antes de expirar trial | Usuario |
| `nueva_version.php` | Admin publica versión con notificación | Todos los usuarios |

---

## 34. Jobs Programados (Cron)

### 34.1 Limpieza (cron-limpieza.php)

| Paso | Dato a limpiar | Retención |
|------|---------------|-----------|
| 1 | `password_reset_tokens` (expirados o usados) | > 24 horas |
| 2 | `login_attempts` | > 7 días |
| 3 | `api_rate_limits` | > 1 día |
| 4 | Archivos `.log` | > `LOG_CRON_RETENTION_DAYS` (30 días), excepto `cron-limpieza.log` |
| 5 | Usuarios soft-deleted (`deleted_at`) | > `SOFT_DELETE_RETENTION_DAYS` (30 días) → hard delete + CASCADE |
| 6 | **Auto-partición** de `presupuestos` | Crea partición del año siguiente si no existe (`REORGANIZE PARTITION p_future`) |

### 34.2 Notificaciones de Suscripción (cron-notificaciones-suscripcion.php)

| ID | Requisito |
|---|---|
| REQ-CRON-001 | Envía avisos a **14 y 7 días** antes de expiración |
| REQ-CRON-002 | Cubre tanto trial como suscripciones activas |
| REQ-CRON-003 | Administradores excluidos |
| REQ-CRON-004 | Prevención de duplicados: verifica en `logs` que no se envió ya hoy |
| REQ-CRON-005 | Registra cada envío en tabla `logs` |

---

## 35. Landing Page y Páginas Legales

### 35.1 Landing Page (index.php raíz)

| ID | Requisito |
|---|---|
| REQ-LAND-001 | Página de presentación de la aplicación |
| REQ-LAND-002 | Banner de cookies RGPD con consentimiento granular: necesarias (siempre activas), funcionales (toggle) |
| REQ-LAND-003 | Enlace a login desde landing |
| REQ-LAND-004 | index.html redirige a index.php via meta-refresh + JS |

### 35.2 Páginas Legales (landing/)

| Página | Contenido |
|---|---|
| `aviso-legal.html` | Aviso legal |
| `politica-cookies.html` | Política de cookies |
| `politica-privacidad.html` | Política de privacidad |
| `terminos-condiciones.html` | Términos y condiciones |
| `cookie-banner.html` | Banner de cookies (componente) |

---

## 36. Sistema de Build

| ID | Requisito |
|---|---|
| REQ-BUILD-001 | Herramienta CLI: `php build.php` |
| REQ-BUILD-002 | Comandos: `all` (default), `css`, `js`, `clean` |
| REQ-BUILD-003 | CSS: elimina comentarios, colapsa whitespace, elimina semicolons finales |
| REQ-BUILD-004 | JS: elimina comentarios, indentación y líneas vacías (conservador, no renombra variables) |
| REQ-BUILD-005 | Protección de strings, template literals y regex en minificación JS |
| REQ-BUILD-006 | Bundles: `bundle-common.css` (7 archivos, incluye `design-tokens.css`), `bundle-common.js` (12 archivos, incluye `notificaciones-unificadas.js`) |
| REQ-BUILD-007 | Output: `app/assets/dist/css/`, `app/assets/dist/js/` |
| REQ-BUILD-008 | Manifest JSON: hashes MD5 (8 chars), tamaños original y minificado |
| REQ-BUILD-009 | En producción: `asset()` sirve desde `dist/` con query param de hash para cache busting |
| REQ-BUILD-010 | El directorio `dist/` está en `.gitignore` |

---

## 37. Matriz de Control de Acceso

### 37.1 Páginas por Rol

| Página | Usuario | Admin |
|---|---|---|
| resumenAnual | ✅ | ✅ |
| anadirIngresoGasto | ✅ | ✅ |
| informesAnuales | ✅ | ✅ |
| gastosCompartidos | ✅ | ✅ |
| metas | ✅ | ✅ |
| logros | ✅ | ✅ |
| carreras | ✅ | ✅ |
| revisiones / anadirRevisiones | ✅ | ✅ |
| datosRecordar | ✅ | ✅ |
| sueldoNeto | ✅ | ✅ |
| categoriasPersonalizadas | ✅ | ✅ |
| analisisInteligente | ✅ | ✅ |
| suscripcion | ✅ | ✅ |
| perfil | ✅ | ✅ |
| changelog | ✅ | ✅ |
| portfolio | ❌ | ✅ |
| salario | ❌ | ✅ |
| estadisticas | ❌ (*) | ✅ |
| comunidad | ❌ | ✅ |
| tuwebcustom | ❌ | ✅ |
| adminCache | ❌ | ✅ |
| adminGastosCompartidos | ❌ | ✅ |
| adminSuscripciones | ❌ | ✅ |
| adminLogs | ❌ | ✅ |
| adminVersiones | ❌ | ✅ |

(*) Estadísticas: los usuarios pueden acceder a búsqueda cross-user, pero solo admins pueden editar registros de otros.

### 37.2 APIs por Rol

| Endpoint | Sin Auth | Usuario | Admin |
|---|---|---|---|
| cookie-consent | ✅ | — | — |
| crons (con token) | ✅ (token) | — | — |
| log-sync | — | ✅ | ✅ |
| notif. gastos compartidos | — | ✅ | ✅ |
| notif. tuwebcustom | — | ✅ | ✅ |
| version-check | — | ✅ | ✅ |
| solicitar-gastos | — | ✅ | ✅ |
| gestionar-solicitud-gastos | — | — | ✅ |
| notif. solicitudes gastos | — | — | ✅ |
| notif. suscripciones | — | — | ✅ |
| admin-versiones | — | — | ✅ |

---

## 38. Módulo de Asistente IA (Chatbot)

### 38.1 Descripción General

Widget de chat flotante con asistente financiero basado en la API de Google Gemini/Gemma. Accesible desde cualquier página de la app a usuarios autenticados con suscripción activa.

| ID | Requisito |
|---|---|
| REQ-CHAT-001 | Widget flotante (botón circular esquina inferior derecha) con panel de chat desplegable |
| REQ-CHAT-002 | El asistente responde en español, en formato Markdown básico (**negrita**, listas, saltos de línea) |
| REQ-CHAT-003 | Límite de 2000 caracteres por mensaje de usuario |
| REQ-CHAT-004 | Límite diario por usuario configurable (`CHATBOT_DAILY_LIMIT`) con reset a las 0h UTC |
| REQ-CHAT-005 | Historial persistente por sesión de conversación; botón para limpiar historial |
| REQ-CHAT-006 | CSRF token requerido en todas las peticiones |
| REQ-CHAT-007 | Rate limit: máximo 20 peticiones por minuto por usuario |

### 38.2 Contexto Financiero Dinámico

| ID | Requisito |
|---|---|
| REQ-CHAT-010 | Cada petición adjunta contexto financiero real del usuario como primer turno del diálogo |
| REQ-CHAT-011 | **Contexto general** (caché 1 hora): mes actual, acumulado del año, últimos 3 meses, metas y límites activos |
| REQ-CHAT-012 | **Contexto dinámico** (caché 5 min): se activa cuando se detecta intención temporal o de categoría |
| REQ-CHAT-013 | Detección de intención temporal: meses por nombre, "el mes pasado", "este mes", "el año pasado", "este año", "hace N años", "últimos N meses" |
| REQ-CHAT-014 | Detección de categorías: match exacto + match parcial por palabras ≥ 4 chars contra categorías del usuario |
| REQ-CHAT-015 | Detección de gastos compartidos: palabras clave "compartido/s", "dividido/s" → inyecta contexto específico con totales por año/mes/categoría y hasta 30 transacciones individuales |

### 38.3 Modelos IA y Cadena de Fallback

| ID | Requisito |
|---|---|
| REQ-CHAT-020 | Cadena de modelos en orden de prioridad: `gemini-2.5-flash` → `gemma-3-27b-it` → `gemma-4-31b-it` → `gemini-2.0-flash-lite` |
| REQ-CHAT-021 | Si un modelo falla, se intenta el siguiente automáticamente |
| REQ-CHAT-022 | `gemini-2.5-flash`: soporta `system_instruction` + `thinkingConfig: {thinkingBudget: 0}` |
| REQ-CHAT-023 | Modelos Gemma (`gemma-*`): NO soportan `system_instruction`; el system prompt se inyecta como primer turno user/model en `contents` |
| REQ-CHAT-024 | **Ban por quota**: cuando un modelo devuelve error 429, se marca en Redis/APCu con TTL dinámico: `per_day` → 24 h; `retry in Xs` → esos segundos (mín. 60 s); default → 1 hora |
| REQ-CHAT-025 | **Ban por sobrecarga**: error "high demand" / HTTP 503 → ban de 2 minutos |
| REQ-CHAT-026 | Si todos los modelos están baneados simultáneamente, se usa la cadena completa sin filtrar |
| REQ-CHAT-027 | Todos los intentos se loguean en `ai_request_logs` (modelo, orden, estado, tokens, duración) |

### 38.4 Prevención de Reasoning Leak

| ID | Requisito |
|---|---|
| REQ-CHAT-030 | Los parts de tipo `thought: true` (Gemini 2.5 Flash) se filtran y no se incluyen en la respuesta |
| REQ-CHAT-031 | `stripReasoningLeakage()` elimina bloques `<think>...</think>` y metadatos de planificación visible al inicio |
| REQ-CHAT-032 | El system prompt prohíbe explícitamente meta-comentarios, razonamiento visible y preámbulos |

### 38.5 Panel de Administración IA (`adminIA.php`)

| ID | Requisito |
|---|---|
| REQ-CHAT-040 | Solo accesible para administradores |
| REQ-CHAT-041 | Muestra: peticiones del día / quota total, tokens hoy, peticiones del mes, tiempo de respuesta medio, cuenta regresiva al reset |
| REQ-CHAT-042 | Barra de progreso de uso diario del proyecto |
| REQ-CHAT-043 | Tarjetas por modelo con: RPD/RPM/TPM, uso del día, restantes, % uso |
| REQ-CHAT-044 | Tablas: uso por funcionalidad este mes, uso por usuario hoy y en el mes, últimas peticiones con estado y fallback info |
| REQ-CHAT-045 | Vista móvil: tablas convertidas a cards con `data-label` en cada celda |

### 38.6 Debug en Entorno de Desarrollo

| ID | Requisito |
|---|---|
| REQ-CHAT-050 | En entorno dev (`APP_CONFIG.isDevEnv`), cada mensaje del asistente muestra un badge con el modelo usado |
| REQ-CHAT-051 | Si hubo fallback, badge ámbar "⚠ Fallback #N" con `<details>` colapsable listando modelos fallidos y sus errores |
| REQ-CHAT-052 | En producción, el badge de debug no se muestra |

---

## 39. Módulo de Límites de Gasto por Categoría

### 39.1 Descripción General

Sección dentro de Resumen Anual que permite al usuario configurar límites mensuales de gasto por categoría con alertas y seguimiento visual.

| ID | Requisito |
|---|---|
| REQ-LIM-001 | Accesible desde la página de Resumen Anual (sección inferior) |
| REQ-LIM-002 | Los límites son por usuario y por categoría de gasto |
| REQ-LIM-003 | El seguimiento muestra el gasto acumulado del mes actual vs. el límite configurado |

### 39.2 Configuración de Límites

| ID | Requisito |
|---|---|
| REQ-LIM-010 | Modal para añadir nuevo límite: categoría (select con categorías del usuario), importe mensual (€), alertas opcionales al 80% y al 100% |
| REQ-LIM-011 | Solo se puede tener un límite activo por categoría |
| REQ-LIM-012 | Los límites se pueden eliminar individualmente |
| REQ-LIM-013 | Datos enviados via AJAX (POST + CSRF); respuesta JSON |

### 39.3 Visualización

| ID | Requisito |
|---|---|
| REQ-LIM-020 | Grid de tarjetas (`limites-grid`): `auto-fill, minmax(280px, 1fr)` → en móvil 1 columna |
| REQ-LIM-021 | Cada tarjeta muestra: nombre de categoría, barra de progreso, porcentaje, importe gastado/límite |
| REQ-LIM-022 | Niveles de color: verde (< 80%), ámbar (\u2265 80%), rojo (\u2265 100%) |
| REQ-LIM-023 | Si el límite está superado, se muestra el importe de exceso |
| REQ-LIM-024 | El botón "Nuevo límite" en móvil ocupa el ancho completo del contenedor |

### 39.4 Alertas

| ID | Requisito |
|---|---|
| REQ-LIM-030 | Alerta al 80%: notificación cuando se alcanza el umbral (si está activada) |
| REQ-LIM-031 | Alerta al 100%: notificación cuando se supera el límite (si está activada) |
| REQ-LIM-032 | Las alertas se envían al sistema de notificaciones existente |

---

## Apéndice A: Categorías del Sistema Predefinidas

### Gastos
Vivienda, Alimentación, Transporte, Salud, Ropa, Ocio, Educación, Deporte, Tecnología, Mascotas, Regalos, Coche, Moto, Otros

### Ingresos
Nómina, Freelance, Inversiones, Alquiler, Ventas, Otros, Webs

### Ahorros
Cuentas, Inversiones, Efectivo, Otros

### Subcategorías Fijas (auto-marcan como gasto fijo)
Hipoteca, Alquiler, Electricidad, Gas, Agua, Internet, Seguros, Comunidad, Telefonía, Impuestos, Hacienda, Seguridad Social, Cuotas, Basura

---

## Apéndice B: Tabla de Triggers y su Impacto

| Acción del Usuario | Trigger | Efecto en `presupuestos` |
|---|---|---|
| Crear carrera (pagada) | `insertar_en_presupuestos` | + Gasto Deporte/Carreras |
| Pagar carrera existente | `actualizar_presupuesto_carrera` | + Gasto Deporte/Carreras |
| Desmarcar carrera pagada | `actualizar_presupuesto_carrera` | - Elimina gasto |
| Eliminar carrera | `borrar_presupuesto_carrera` | - Elimina gasto |
| Añadir posición portfolio | `after_insert_portfolio` | + Ingreso Inversiones + Ahorro Cuentas |
| Editar posición portfolio | `after_update_portfolio` | Reemplaza registros |
| Eliminar posición portfolio | `before_delete_portfolio` + `borrar_presupuestos_despues_de_posicion` | - Elimina registros |
| Añadir mantenimiento vehículo | `after_insert_revision` | + Gasto [Coche/Moto]/Mantenimiento |
| Eliminar mantenimiento | `after_delete_revision` | - Elimina gasto |
| Añadir repostaje | `after_insert_repostaje_combined` | + Gasto [Coche/Moto]/Combustible + Actualiza km |
| Eliminar repostaje | `trg_after_delete_repostaje` | - Elimina gasto + Ajusta km |
| Marcar pago web como pagado | `after_update_pagos_web` | + Ingreso Webs/Mantenimiento |

---

## Apéndice C: Variables de Entorno (.env)

| Variable | Descripción |
|---|---|
| `DB_USER_LOCAL` / `DB_PASS_LOCAL` | Credenciales BD desarrollo |
| `DB_USER` / `DB_PASS` | Credenciales BD producción |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | Configuración SMTP |
| `SMTP_FROM` / `SMTP_FROM_NAME` | Email remitente |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | OAuth Google |
| `BIZUM_PHONE` | Teléfono para pagos Bizum |
| `CRON_SECRET` | Token secreto para acceso HTTP a crons |
| `REDIS_HOST` | Host de Redis (127.0.0.1). Si no existe, Redis no se usa |
| `REDIS_PORT` | Puerto de Redis (6379) |
| `REDIS_PASSWORD` | Contraseña de Redis (vacío si sin auth) |
| `REDIS_DATABASE` | Base de datos Redis para caché (2) |
| `REDIS_SESSION_DB` | Base de datos Redis para sesiones (3) |

**Validación al arranque:** `config.php` llama a `validateEnv()` que emite warnings en `error_log` para variables opcionales faltantes: `REDIS_HOST`, `SMTP_HOST`, `GOOGLE_CLIENT_ID`, `CRON_SECRET`. La app continúa con funcionalidad degradada.

---

## Apéndice D: Resumen de Rate Limits

| Acción | Máx. Intentos | Ventana | Mecanismo |
|---|---|---|---|
| Login (backoff exponencial) | 3→1min, 5→5min, 8→15min, 10→60min | 2 horas | BD (`login_attempts`) |
| Registro | 3 | 10 min | Sesión |
| Recuperar contraseña | 3 | 10 min | Sesión |
| Cambiar contraseña | 3 | 10 min | Sesión |
| Añadir movimiento | 10 | 1 min | Sesión |
| CRUD carreras | 10 | 1 min | Sesión |
| CRUD metas | 10 | 1 min | Sesión |
| Crear vehículo | 5 | 1 min | Sesión |
| Servicios/Repostajes | 10 | 1 min | Sesión |
| CRUD salarios | 5 | 1 min | Sesión |
| CRUD comunidad | 10 | 1 min | Sesión |
| TuWebCustom crear/eliminar | 10 | 1 min | Sesión |
| TuWebCustom actualizar | 20 | 1 min | Sesión |
| APIs notificaciones | 60 | 1 min | BD (`api_rate_limits`) |
| **API global** | **100** | **1 min** | **BD (`api_rate_limits`) — aplicado en `_bootstrap.php`** |
| Cookie consent | 10 | 5 min | Sesión |

### Constantes de Rate Limiting (constants.php)

| Constante | Valor | Descripción |
|-----------|-------|-------------|
| `RATE_LIMIT_API_GLOBAL` | 100 | Requests/min para API global |
| `RATE_LIMIT_AUTH` | 3 | Intentos de auth por ventana |
| `RATE_LIMIT_AUTH_WINDOW` | 600 | Ventana de auth (10 min) |
| `RATE_LIMIT_CRUD` | 10 | Operaciones CRUD por minuto |
