import React, { useContext } from "react";
import firebase from "../../firebase";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../../contexts/AuthContext";
import { withRouter, Link } from "react-router-dom";
import { History, Location } from "history";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";

interface NavProps {
  history: History;
  location: Location;
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "7rem",
  },
  navGridContainer: {
    alignItems: "center",
  },
  navLinksList: {
    listStyle: "none",
    display: "flex",
  },
  navLinks: {
    color: "#fff",
    textDecoration: "none",
    textTransform: "uppercase",
  },
  authBtnGrid: {
    display: "flex",
    justifyContent: "flex-end",
  },
  logOutBtn: {
    textTransform: "uppercase",
  },
}));

const Nav: React.FC<NavProps> = ({ history, location: { pathname } }) => {
  const { currentUser } = useContext(AuthContext);

  const classes = useStyles();

  const signOut = () => {
    firebase.auth().signOut();
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <AppBar color="primary" position="fixed">
        <Toolbar>
          <Grid className={classes.navGridContainer} container>
            <Grid item xs={4}>
              <MenuList className={classes.navLinksList}>
                <MenuItem
                  component={Link}
                  to="/password-generator"
                  style={{ marginRight: "1.5rem" }}
                  selected={"/password-generator" === pathname}
                >
                  <Typography variant="h6" className={classes.navLinks}>
                    Generator
                  </Typography>
                </MenuItem>
                <MenuItem component={Link} to="/" selected={"/" === pathname}>
                  <Typography variant="h6" className={classes.navLinks}>
                    Manager
                  </Typography>
                </MenuItem>
              </MenuList>
            </Grid>

            <Grid item xs={4}>
              <Typography style={{ textAlign: "center" }} variant="h5">
                {currentUser
                  ? `Signed in as ${currentUser.email}`
                  : "You are currently not logged in."}
              </Typography>
            </Grid>

            <Grid item xs={4} className={classes.authBtnGrid}>
              <MenuList className={classes.navLinksList}>
                {currentUser ? (
                  <MenuItem className={classes.logOutBtn} onClick={signOut}>
                    <Typography variant="h6">Log out</Typography>{" "}
                  </MenuItem>
                ) : (
                  <>
                    <MenuItem
                      component={Link}
                      to="/login"
                      selected={"/login" === pathname}
                    >
                      <Typography variant="h6">Log in</Typography>
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/signup"
                      selected={"/signup" === pathname}
                    >
                      <Typography variant="h6">Sign up</Typography>
                    </MenuItem>
                  </>
                )}
              </MenuList>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(Nav);
