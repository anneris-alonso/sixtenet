# TheBus - Documentación de Arranque Local (Windows)

Este proyecto es un monorepo que gestiona por separado el servidor de la API (`backend`) y la Landing Page (`frontend`). A continuación, encontrarás los comandos exactos que necesitas ejecutar en tu consola (PowerShell) para levantar el proyecto en tu entorno local con PostgreSQL.

## Requisitos Previos
1. Tener **PostgreSQL** instalado y ejecutándose en el puerto `5432`.
2. Tus credenciales por defecto configuradas son `postgres` (usuario) y `postgres` (contraseña).
3. Asegúrate de estar en la carpeta raíz del proyecto (`e:\TheBus`) al ejecutar estos comandos.

---

## 1. Instalación de Dependencias

Si es la primera vez que clonas el proyecto o acabas de descargar una actualización, instala las dependencias usando `pnpm`:

```powershell
pnpm install
```

---

## 2. Inicializar la Base de Datos (Migraciones)

Si existen cambios en la estructura de la base de datos (nuevas tablas o columnas en Drizzle), necesitas sincronizarlas con PostgreSQL:

```powershell
$env:DATABASE_URL="postgres://postgres:postgres@localhost:5432/postgres"; pnpm --filter @workspace/db run push
```

---

## 3. Levantar el Backend (API Server)

El servidor principal maneja la API y se conecta a la base de datos. Se ejecutará en el puerto **4000**. **Nota:** Asegúrate de abrir una pestaña nueva en tu terminal para dejar este comando corriendo en segundo plano:

```powershell
$env:DATABASE_URL="postgres://postgres:postgres@localhost:5432/postgres"; $env:PORT=4000; $env:NODE_ENV="development"; pnpm --filter @workspace/api-server run dev
```

*Para comprobar que funciona, puedes entrar en: [http://localhost:4000/api/healthz](http://localhost:4000/api/healthz)*

---

## 4. Levantar el Frontend (Landing Page)

La página web principal fue construida con Vite y se ejecutará en el puerto **3030**. **Nota:** Abre otra pestaña en tu terminal para ejecutar este comando:

```powershell
$env:PORT=3030; $env:BASE_PATH="/"; pnpm --filter @workspace/landing run dev
```

*Para ver la web, visita: [http://localhost:3030/](http://localhost:3030/)*

---

## Comandos Rápidos (Resumen)

Si quieres copiar y pegar rápido, aquí los tienes resumidos:

**Terminal 1 (Backend):**
`$env:DATABASE_URL="postgres://postgres:postgres@localhost:5432/postgres"; $env:PORT=4000; $env:NODE_ENV="development"; pnpm --filter @workspace/api-server run dev`

**Terminal 2 (Frontend):**
`$env:PORT=3030; $env:BASE_PATH="/"; pnpm --filter @workspace/landing run dev`
