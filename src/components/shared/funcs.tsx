import CryptoJS from "crypto-js";

export const encryptPassword = (password: string) =>
  CryptoJS.AES.encrypt(
    password,
    process.env.REACT_APP_ENCRYPTION_SECRET as string
  ).toString();
