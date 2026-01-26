import React from "react";

export default function Card({
  children,
  className = "",
  onClick,
  variant = "default",
  ...props
}) {
  return (
    <div className={`card card-${variant} ${className}`} onClick={onClick} {...props}>
      {children}
    </div>
  );
}
