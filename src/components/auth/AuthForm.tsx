import * as React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import { Link as RoutingLink } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

interface AuthFormProps {
  formSubmitHandler: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  formType: string;
  email: string;
  password: string;
  changeEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  changePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  formSubmitHandler,
  formType,
  email,
  changeEmail,
  password,
  changePassword,
}) => {
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
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.light,
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    title: {
      color: "#fff",
    },
  }));

  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography className={classes.title} component="h5" variant="h5">
          {formType}
        </Typography>
        <form className={classes.form} onSubmit={formSubmitHandler}>
          <TextField
            value={email}
            onChange={changeEmail}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            value={password}
            onChange={changePassword}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
          {formType === "Log in" ? (
            <Grid container>
              <Grid item xs>
                <RoutingLink to="/password-reset">
                  <Link href="/password-reset" variant="body2">
                    Forgot password?
                  </Link>
                </RoutingLink>
              </Grid>
              <Grid item>
                <RoutingLink to="/signup">
                  <Link variant="body2">Don't have an account? Sign Up</Link>
                </RoutingLink>
              </Grid>
            </Grid>
          ) : (
            <RoutingLink to="/login">
              <Link variant="body2">Already have an account? Log in!</Link>
            </RoutingLink>
          )}
        </form>
      </div>
    </Container>
  );
};

export default AuthForm;
