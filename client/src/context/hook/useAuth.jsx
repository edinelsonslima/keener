import { useState, useEffect } from "react";
import axios from "axios";

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState('')
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const user = sessionStorage.getItem("user");
    if (token) {
      axios.defaults.headers.token = token;
      setAuthenticated(true);
      setUser(user)
    }

    setLoading(false);
  }, []);

  async function handlePostLogin(user, password) {
    try {
      const { data, headers } = await axios({
        method: "POST",
        url: "/login",
        data: {
          user: user,
          password: password,
        },
      });

      sessionStorage.setItem("token", headers.token);
      sessionStorage.setItem("user", JSON.stringify(data));
      axios.defaults.headers.token = headers.token;
      setAuthenticated(true);
      setUser(data)
      return true;
    } catch (error) {
      console.error("Erro no login: " + error);
      return false;
    }
  }

  function handlerLogout() {
    setAuthenticated(false);
    setUser('')
    sessionStorage.clear();
    axios.defaults.headers.token = undefined;
    return true;
  }
  
  return { authenticated, loading, handlePostLogin, handlerLogout, user };
}
