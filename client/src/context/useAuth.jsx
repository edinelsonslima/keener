import { useState, createContext, useMemo } from "react";

const AuthContext = createContext();

const AuthProvider = (props) => {
  const dataDefault = {
    auth: false,
    token: '',
    user: ''
  }
  const [data, setData] = useState(dataDefault);

  const value = useMemo(() => ({ data, setData }), [data]);

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
