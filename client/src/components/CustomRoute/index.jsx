import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import Loading from "../Loading";

export default function CustomRoute(props) {
  const { authenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  if (authenticated !== undefined) {
    if (props.isPrivate && !authenticated) {
      return <Redirect to="/login" />;
    }
  }

  if(props.from === '*') {
    return <Redirect to="/login" />;
  }

  return <Route {...props}/>
  
}
