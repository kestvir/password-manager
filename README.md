## Project description

The Password Manager app helps users to generate safe random passwords, encrypts and decrypts them using AES-256 and saves them to firebase.

## User Stories

- [x] Users are authenticated by using their email and password.
- [x] Users can generate random safe passwords using several generating options.
- [x] Users can choose to save their encrypted passwords.
- [x] Users can retrieve their saved passwords.

## Technologies used

React, TypeScript, Electron, CryptoJS, Material-UI, Firebase.

## How to use

1. Create .env file, and inside of it create REACT_APP_ENCRYPTION_SECRET field and add a safe secret.
2. Run "npm run make" command, to get the packaged application, which will reside in "out/password_manager".
