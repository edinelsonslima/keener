import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthProvider } from "../context/useAuth";
import { CardProvider } from "../context/useCards";
import Login from "../pages/login";
import Home from "../pages/home";
import Popup from "../components/PopUp";


export default function Routes() {
  return (
    <AuthProvider>
      <CardProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/" exact component={Home} />
            <Route path="/pop" exact component={Popup}/>
          </Switch>
        </BrowserRouter>
      </CardProvider>
    </AuthProvider>
  );
}
