import React from "react";
import styles from "./ShowPassword.module.css";

export default function ShowPassword(props) {
  const handleTogglePassword = () => {
    props.passwordType === "password"
      ? props.setPasswordType("text")
      : props.setPasswordType("password");
  };
  return (
    <>
      <div className="form-check form-switch text-start">
        <input
          onClick={handleTogglePassword}
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="showPassword"
        />
        <label className="form-check-label" htmlFor="showPassword">
          Show Password
        </label>
      </div>
    </>
  );
}
