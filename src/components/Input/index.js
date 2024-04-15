import React from "react";
import "./style.css";

const Input = ({ label, placeholder, state, setState }) => {
  return (
    <div className="input-wrapper">
      <p className="label-input">{label}</p>
      <input
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="custom-input"
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
