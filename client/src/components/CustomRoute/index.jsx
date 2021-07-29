import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function CustomRoute({ isPrivate, ...rest }) {
  const { authenticated } = useContext(AuthContext);
  if (isPrivate && !authenticated) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest} />;
}
