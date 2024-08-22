"use client";
import React from "react";
import { OptionButtonProps } from "@/lib/utils/types";

const OptionButton: React.FC<OptionButtonProps> = ({
  handleOptionButtonClick,
  selectedOption,
  option1,
  option2,
}) => {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-2 bg-slate-800 rounded-md">
        <button
          type="button"
          onClick={() => handleOptionButtonClick(!selectedOption)}
          className={`flex-auto px-2 py-1 mx-2 my-2 rounded text-white text-xs ${
            selectedOption ? "bg-slate-900" : "bg-slate-800"
          }`}
        >
          {option1}
        </button>
        <button
          type="button"
          onClick={() => handleOptionButtonClick(!selectedOption)}
          className={`flex-auto px-2 py-1 mx-2 my-2 rounded text-white text-xs ${
            !selectedOption ? "bg-slate-900 " : "bg-slate-800"
          }`}
        >
          {option2}
        </button>
      </div>
    </div>
  );
};
export default OptionButton;
