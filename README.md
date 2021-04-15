## Password manager

The Password Manager app helps users to generate safe random passwords, encrypts and decrypts them using AES-256 and saves them to Firebase.

![password-manager](https://user-images.githubusercontent.com/25966281/114908192-85754b00-9e24-11eb-8ba8-28f5c8e51ada.gif)

## User Stories

- [x] Users are authenticated by using their email and password.
- [x] Users can reset their main app password. 
- [x] Users can generate random safe passwords using several generating options.
- [x] Users can choose to save their encrypted passwords.
- [x] Users can retrieve, update and delete their saved passwords.

## Technologies used

React, TypeScript, Electron, CryptoJS, Material-UI, Firebase.

## How to use

1. Create .env file, and inside of it create REACT_APP_ENCRYPTION_SECRET field and add a safe secret.
2. Run "npm run make" command, to get the packaged application, which will reside in "out/password_manager".
