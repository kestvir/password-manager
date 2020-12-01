import React, { useState, useContext } from "react";
import firebase from "../../firebase";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { History } from "history";
import AuthForm from "./AuthForm";

interface SignupProps {
  history: History;
}

const Signup: React.FC<SignupProps> = ({ history }) => {
  const { currentUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
      history.push("/password-generator");
    } catch (error) {
      alert(error);
    }
  };

  if (currentUser) {
    return <Redirect to="/password-generator" />;
  }

  return (
    <AuthForm
      formSubmitHandler={handleSignUp}
      formType={"Sign up"}
      email={email}
      changeEmail={changeEmail}
      password={password}
      changePassword={changePassword}
    />
  );
};

export default Signup;
