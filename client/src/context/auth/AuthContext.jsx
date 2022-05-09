import React, { createContext, useCallback, useState } from "react";
import { privateFetch, publicFetch } from "../../helpers/fetch";

export const AuthContext = createContext();

const initialState = {
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null,
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);

  const login = async (email, password) => {
    const resp = await publicFetch("login", { email, password }, "POST");

    if (resp.ok) {
      localStorage.setItem("token", resp.token);
      const { user } = resp;

      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      });
    }

    return resp.ok;
  };

  const register = async (name, email, password) => {
    const resp = await publicFetch(
      "login/new",
      { name, email, password },
      "POST"
    );

    if (resp.ok) {
      localStorage.setItem("token", resp.token);
      const { user } = resp;

      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      });

      return true;
    }

    return resp.message;
  };

  const verificaToken = useCallback(async () => {
    const token = localStorage.getItem("token");
    // Si token no existe
    if (!token) {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });

      return false;
    }

    const resp = await privateFetch("login/renew");
    if (resp.ok) {
      localStorage.setItem("token", resp.token);
      const { user } = resp;

      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      });

      return true;
    } else {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });

      return false;
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({
      checking: false,
      logged: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        register,
        verificaToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
