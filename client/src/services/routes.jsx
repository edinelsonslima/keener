import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthProvider } from "../context/useAuth";
import { CardProvider } from "../context/useCards";


import Login from "../pages/login";
import Home from "../pages/home";

export default function Routes() {
  return (
    <AuthProvider>
      <CardProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/" exact component={Home} />
          </Switch>
        </BrowserRouter>
      </CardProvider>
    </AuthProvider>
  );
}
