import React from "react";
import { Container } from "react-bootstrap";
import Signup from "../components/authentication/SignUp";
import { AuthProvider } from "../contexts/AuthContext";
import Dashboard from "./Dashboard";
import Login from "../components/authentication/Login.js";
import PrivateRoute from "../components/authentication/PrivateRoute";
import ForgetPassword from "./authentication/ForgetPassword";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UpdateProfile from "../components/authentication/UpdateProfile";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />

              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forget-password" component={ForgetPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
