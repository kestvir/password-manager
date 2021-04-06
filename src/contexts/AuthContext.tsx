import React, { useEffect, useState, createContext } from "react";
import firestore from "../firebase";
import Loader from "../components/shared/Loader";

interface ProviderProps {
  children: React.ReactNode;
}

interface ContextProps {
  currentUser: firestore.User | null;
}

export const AuthContext = createContext<Partial<ContextProps>>({});

const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firestore.User | null>(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    firestore.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  if (pending) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
