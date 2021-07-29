import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function CustomRoute({ isPrivate, ...rest }) {
  const { authenticated, loading } = useContext(AuthContext);
  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (authenticated !== undefined) {
    if (isPrivate && !authenticated) {
      return <Redirect to="/login" />;
    }
  }

  return <Route {...rest} />;
}
