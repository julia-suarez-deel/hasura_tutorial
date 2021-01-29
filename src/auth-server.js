require('dotenv').config();
const firebase = require("firebase");
require("firebase/auth");
const firebaseAdmin = require("firebase-admin");
const firebaseConfig = require("../firebase-config.json");
const express = require('express');
const expressHandleBars = require('express-handlebars');
const {setUserHasuraClaim} = require("./utils/hasura-claim");
const {
  AUTH_SERVER_PORT = '3005',
  FIREBASE_PROJECT_ID,
  FIREBASE_PRIVATE_KEY_ID,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_CLIENT_ID,
  FIREBASE_CERT_URL
} = process.env;

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert({
    "type": "service_account",
    "project_id": FIREBASE_PROJECT_ID,
    "private_key_id": FIREBASE_PRIVATE_KEY_ID,
    "private_key": FIREBASE_PRIVATE_KEY,
    "client_email": FIREBASE_CLIENT_EMAIL,
    "client_id": FIREBASE_CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": FIREBASE_CERT_URL
  }),
});
firebase.initializeApp(firebaseConfig);

const app = express();

app.engine('handlebars', expressHandleBars({defaultLayout: false}));
app.set('view engine', 'handlebars');

const USERS = {
  staff: {
    email: 'staff@example.com',
    password: 'staff123456'
  },
  customer: {
    email: 'customer@example.com',
    password: 'customer123456'
  }
};

app.get('/:role(staff|customer)', async (req, res) => {
  const {role} = req.params;
  const {email, password} = USERS[role];
  await setUserHasuraClaim({role, email});
  const {user} = await firebase.auth().signInWithEmailAndPassword(email, password);
  const JWT = await user.getIdToken();
  await res.render('JwtView', {
    role,
    JWT,
  });
});

app.listen(AUTH_SERVER_PORT, () => {
  console.log(
    `Server listening
     Get an staff JWT at http://localhost:${AUTH_SERVER_PORT}/staff
     Get an customer JWT at http://localhost:${AUTH_SERVER_PORT}/customer
     `
  )
});
