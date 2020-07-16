## Introduction

A template boiler plate for MERN stack project. It includes:

1. Sign in/Sign out
2. Remember Me
3. Jsonweb token

This can be used as a boiler template for any MERN stack. Use it and customize however you want for your project.

## How to run

1. In the config file, creat a new file called dev.js
2. Add a variable name mongoUri and assigned the value to your mongo database.
   For ex:
   module.exports = {
   mongoUri: ""
   }
3. Go to client/src/ and open setupProxy.js,replace the target value to whatever value that your server will be running on.
4. go back to root foler
5. run npm i
6. npm run start
