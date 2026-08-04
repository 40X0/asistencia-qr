// ============================================================
// CONFIGURACIÓN DE LA APP
// ============================================================
// 1) Pega aquí las claves de TU proyecto de Firebase.
// 2) Cambia la contraseña de acceso si quieres otra.
// 3) Ajusta el horario de clase si cambia.
// Instrucciones completas en README.md
// ============================================================

const firebaseConfig = {
  apiKey: "AIzaSyBj7WG6vE5C5hife0lGc0GSkZFkiCxPEzw",
  authDomain: "asistencia-colegio-2270e.firebaseapp.com",
  projectId: "asistencia-colegio-2270e",
  storageBucket: "asistencia-colegio-2270e.firebasestorage.app",
  messagingSenderId: "352574400653",
  appId: "1:352574400653:web:b0385ea5651eb795745ac4"
};

// Contraseña única para entrar a la app (encargado y admin usan la misma).
const APP_PASSWORD = "TALTA2026@";

// Horario de clase (formato 24 horas, "HH:MM")
const HORARIO = {
  inicio: "07:00",     // 7:00 AM - desde aquí se puede marcar "presente"
  tardanza: "07:50",   // 7:50 AM - desde aquí hasta el fin se marca "tardanza"
  fin: "09:00"          // 9:00 AM - después de esto, quien no escaneó queda "inasistencia" automáticamente
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Inicia sesión anónima en Firebase (necesario para que las Reglas de
// seguridad permitan leer/escribir). El usuario nunca ve esto: solo
// necesita escribir la contraseña de la app.
function asegurarSesion(){
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      if(user){
        resolve(user);
      } else {
        auth.signInAnonymously().then(cred => resolve(cred.user)).catch(reject);
      }
    });
  });
}
