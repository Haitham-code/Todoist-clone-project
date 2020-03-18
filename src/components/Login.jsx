import React, { useState } from "react";
import { firebase } from "../firebase";
import "../components/Login.scss";

export const Login = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [mailFocus, setMailFocus] = useState(false);
  const [passFocus, setPassFocus] = useState(false);
  const [signup, setSignup] = useState(false);
  const [mailError, setMailError] = useState("");
  const [passError, setPassError] = useState("");
  const [wrongLogin, setWrongLogin] = useState("");
  const [mailInuse, setMailInuse] = useState("");
  const mailInput = document.getElementById("email");
  const passInput = document.getElementById("password");

  const validate = () => {
    let mailError = "";
    let passError = "";
    if (!mail) {
      mailError = "Email required";
      setMailError(mailError);
    }

    if (mail && !mail.includes("@")) {
      mailError = "Enter a valid Email";
      setMailError(mailError);
    }
    if (mail && mail.includes("@")) {
      mailError = "";
      setMailError(mailError);
    }

    if (!password) {
      passError = "Password required";
      setPassError(passError);
    }

    if (password && password.length < 6) {
      passError = "Enter at least 6 characters";
      setPassError(passError);
    }
    if (password && password.length >= 6) {
      passError = "";
      setPassError(passError);
    }

    if (mailError || passError) {
      return false;
    }

    return true;
  };

  const handleChange = e => {
    if (e.target.type === "email") {
      setMail(e.target.value);
    } else if (e.target.type === "password") {
      setPassword(e.target.value);
    }
  };

  const handleBlur = e => {
    if (e.target.value === "") {
      if (e.target.type === "email") {
        setMailFocus(false);
      } else if (e.target.type === "password") {
        setPassFocus(false);
      }
    }
  };

  const login = e => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      firebase
        .auth()
        .signInWithEmailAndPassword(mail, password)
        .then(() => {})
        .catch(error => {
          console.log(error);
          setWrongLogin("'Wrong Email or Password'");
        });
      mailInput.value = "";
      passInput.value = "";
      setMail("");
      setPassword("");
    }
  };

  const sign = e => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(mail, password)
        .then(u => {})
        .catch(error => {
          setMailInuse(error.message);
        });
    }
  };

  return (
    <div className="login">
      <form action="">
        <div className="title">{signup ? "Sign up " : "Login"}</div>
        <div className="mail-inuse">{mailInuse}</div>
        <div className="wrong-login">{wrongLogin}</div>

        <div className="email">
          <input
            id="email"
            type="email"
            onChange={e => {
              handleChange(e);
            }}
            onFocus={() => setMailFocus(true)}
            onBlur={e => handleBlur(e)}
          />
          <span
            data-placeholder="Email"
            className={`${mailFocus ? "mail-focus" : ""}`}
          ></span>
          <div className="mail-error">{mailError}</div>
        </div>
        <div className="password">
          <input
            id="password"
            type="password"
            onChange={e => {
              handleChange(e);
            }}
            onFocus={() => setPassFocus(true)}
            onBlur={e => handleBlur(e)}
          />
          <span
            data-placeholder="Password"
            className={`${passFocus ? "pass-focus" : ""}`}
          ></span>
          <div className="pass-error">{passError}</div>
        </div>

        <div className="login-button">
          <button
            className={`login-1 ${signup ? "active" : ""}`}
            type="submit"
            onClick={e => {
              login(e);
            }}
          >
            Login
          </button>
          <button
            className={`sign-1 ${signup ? "active" : ""}`}
            type="submit"
            onClick={e => {
              sign(e);
            }}
          >
            Sign up
          </button>

          <div className="sign-up">
            <span>{signup ? "Back to Login" : "Don't have account?"}</span>

            <button
              onClick={e => {
                setSignup(!signup);
                setWrongLogin("");
                e.preventDefault();
              }}
            >
              {signup ? "'Login'" : "Sign up"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
