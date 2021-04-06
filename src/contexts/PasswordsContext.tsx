import React, { createContext, useState, useEffect, useContext } from "react";
import firebase from "../firebase";
import CryptoJS from "crypto-js";
import { AuthContext } from "./AuthContext";

interface ProviderProps {
  children: React.ReactNode;
}

export interface PasswordDataObj {
  id: string;
  userID: string;
  service: string;
  password: string;
  username: string;
  createdAt: firebase.firestore.Timestamp;
  showPassword: boolean;
}

interface ContextProps {
  passwords: PasswordDataObj[] | [];
  loading: boolean;
}

export const PasswordsContext = createContext<Partial<ContextProps>>({});

const PasswordsContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [passwords, setPasswords] = useState<PasswordDataObj[] | []>([]);

  useEffect(() => {
    if (currentUser) {
      const db = firebase.firestore();
      return db
        .collection("passwords")
        .where("userID", "==", currentUser.uid)
        .onSnapshot(
          (querySnapshot) => {
            const passwordsData: PasswordDataObj[] = [];
            querySnapshot.forEach((doc) => {
              // doc.data() always returns a DocumentData, which is just {[field: string]: any}
              const bytes = CryptoJS.AES.decrypt(
                doc.data().password,
                process.env.REACT_APP_ENCRYPTION_SECRET as string
              );
              const passworDocumentDataObj = {
                ...doc.data(),
                id: doc.id,
                password: bytes.toString(CryptoJS.enc.Utf8),
                createdAt: doc.data().createdAt.toDate(),
                showPassword: false,
              } as PasswordDataObj;
              passwordsData.push(passworDocumentDataObj);
            });
            setPasswords(passwordsData);
          },
          (err) => {
            console.error(err);
            alert(err.message);
          }
        );
    }
  }, [currentUser]);

  return (
    <PasswordsContext.Provider value={{ passwords }}>
      {children}
    </PasswordsContext.Provider>
  );
};

export default PasswordsContextProvider;
