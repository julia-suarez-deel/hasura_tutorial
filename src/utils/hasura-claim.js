const getUserHasuraClaims = ({user, role}) => ({
  "https://hasura.io/jwt/claims": {
    "x-hasura-default-role": role,
    "x-hasura-allowed-roles": ["user", "admin"],
    "x-hasura-user-id": user.uid,
    "x-hasura-user-email": user.email,
  }
});

const setUserHasuraClaim =  async ({email, role})=>{
  const user = await firebaseAdmin.auth().getUserByEmail(email);
  await firebaseAdmin.auth().setCustomUserClaims(user.uid, getUserHasuraClaims({role, user}));
};

module.exports = {getUserHasuraClaims, setUserHasuraClaim};
