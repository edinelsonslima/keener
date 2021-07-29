import { BrowserRouter, Switch } from "react-router-dom";
import { CardProvider } from "../context/CardContext";
import { AuthProvider } from "../context/AuthContext";

import CustomRoute from "../components/CustomRoute";

import Login from "../pages/login";
import User from "../pages/user";
import Profile from "../pages/profile";
import Home from "../pages/home";

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
            <CustomRoute from="*" to="/login" />
          </Switch>
        </BrowserRouter>
      </CardProvider>
    </AuthProvider>
  );
}
