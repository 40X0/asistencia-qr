// ============================================================
// CONFIGURACIÓN DE FIREBASE
// ============================================================
// Reemplaza los valores de abajo con los de TU proyecto de Firebase.
// Los encuentras en: Firebase Console > (ícono engranaje) Configuración
// del proyecto > pestaña "General" > sección "Tus apps" > SDK de Firebase.
//
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

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
