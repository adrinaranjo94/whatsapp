import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import { AuthContext } from "../../context/auth/AuthContext";

import "./styles.css";

export const LoginPage = () => {
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberme: false,
  });

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setForm((form) => ({
        ...form,
        email,
        rememberme: true,
      }));
    }
  }, []);

  const onChange = ({ target }) => {
    const { name, value } = target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const toggleCheck = () => {
    console.log("??");
    setForm({
      ...form,
      rememberme: !form.rememberme,
    });
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();

    form.rememberme
      ? localStorage.setItem("email", form.email)
      : localStorage.removeItem("email");

    const { email, password } = form;
    const ok = await login(email, password);

    if (!ok) {
      Swal.fire("Error", "Verifique el usuario y contraseña", "error");
    }
  };

  const todoOk = () => {
    return form.email.length > 0 && form.password.length > 0 ? true : false;
  };

  return (
    <div className="loginPage">
      <form onSubmit={onSubmit}>
        <span className="loginPage__title">LOGIN</span>

        <div className="inputWrapper">
          <input
            className="input"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange}
          />
          <span className="focus-input100"></span>
        </div>

        <div className="inputWrapper">
          <input
            className="input"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange}
          />
          <span className="focus-input100"></span>
        </div>

        <div className="row">
          <div className="col text-right">
            <Link to="/auth/register" className="formLink">
              Nueva cuenta?
            </Link>
          </div>
        </div>

        <div className="row">
          <button type="submit" className="button" disabled={!todoOk()}>
            Ingresar
          </button>
        </div>
      </form>
    </div>
  );
};
