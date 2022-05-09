import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import { AuthContext } from "../../context/auth/AuthContext";

import "./styles.css";

export const RegisterPage = () => {
  const { register } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "anaranjo@test.com",
    password: "123456",
    name: "Adrian Naranjo",
  });

  const onChange = ({ target }) => {
    const { name, value } = target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();

    const { email, password, name } = form;
    const msg = await register(name, email, password);

    if (msg !== true) {
      Swal.fire("Error", msg, "error");
    }
  };

  const todoOk = () => {
    return form.email.length > 0 &&
      form.password.length > 0 &&
      form.name.length > 0
      ? true
      : false;
  };

  return (
    <div className="registerPage">
      <form
        className="login100-form validate-form flex-sb flex-w"
        onSubmit={onSubmit}
      >
        <span className="registerPage__title">REGISTER IN</span>

        <div className="inputWrapper">
          <input
            className="input"
            type="text"
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={onChange}
          />
          <span className="focus-input100"></span>
        </div>

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
            <Link to="/auth/login" className="formLink">
              Ya tienes cuenta?
            </Link>
          </div>
        </div>

        <div className="row">
          <button type="submit" className="button" disabled={!todoOk()}>
            Crear cuenta
          </button>
        </div>
      </form>
    </div>
  );
};
