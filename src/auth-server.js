require('dotenv').config();
const firebase = require("firebase");
require("firebase/auth");
const firebaseAdmin = require("firebase-admin");
const firebaseConfig = require("../firebase-config.json");
const express = require('express');
const expressHandleBars = require('express-handlebars');
const {getFirebaseDecodedCredential} = require("./utils/firebase");
const {setUserHasuraClaim} = require("./utils/hasura-claim");
const {AUTH_SERVER_PORT = '3005'} = process.env;

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(getFirebaseDecodedCredential()),
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
