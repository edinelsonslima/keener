import { createContext } from "react";
import useAuth from "./hook/useAuth";

const AuthContext = createContext();

const AuthProvider = (props) => {
  const { authenticated, handlePostLogin, handlerLogout, user, loading } =
    useAuth();

  return (
    <AuthContext.Provider
      value={{ authenticated, handlePostLogin, handlerLogout, user, loading }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
