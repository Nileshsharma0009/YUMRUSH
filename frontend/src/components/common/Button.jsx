import React from "react";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  disabled = false,
  type = "button",
  ...props
}) {
  const baseStyle = `
    btn 
    btn-${variant} 
    btn-${size} 
    ${className}
    ${disabled ? "btn-disabled" : ""}
  `
    .split(" ")
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={baseStyle}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
