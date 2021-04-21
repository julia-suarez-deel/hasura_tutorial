# Firebase authentication
This is how you can create your own firebase project and use it with the `auth-server.js` in this project to generate JWT's with custom roles

1. Sign up in firebase console
2. Create a new firebase project with any name you like
3. Go to the authentication section and enable `Email/Password` authentication
   ![Enable firebase password authentication](images/firebase-enable-password-auth.png)
4. Go to the users sections and create 2 users
    1. Email: `staff@example.com` Password: `staff123456`
    2. Email: `customer@example.com` Password `customer123456`.
       
    This is how your users should look like:
   ![Firebase sample user list](images/firebase-users.png)
5. Go to  `Project settings` > `Service accounts` > `Generate new private key`
   ![Firebase generate private key](images/firebase-project-settings.png)
6. Go to `Project settings` > `Your apps` > `Add app` then select the icon with the `</>` which means `web app`, put any name you like and copy the firebase config to a `firebase-config.json` file at the root of the project
   Your `firebase-config.json` should look like this:
   ![img.png](images/firebase-frontend-config.png)

7. You will get a JSON file, copy it in the root of the project and rename it to `firebase-credentials.json`
8. Run `npm run server:authentication:start` and you will see the following in the console
![img.png](images/auth-server-start-output.png)

If you visit either of the URL provided you will see the following
![Local running server for staff role](images/local-jwt-staff.png)
![Local running server for customer role](images/local-jwt-customer.png)
