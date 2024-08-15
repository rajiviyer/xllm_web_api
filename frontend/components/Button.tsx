import React from "react";
function Button({
  children,
  buttonType,
}: {
  children: React.ReactNode;
  buttonType: "reset" | "button" | "submit";
}) {
  return (
    <div>
      <button
        type={buttonType}
        className="p-2 bg-sky-950 hover:bg-sky-800 text-white text-sm rounded-md"
      >
        {children}
      </button>
    </div>
  );
}
export default Button;
