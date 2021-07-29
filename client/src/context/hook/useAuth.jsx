import { useState, useEffect } from "react";
import axios from "axios";

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      axios.defaults.headers.token = token;
      setAuthenticated(true);
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
      axios.defaults.headers.token = headers.token;
      setAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Erro no login: " + error);
      return false;
    }
  }

  function handlerLogout() {
    setAuthenticated(false);
    sessionStorage.clear();
    axios.defaults.headers.token = undefined;
    return true;
  }
  
  return { authenticated, loading, handlePostLogin, handlerLogout };
}
