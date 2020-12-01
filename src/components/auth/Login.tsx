import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Redirect } from "react-router-dom";
import firebase from "../../firebase";
import { History } from "history";
import AuthForm from "./AuthForm";

interface LoginProps {
  history: History;
}

const Login: React.FC<LoginProps> = ({ history }) => {
  const { currentUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
      history.push("/password-generator");
    } catch (error) {
      alert(error);
    }
  };

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <AuthForm
      formSubmitHandler={handleLogin}
      formType={"Log in"}
      email={email}
      changeEmail={changeEmail}
      password={password}
      changePassword={changePassword}
    />
  );
};

export default Login;
