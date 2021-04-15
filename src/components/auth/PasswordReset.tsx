import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Redirect } from "react-router-dom";
import firebase from "../../firebase";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Feedback from "../shared/Feedback";

const PasswordReset: React.FC = () => {
  const [email, setEmail] = useState("");
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const useStyles = makeStyles((theme) => ({
    paper: {
      backgroundColor: theme.palette.background.paper,
      marginTop: theme.spacing(8),
      display: "flex",
      padding: "15px",
      borderRadius: "5px",
      flexDirection: "column",
      alignItems: "center",
    },
    passwordResetForm: {
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      width: "100%",
      marginTop: theme.spacing(1),
    },
    passwordResetFormSubmitBtn: {
      marginTop: "20px",
    },
    title: {
      color: "#fff",
    },
  }));

  const classes = useStyles();

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(function () {
        setEmail("");
        setOpenSuccessSnackbar(true);
        setSnackbarMessage("Email sent!");
      })
      .catch(function (error) {
        console.error(error);
        setOpenErrorSnackbar(true);
        setSnackbarMessage(error.message);
      });
  };

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Container maxWidth="sm">
      <Feedback
        open={openSuccessSnackbar}
        handleClose={() => setOpenSuccessSnackbar(false)}
        severity="success"
        message={snackbarMessage}
      />
      <Feedback
        open={openErrorSnackbar}
        handleClose={() => setOpenErrorSnackbar(false)}
        severity="warning"
        message={snackbarMessage}
      />
      <div className={classes.paper}>
        <form
          onSubmit={formSubmitHandler}
          className={classes.passwordResetForm}
        >
          <Typography className={classes.title} component="h5" variant="h5">
            Reset password
          </Typography>
          <TextField
            required
            variant="outlined"
            fullWidth
            margin="normal"
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
      </div>
    </Container>
  );
};

export default PasswordReset;
