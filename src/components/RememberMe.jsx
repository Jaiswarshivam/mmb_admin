import React from "react";
import "./rememberMe.css";

const RememberMe = ({ checked, onChange }) => {
  return (
    <label className="cbx select-none">
      <div className="checkmark">
        <input
          type="checkbox"
          id="remember-cbx"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        <div className="flip">
          <div className="front" />
          <div className="back">
            <svg viewBox="0 0 16 14" height={14} width={16}>
              <path d="M2 8.5L6 12.5L14 1.5" />
            </svg>
          </div>
        </div>
      </div>
      <span className="label-text">Remember me</span>
    </label>
  );
};

export default RememberMe;


