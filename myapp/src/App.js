import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import homePage from "./pages/Home/Home";
import Navigation from "./Components/Navigation/Navigation";
import RegistrationForm from "./pages/Registration/RegistrationForm";
import loginForm from "./pages/Login/loginForm";
import Account from "./pages/Account/Account";
import Reservations from "./pages/Reservations/Reservations";
import Favorites from "./pages/Favorites/Favorites";

function App() {
  const [auth, setAuth] = React.useState(false);
  const [location, setLocation] = React.useState("Tunis");
  return (
    <>
      <Navigation
        auth={auth}
        setAuth={setAuth}
        setLocation={setLocation}
        location={location}
      />

      <Switch>
        <Route exact path="/" component={homePage} />
        <Route path="/register" component={RegistrationForm} />
        <Route path="/login" component={loginForm} />
        <Route path="/my-account" component={Account} />
        <Route path="/my-reservations" component={Reservations} />
        <Route path="/my-favorites" component={Favorites} />
      </Switch>
    </>
  );
}

export default App;
