import React from "react";
import "./App.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Nav from "./components/layout/Nav";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import ResetPassword from "./components/auth/PasswordReset";
import AuthProvider from "./contexts/AuthContext";
import PasswordsProvider from "./contexts/PasswordsContext";
import PrivateRoute from "./components/auth/PrivateRoute";
import PasswordGenerator from "./components/passwordGenerator/PasswordGenerator";
import PasswordManager from "./components/passwordManager/PasswordManager";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const App: React.FC = () => {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <AuthProvider>
          <PasswordsProvider>
            <Router>
              <Nav />
              <Switch>
                <PrivateRoute exact path="/" component={PasswordManager} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/password-reset" component={ResetPassword} />
                <PrivateRoute
                  path="/password-generator"
                  component={PasswordGenerator}
                />
              </Switch>
            </Router>
          </PasswordsProvider>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
