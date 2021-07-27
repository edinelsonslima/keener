import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { AuthProvider } from "../context/useAuth";
import { CardProvider } from "../context/useCards";
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
            <Route path="/login" exact component={Login} />
            <Route path="/new_user" exact>
              <User title="Novo usuário" back="/login" enviar="Cadastra"/>
            </Route>
            <Route path="/profile" exact component={Profile} />
            <Route path="/" exact component={Home} />
            <Redirect from="*" to="/login" />
          </Switch>
        </BrowserRouter>
      </CardProvider>
    </AuthProvider>
  );
}
