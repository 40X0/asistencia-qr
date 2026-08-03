# Asistencia QR

App web para registrar la asistencia de alumnos escaneando un código QR (DNI), con panel de administrador para revisar la asistencia por día/alumno y marcar inasistencias como **justificadas** (amarillo).

Archivos:
- `index.html` — pantalla del encargado: escanea el QR y registra asistencia.
- `admin.html` — panel para revisar asistencias y marcar presente / justificado / ausente.
- `generar-qr.html` — pega tu lista de alumnos y genera los QR para imprimir, además de subirlos a Firebase.
- `firebase-config.js` — aquí van tus claves de Firebase (paso 1 abajo).
- `manifest.json`, `icon-192.png`, `icon-512.png` — para poder "instalar" la app en la pantalla de inicio del celular.

---

## Paso 1: Crear el proyecto de Firebase (gratis)

1. Entra a **https://console.firebase.google.com** con tu cuenta de Google y crea un proyecto nuevo (ej. "asistencia-colegio").
2. En el menú lateral entra a **Compilación > Firestore Database** → **Crear base de datos** → elige modo **producción** → cualquier región cercana (ej. `southamerica-east1`).
3. En el menú lateral entra a **Compilación > Authentication** → pestaña **Sign-in method** → habilita **Correo electrónico/Contraseña**.
4. En la pestaña **Users** de Authentication, crea 1 o 2 usuarios (uno por tablet), por ejemplo:
   - `tablet1@tucolegio.com` / una contraseña
   - `admin@tucolegio.com` / una contraseña
   Estas son las credenciales que usarán para entrar a `index.html` y `admin.html`.
5. Ve a **Configuración del proyecto** (ícono de engranaje arriba a la izquierda) → pestaña **General** → baja hasta "Tus apps" → clic en el ícono `</>` (Web) → registra la app (no necesitas hosting de Firebase).
6. Copia el objeto `firebaseConfig` que te muestra y pégalo en el archivo **`firebase-config.js`**, reemplazando los valores `TU_...`.

### Reglas de seguridad de Firestore
En Firestore → pestaña **Reglas**, reemplaza por esto y publica (solo usuarios logueados pueden leer/escribir):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## Paso 2: Cargar tu lista de alumnos y generar los QR

1. Abre `generar-qr.html`, entra con el usuario `admin`.
2. Copia de tu Google Docs/Sheets la columna de **DNI** y **Nombre completo** y pégala en el cuadro de texto, un alumno por línea:
   ```
   72345678, Ana María Torres Quispe
   70123456, Luis Fernando Ríos Vega
   ```
   (Si tu lista está en Google Docs como texto, cópiala igual; si está en una tabla de Sheets, selecciona las dos columnas y pega directo — el separador por tabulador también funciona.)
3. Clic en **Generar códigos QR** → aparecen las tarjetas con el QR y el nombre.
4. Clic en **Guardar lista en Firebase** para que la app pueda reconocer esos DNI al escanear.
5. Clic en **Imprimir / Guardar como PDF** para imprimir los carnets y entregárselos a los alumnos (o pegarlos en su carnet/credencial física).

> El QR solo contiene el número de DNI. Los nombres viven en Firebase, así que si un alumno cambia de nombre no hay que reimprimir el QR.

---

## Paso 3: Subir todo a GitHub

1. Crea un repositorio nuevo en GitHub (puede ser público o privado).
2. Sube **todos los archivos de esta carpeta** (`index.html`, `admin.html`, `generar-qr.html`, `firebase-config.js`, `style.css`, `manifest.json`, `icon-192.png`, `icon-512.png`, `README.md`) a la raíz del repo.
3. Ve a **Settings > Pages** del repositorio → en "Source" elige la rama `main` y carpeta `/ (root)` → Guardar.
4. Espera 1-2 minutos y GitHub te dará una URL tipo:
   `https://tu-usuario.github.io/tu-repositorio/`

> ⚠️ Si el repositorio es **público**, cualquiera podrá ver tu `firebase-config.js` (esas claves no son secretas por diseño, Firebase las protege con las Reglas de seguridad de Firestore y el login), pero **no podrán entrar a la app** sin un usuario/contraseña válido, y no podrán leer/escribir datos sin haber iniciado sesión. Aun así, si prefieres más privacidad, crea el repositorio como **privado** (GitHub Pages funciona igual con repos privados en cuentas Pro, o puedes usar Netlify/Vercel gratis como alternativa).

---

## Paso 4: "Instalar" la app en la tablet/celular

1. Abre la URL de GitHub Pages (`.../index.html`) en Chrome (Android) o Safari (iPhone).
2. **Android (Chrome):** menú ⋮ → "Agregar a pantalla de inicio" o "Instalar app".
3. **iPhone (Safari):** botón compartir → "Agregar a pantalla de inicio".
4. Quedará un ícono como cualquier otra app. Al abrirla, pedirá cámara la primera vez — acepta el permiso.

---

## Uso diario

- **Encargado (tablet):** abre la app, inicia sesión una vez (queda la sesión guardada), toca "Iniciar cámara" y escanea el QR de cada alumno. La app avisa si ya fue registrado o si el DNI no existe.
- **Admin (panel):** entra a `admin.html` para:
  - **Por día:** ver a todos los alumnos con su estado del día (verde = presente, amarillo = justificado, gris = ausente) y tocar para cambiar el estado.
  - **Por alumno:** ver el historial completo de un alumno específico y marcar cualquier día como justificado.

## Colores de estado
- 🟢 **Verde** — presente (escaneado ese día)
- 🟡 **Amarillo** — justificado (inasistencia con justificación)
- ⚪ **Gris** — ausente (no hay registro ese día)

## Notas
- Los íconos (`icon-192.png`, `icon-512.png`) son genéricos; puedes reemplazarlos por el logo del colegio (mismo nombre de archivo, mismo tamaño en píxeles).
- Puedes agregar más de un usuario en Authentication si quieres dar acceso a más de un encargado o admin.
