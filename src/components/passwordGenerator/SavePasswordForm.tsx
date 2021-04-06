import React, { useState, useContext } from "react";
import firebase from "../../firebase";
import { AuthContext } from "../../contexts/AuthContext";
import TextField from "@material-ui/core/TextField";
import PasswordInput from "../shared/PasswordInput";
import Button from "@material-ui/core/Button";
import { encryptPassword } from "../shared/funcs";
import Feedback from "../shared/Feedback";

interface SavePasswordFormProps {
  passwordValue: string;
  handleCloseModal: () => void;
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
  handleCloseModal,
}) => {
  const { currentUser } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [service, setSerivice] = useState("");
  const [username, setUsername] = useState("");

  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const savePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const db = firebase.firestore();
    if (currentUser) {
      const passwordDataObj: PasswordDataObj = {
        service,
        username,
        password: encryptPassword(passwordValue),
        userID: currentUser.uid,
        createdAt: firebase.firestore.Timestamp.now(),
      };

      db.collection("passwords")
        .add(passwordDataObj)
        .then((docRef) => {
          setSerivice("");
          setUsername("");
          setOpenSuccessSnackbar(true);
          setTimeout(function () {
            handleCloseModal();
          }, 2500);
        })
        .catch((err) => {
          console.error("Error adding document: ", err);
          setOpenErrorSnackbar(true);
        });
    }
  };

  return (
    <>
      <Feedback
        open={openSuccessSnackbar}
        handleClose={() => setOpenSuccessSnackbar(false)}
        severity="success"
        message="Password saved!"
      />
      <Feedback
        open={openErrorSnackbar}
        handleClose={() => setOpenErrorSnackbar(false)}
        severity="warning"
        message="Something went wrong..."
      />
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
    </>
  );
};

export default SavePasswordForm;
