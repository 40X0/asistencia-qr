# Asistencia QR

App web para registrar la asistencia de alumnos escaneando un código QR (DNI), con panel para revisar la asistencia por día/alumno, marcar **tardanza** e **inasistencia** automáticamente según el horario de clase, y marcar días como **justificados**.

## Archivos
- `index.html` — la app: pantalla de contraseña, luego dos botones ("Escanear QR" y "Ver asistencias").
- `generar-qr.html` — pega tu lista de alumnos, genera los QR para imprimir y los sube a Firebase.
- `firebase-config.js` — aquí van tus claves de Firebase, la contraseña de acceso y el horario de clase.
- `manifest.json`, `icon-192.png`, `icon-512.png` — para "instalar" la app en el celular/tablet.

## Cómo funciona el horario
En `firebase-config.js` está configurado:
- **7:00 PM** (`inicio`) — desde aquí se puede escanear y queda como **presente** (verde).
- **7:50 PM** (`tardanza`) — desde aquí hasta las 8:00 queda como **tardanza** (naranja).
- **8:00 PM** (`fin`) — pasada esta hora, quien no escaneó se puede marcar como **inasistencia** (rojo) con el botón "Marcar inasistencias de este día" en el panel.
- El admin puede marcar cualquier día como **justificado** (amarillo) manualmente, tocando al alumno.

Puedes cambiar estos horarios editando el bloque `HORARIO` en `firebase-config.js`.

---

## Paso 1: Crear el proyecto de Firebase (gratis)

1. Entra a **https://console.firebase.google.com** y crea un proyecto.
2. **Compilación > Firestore Database** → Crear base de datos → modo **Producción** → elige una región cercana.
3. **Compilación > Authentication** → Comenzar → pestaña **Sign-in method** → habilita **Anónimo** (Anonymous). Con esto basta, no hace falta crear usuarios uno por uno: la app usa una sola contraseña compartida y por dentro usa este login anónimo solo para poder leer/escribir datos de forma segura.
4. **Configuración del proyecto** (ícono ⚙️) → pestaña General → "Tus apps" → ícono `</>` (Web) → registra la app.
5. Copia las 6 claves que te da (`apiKey`, `authDomain`, etc.) y pégalas en `firebase-config.js`, dentro del objeto `firebaseConfig` (reemplazando lo que ya está).

### Reglas de seguridad de Firestore
En Firestore → pestaña **Reglas**, pega esto y publica:

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

## Paso 2: Configurar la contraseña y el horario
En `firebase-config.js` edita:
```js
const APP_PASSWORD = "TALTA2026@";

const HORARIO = {
  inicio: "19:00",
  tardanza: "19:50",
  fin: "20:00"
};
```
Cambia la contraseña o el horario si lo necesitas, y sube el cambio a GitHub (editar archivo → Commit changes).

## Paso 3: Cargar tu lista de alumnos y generar los QR
1. Abre `generar-qr.html`, ingresa con la contraseña.
2. Pega la lista: `DNI, Nombre completo`, un alumno por línea (puedes copiar directo de tu Google Docs/Sheets).
3. **Generar códigos QR** → **Guardar lista en Firebase** → **Imprimir / Guardar como PDF**.

## Paso 4: Subir todo a GitHub y activar GitHub Pages
1. Sube todos los archivos de esta carpeta a la raíz de tu repositorio (arrastra y suelta en "Add file → Upload files").
2. **Settings > Pages** → Source: "Deploy from a branch" → Branch: `main` / `root` → Save.
3. Espera 1-2 minutos y usa la URL que te da GitHub (algo como `https://tu-usuario.github.io/tu-repo/`).

## Paso 5: Instalar en la tablet
1. Abre la URL en Chrome.
2. Menú ⋮ → "Agregar a pantalla de inicio" o "Instalar app".
3. Al abrirla, ingresa la contraseña, acepta el permiso de cámara, y listo.

---

## Uso diario
- **Escanear QR:** toca el botón, inicia la cámara, apunta al carnet. La app dice si quedó presente, tardanza, o si ya estaba registrado.
- **Ver asistencias → Por día:** lista de todos los alumnos con su color del día y contadores (presente/tardanza/inasistencia/justificado). Toca a un alumno para cambiar su estado manualmente.
- **Ver asistencias → Por alumno:** historial completo de un alumno con sus contadores totales.
- **"Marcar inasistencias de este día":** aparece solo cuando ya pasaron las 8:00 PM de ese día y hay alumnos sin registrar; al tocarlo, guarda automáticamente "inasistencia" para todos los que no escanearon.

## Colores
- 🟢 Verde — presente
- 🟠 Naranja — tardanza
- 🔴 Rojo — inasistencia
- 🟡 Amarillo — justificado

## Notas de seguridad
- La contraseña vive en el código (`firebase-config.js`), no es a prueba de un usuario muy curioso que sepa revisar el código fuente de la página. Para un colegio con acceso controlado a las tablets, es un nivel de protección razonable. Si más adelante quieres algo más robusto (usuarios y contraseñas individuales), se puede volver a la autenticación por correo de Firebase.
