function getFirebaseDecodedCredential() {
  try {
    return require('../firebase-credentials.json');
  } catch (e) {
    return JSON.parse(Buffer.from(process.env.FIREBASE_CONFIG_BASE64, 'base64').toString('ascii'));
  }
}

module.exports = {getFirebaseDecodedCredential};
