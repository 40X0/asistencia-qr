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
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROYECTO.firebaseapp.com",
  projectId: "TU_PROYECTO",
  storageBucket: "TU_PROYECTO.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
