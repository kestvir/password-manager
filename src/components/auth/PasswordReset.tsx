import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Redirect } from "react-router-dom";
import firebase from "../../firebase";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const PasswordReset: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const useStyles = makeStyles((theme) => ({
    passwordResetForm: {
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
    },
    passwordResetFormSubmitBtn: {
      marginTop: "20px",
    },
  }));

  const classes = useStyles();

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(function () {
        setEmailSent(true);
        setEmail("");
      })
      .catch(function (error) {
        alert(error);
      });
  };

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Container maxWidth="xs">
      {emailSent && <h3>Email sent!</h3>}
      <form onSubmit={formSubmitHandler} className={classes.passwordResetForm}>
        <h2>Password Reset</h2>
        <TextField
          name="email"
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.passwordResetFormSubmitBtn}
        >
          Send email
        </Button>
      </form>
    </Container>
  );
};

export default PasswordReset;
