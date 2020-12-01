import React, { useState, useContext } from "react";
import firebase from "../../firebase";
import aes from "crypto-js/aes";
import { AuthContext } from "../../contexts/AuthContext";
import TextField from "@material-ui/core/TextField";
import PasswordInput from "../shared/PasswordInput";
import Button from "@material-ui/core/Button";

interface SavePasswordFormProps {
  passwordValue: string;
  closeModal: () => void;
}

interface PasswordDataObj {
  service: string;
  username: string;
  password: string;
  userID: string;
  createdAt: firebase.firestore.Timestamp;
}

const SavePasswordForm: React.FC<SavePasswordFormProps> = ({
  passwordValue,
  closeModal,
}) => {
  const { currentUser } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [service, setSerivice] = useState("");
  const [username, setUsername] = useState("");

  const savePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const db = firebase.firestore();
    console.log(currentUser);
    if (currentUser) {
      const passwordDataObj: PasswordDataObj = {
        service,
        username,
        password: aes
          .encrypt(
            passwordValue,
            process.env.REACT_APP_ENCRYPTION_SECRET as string
          )
          .toString(),
        userID: currentUser.uid,
        createdAt: firebase.firestore.Timestamp.now(),
      };

      db.collection("passwords")
        .add(passwordDataObj)
        .then((docRef) => {
          alert("Password saved!");
          console.log("Document written with ID: ", docRef.id);
          setSerivice("");
          setUsername("");
          closeModal();
        })
        .catch((err) => {
          alert(err);
          console.error("Error adding document: ", err);
        });
    }
  };

  return (
    <form onSubmit={savePassword}>
      <PasswordInput
        showPassword={showPassword}
        passwordValue={passwordValue}
        changePasswordDisplay={() => setShowPassword(!showPassword)}
      />
      <TextField
        fullWidth={true}
        required
        label="Service"
        value={service}
        onChange={(e) => setSerivice(e.target.value)}
      />
      <TextField
        fullWidth={true}
        required
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="savePasswordFormBtn"
      >
        Save password
      </Button>
    </form>
  );
};

export default SavePasswordForm;
