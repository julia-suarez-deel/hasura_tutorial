import {setUserHasuraClaim} from "./utils/hasura-claim";

require('dotenv').config();
const express = require('express');
const expressHandleBars  = require('express-handlebars');
const firebase = require("firebase");
require("firebase/auth");
const firebaseAdmin = require("firebase-admin");
const firebaseConfig = require("../firebase-config.json");
const {AUTH_SERVER_PORT = '3005'} = process.env;

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.applicationDefault(),
});
firebase.initializeApp(firebaseConfig);

const app = express();

app.engine('handlebars', expressHandleBars({defaultLayout: false}));
app.set('view engine', 'handlebars');

const USERS = {
  admin: {
    email: 'admin@example.com',
    password: 'admin123456'
  },
  user: {
    email: 'user@example.com',
    password: 'user123456'
  }
};

app.get('/:role(admin|user)', async (req, res) => {
  const {role} = req.params;
  const {email, password} = USERS[role];
  await setUserHasuraClaim({role, email});
  const {user} = await firebase.auth().signInWithEmailAndPassword(email, password);
  const JWT = await user.getIdToken();
  await res.render('JwtView',{
    role,
    JWT,
  });
});

app.listen(AUTH_SERVER_PORT, () => {
  console.log(
    `Server listening
     Get an admin JWT at http://localhost:${AUTH_SERVER_PORT}/admin
     Get an user JWT at http://localhost:${AUTH_SERVER_PORT}/user
     `
    )
});
