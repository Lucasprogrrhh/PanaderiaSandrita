# 🥐 Panadería y Confitería Sandrita — Sitio Web

Sitio web oficial de Panadería y Confitería Sandrita (San Luis, Argentina).  
Frontend en HTML/CSS/JS vanilla con Vite + Backend serverless en Vercel Functions.

---

## 📦 Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | HTML5, CSS3, JavaScript ES Modules, Vite |
| Backend | Vercel Serverless Functions (sin Express) |
| Base de datos | Supabase (PostgreSQL) |
| Email | Resend |
| WhatsApp | Link `wa.me` generado dinámicamente |
| Deploy | Vercel (frontend + API en el mismo proyecto) |

---

## 📁 Estructura del Proyecto

```
/
├── api/
│   ├── pedidos.js        ← POST /api/pedidos (endpoint principal)
│   └── health.js         ← GET /api/health (verificación)
├── lib/
│   ├── supabase.js       ← Cliente Supabase
│   ├── email.js          ← Envío de confirmación con Resend
│   ├── whatsapp.js       ← Generador de link WhatsApp
│   └── validate.js       ← Validación de campos
├── src/
│   ├── app.js            ← Lógica principal del frontend
│   └── styles.css        ← Estilos personalizados
├── index.html            ← Página principal
├── supabase_schema.sql   ← Script SQL para crear la tabla en Supabase
├── vercel.json           ← Configuración CORS de Vercel
├── package.json
└── .env.local            ← Variables locales (NO subir a GitHub)
```

---

## 🗄️ Paso 1 — Crear la Tabla en Supabase

1. Entrá a [supabase.com](https://supabase.com) y abrí tu proyecto.
2. Ir a **SQL Editor → New Query**.
3. Pegar y ejecutar el contenido de [`supabase_schema.sql`](./supabase_schema.sql).

Esto crea la tabla `pedidos` con todos los campos y sus índices.

---

## 🔑 Paso 2 — Variables de Entorno

### Para Desarrollo Local (`.env.local`)

Copiá el archivo de ejemplo y completá con tus datos reales:

```
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_KEY=tu_anon_key_de_supabase
RESEND_API_KEY=re_xxxxxxxxxxxx
OWNER_EMAIL=sandrita@email.com
OWNER_WHATSAPP=5492664000000
FRONTEND_URL=http://localhost:3000
```

**¿Dónde encontrar cada valor?**

| Variable | Dónde encontrarla |
|----------|-------------------|
| `SUPABASE_URL` | Supabase → Settings → API → Project URL |
| `SUPABASE_KEY` | Supabase → Settings → API → `anon` `public` key |
| `RESEND_API_KEY` | [resend.com](https://resend.com) → API Keys |
| `OWNER_WHATSAPP` | Número del local con código de país (ej: `5492664123456`) |

### Para Producción (Vercel Dashboard)

1. Ir a [vercel.com](https://vercel.com) → tu proyecto → **Settings → Environment Variables**.
2. Agregar cada variable con el valor de producción.
3. Hacer redeploy para que tomen efecto.

---

## 🖥️ Paso 3 — Desarrollo Local

Necesitás tener instalado [Vercel CLI](https://vercel.com/docs/cli):

```bash
npm install -g vercel
```

Para correr el frontend + las funciones serverless juntos:

```bash
npm run dev:api
```

Esto levanta todo en `http://localhost:3000` con las funciones disponibles en `/api/*`.

> **Nota:** `npm run dev` solo levanta Vite (sin las funciones de backend).

---

## 🚀 Paso 4 — Deploy en Vercel

El proyecto se deploya automáticamente al hacer push a `main`.

Para deploy manual:

```bash
vercel --prod
```

---

## 📡 API Reference

### `GET /api/health`

Verifica que la API esté operativa.

**Respuesta:**
```json
{
  "status": "ok",
  "servicio": "API Panadería Sandrita",
  "timestamp": "2026-06-07T20:00:00.000Z"
}
```

---

### `POST /api/pedidos`

Registra un nuevo pedido.

**Body (JSON):**

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `nombre` | string | ✅ | Nombre completo del cliente |
| `telefono` | string | ✅ | Teléfono de contacto |
| `email` | string | ✅ | Email del cliente (recibe confirmación) |
| `producto` | string | ✅ | Producto o productos solicitados |
| `fecha_retiro` | string (YYYY-MM-DD) | ✅ | Fecha de retiro o entrega |
| `tipo_entrega` | `"retiro"` \| `"envio"` | ❌ | Default: `"retiro"` |
| `direccion_envio` | string | Solo si `envio` | Dirección de entrega |
| `mensaje` | string | ❌ | Comentarios adicionales |

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "pedidoId": "uuid-del-pedido",
  "whatsappUrl": "https://wa.me/549266400000?text=...",
  "emailEnviado": true
}
```

**Respuesta de error (400 / 500):**
```json
{
  "success": false,
  "error": "Descripción del error"
}
```

---

## 💡 Ejemplo de Integración Frontend

```js
const res = await fetch('https://panaderia-sandrita.vercel.app/api/pedidos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nombre: 'Juan Pérez',
    telefono: '2664123456',
    email: 'juan@email.com',
    producto: 'Torta de cumpleaños',
    fecha_retiro: '2026-06-15',
    tipo_entrega: 'retiro',
    mensaje: 'Con cobertura de chocolate'
  })
});

const data = await res.json();

if (data.success) {
  // Mostrar mensaje de éxito al cliente
  alert('¡Pedido enviado! Te llegará un email de confirmación.');

  // Abrir WhatsApp del local para que el dueño vea el pedido
  window.open(data.whatsappUrl, '_blank');
} else {
  alert('Error: ' + data.error);
}
```

---

## 📍 Contacto

**Panadería y Confitería Sandrita**  
Rivadavia 907, San Luis Capital  
Instagram: [@panaderia_sandrita](https://instagram.com/panaderia_sandrita)
