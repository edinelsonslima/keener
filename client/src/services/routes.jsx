import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { CardProvider } from "../context/CardContext";

import CustomRoute from "../components/CustomRoute";

import Login from "../pages/login";
import User from "../pages/user";
import Profile from "../pages/profile";
import Home from "../pages/home";

import Loading from "../components/Loading";


export default function Routes() {
  


  return (
    <AuthProvider>
      <CardProvider>
        <BrowserRouter>
          <Switch>
            <CustomRoute path="/new_user" exact>
              <User title="Novo usuário" back="/login" enviar="Cadastra" />
            </CustomRoute>
            <CustomRoute path="/login" exact component={Login} />
            <CustomRoute isPrivate path="/profile" exact component={Profile} />
            <CustomRoute isPrivate path="/" exact component={Home} />

          </Switch>
        </BrowserRouter>
      </CardProvider>
    </AuthProvider>
  );
}
