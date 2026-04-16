# 📰 Hemeroteca Municipal — Frontend

> Frontend institucional de la **Hemeroteca Municipal de Catamarca Capital**, desarrollado con React + TypeScript + Vite. Permite explorar colecciones digitales de periódicos, revistas y publicaciones especiales, visualizar noticias, galería de imágenes y más, conectándose a un backend **Directus** como CMS headless.

---

## 🗂️ Estructura del proyecto

```
hemeroteca-front/
├── public/                        # Imágenes estáticas y assets públicos
├── src/
│   ├── api/
│   │   └── kohaApi.ts             # Instancia de Axios configurada con la URL base del CMS
│   ├── services/
│   │   └── koha-service.ts        # Todas las funciones fetch hacia la API de Directus
│   ├── components/
│   │   ├── extrasFijos/           # Componentes reutilizables globales
│   │   │   ├── Carrousel.tsx      # Carrusel principal de imágenes
│   │   │   ├── Footer.tsx         # Pie de página
│   │   │   ├── LoaderEditorial.tsx # Loader animado entre navegaciones
│   │   │   ├── PdfViewer.tsx      # Visualizador de PDFs embebido
│   │   │   └── RetroTv.tsx        # Componente de video estilo retro
│   │   └── home/                  # Componentes exclusivos de la página de inicio
│   │       ├── EditorialNavbar.tsx # Navbar con estilo editorial
│   │       ├── GaleriaImagenes.tsx # Galería fotográfica
│   │       ├── NoticiasCarrousel.tsx
│   │       ├── NoticiaPrincipal.tsx
│   │       ├── Reseñas.tsx
│   │       ├── SeccionesSecundarias.tsx
│   │       ├── TablonNovedades.tsx
│   │       └── Ubicacion.tsx
│   ├── pages/
│   │   ├── Home.tsx               # Página principal
│   │   ├── Colecciones.tsx        # Explorador de colecciones con filtros
│   │   ├── DetallesPublicacion.tsx # Vista de detalle de una publicación
│   │   ├── Noticias.tsx           # Listado de noticias
│   │   ├── Nosotros.tsx           # Página institucional
│   │   ├── Equipo.tsx             # Equipo de trabajo
│   │   ├── Login.tsx              # (deshabilitado) Login
│   │   ├── Register.tsx           # (deshabilitado) Registro
│   │   └── Video.tsx              # Página de video
│   ├── util/
│   │   ├── formatFecha.ts         # Helper para formatear fechas en español
│   │   └── ScrollToTop.tsx        # Restaura el scroll al cambiar de ruta
│   ├── App.tsx                    # Definición de rutas y loader global
│   ├── App.css
│   ├── main.tsx                   # Punto de entrada de React
│   └── index.css
├── .env                           # Variables de entorno (no se commitea)
├── .env-example                   # Plantilla de variables de entorno
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## ⚙️ Variables de entorno

Crear un archivo `.env` en la raíz del proyecto basándose en `.env-example`:

```env
VITE_API_URL=localhost:8080       # URL base del servidor (referencia interna)
VITE_HEMEROTECA=https://tu-directus.com  # URL base del CMS Directus
```

> ⚠️ Las variables deben comenzar con `VITE_` para ser expuestas por Vite al cliente.

---

## 🚀 Instalación y comandos

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd hemeroteca-front

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env-example .env
# Editar .env con los valores reales

# 4. Iniciar en modo desarrollo
npm run dev

# 5. Build para producción
npm run build

# 6. Previsualizar el build
npm run preview

# 7. Linting
npm run lint
```

---

## 🔄 Flujo de datos

```
Directus CMS (backend)
       │
       │  HTTP (Axios)
       ▼
src/api/kohaApi.ts          ← Instancia de Axios con baseURL = VITE_HEMEROTECA
       │
       ▼
src/services/koha-service.ts  ← Funciones fetch por colección
       │
       ├── fetchEncabezado()
       ├── fetchCarrousel()
       ├── fetchNoticias()        → mapea imágenes con URL completa
       ├── fetchGaleria()         → mapea imágenes con URL completa
       ├── fetchNovedades()
       ├── fetchReviews()
       ├── fetchEquipo()
       ├── fetchSeccion_1..4()
       ├── fetchPublicacion_1..4()
       ├── fetchBotonIzquierdo/Derecho()
       │
       ▼
Páginas y Componentes (consumen las funciones con useEffect)
```

Las imágenes de Directus se construyen dinámicamente usando la ruta `/assets/{file_id}?v={modified_on}` para invalidar caché correctamente.

---

## 🗺️ Rutas de la aplicación

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/` | `Home` | Página principal con navbar, carrusel, secciones, noticias, galería, reseñas y ubicación |
| `/colecciones` | `Colecciones` | Explorador de publicaciones con filtros por categoría (revistas, periódicos, colecciones, especiales) |
| `/detalles-publicacion` | `DetallesPublicacion` | Vista de detalle de una publicación con visor de PDF y publicaciones relacionadas |
| `/noticias` | `Noticias` | Listado de noticias institucionales |
| `/nosotros` | `Nosotros` | Información sobre la hemeroteca |
| `/equipo` | `Equipo` | Presentación del equipo de trabajo |
| `/practicas-conservacion` | `RetroTv` | Video de prácticas de conservación |
| `/detras-foto` | `RetroTv` | Video institucional "detrás de la foto" |
| `/video` | `VideoPage` | Página de video genérica |

> 🔒 Las rutas `/login` y `/register` están implementadas pero **comentadas** en `App.tsx`.

---

## 🏗️ Página de Colecciones — lógica de filtros

La página `Colecciones.tsx` obtiene datos de cuatro colecciones Directus (`publicacion_1..4`) y los mapea a cuatro categorías:

- **Revistas** → publicacion_1
- **Periódicos** → publicacion_2
- **Colecciones** → publicacion_3
- **Especiales** → publicacion_4

Cada ítem incluye título, portada, archivo PDF, fecha de publicación, número de edición y destino (hemeroteca municipal / digital). Al hacer clic en una publicación se navega a `/detalles-publicacion` pasando el ítem y los relacionados via `react-router-dom` location state.

---

## 📄 Visualizador de PDF

El componente `PdfViewer.tsx` usa **react-pdf** para renderizar PDFs directamente en el navegador, disponible tanto en la página de Colecciones (inline) como en la de Detalles de Publicación.

---

## 🎨 Stack tecnológico

| Tecnología | Uso |
|------------|-----|
| React 19 | Framework UI |
| TypeScript 5 | Tipado estático |
| Vite 7 | Bundler y dev server |
| Tailwind CSS 4 | Estilos utilitarios |
| React Router DOM 7 | Enrutamiento SPA |
| Axios | Cliente HTTP |
| Framer Motion | Animaciones |
| react-pdf | Visualizador de PDFs |
| Lucide React | Iconografía |
| Directus SDK | (instalado, CMS headless) |

---

## 🔁 Loader entre páginas

En `App.tsx` existe un loader editorial animado (`LoaderEditorial`) que se activa en cada cambio de ruta con un timeout de **1600ms**, dando una transición visual consistente a toda la aplicación.

---

## 📌 Notas importantes

- El proyecto usa **ESModules** (`"type": "module"` en package.json).
- El archivo `.env` nunca debe commitearse; está incluido en `.gitignore`.
- Las imágenes en `public/` son assets institucionales del Municipio de Catamarca Capital.
- Los filtros de colecciones soportan tanto **Hemeroteca Municipal** como **Hemeroteca Digital** como tipos de destino.
