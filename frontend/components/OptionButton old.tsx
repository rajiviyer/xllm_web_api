// "use client";
// import React from "react";
// import { OptionButtonProps } from "@/lib/utils/types";

// const OptionButton: React.FC<OptionButtonProps> = ({
//   handleOptionButtonClick,
//   selectedOption,
// }) => {
//   return (
//     <div className="px-3">
//       <div className="flex flex-wrap items-center space-x-4 mb-4 bg-slate-800 rounded-md px-1">
//         <label className="text-cyan-600 text-xs">Bypass Ignore List</label>
//         <button
//           type="button"
//           onClick={() => handleOptionButtonClick("yes")}
//           className={`flex-auto px-4 py-1 mx-2 my-2 rounded text-white text-xs ${
//             selectedOption === "yes" ? "bg-slate-900" : "bg-slate-800"
//           }`}
//         >
//           Yes
//         </button>
//         <button
//           type="button"
//           onClick={() => handleOptionButtonClick("no")}
//           className={`flex-auto px-4 py-1 mx-2 my-2 rounded text-white text-xs ${
//             selectedOption === "no" ? "bg-slate-900 " : "bg-slate-800"
//           }`}
//         >
//           No
//         </button>
//       </div>
//     </div>
//   );
// };
// export default OptionButton;
