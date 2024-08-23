"use client";
import Link from "next/link";
import logo from "@/public/LLM.jpg";
// import Image from "next/image";
function Navbar() {
  return (
    // <nav className="py-1 flex gap-x-4 border-b-1 border-slate-600 bg-slate-800 text-slate-200">
    <nav className="py-1 bg-slate-800 border-b border-gray-200 dark:border-gray-600 text-slate-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto pl-4">
        <a className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo.src} className="h-8" alt="XLLM Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            XLLM
          </span>
        </a>
        <div className="flex pr-6 md:order-2 space-x-5 md:space-x-0 rtl:space-x-reverse">
          <Link href="https://mltblog.com/3WcTS9C" className="py-1">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Article
            </button>
          </Link>
        </div>
      </div>
      {/* <img src={logo.src} alt="xllm logo" className="pl-4" width="45" />
      <a className="text-xl font-semibold">XLLM</a>
      <Link href="/about">Article</Link> */}
    </nav>
  );
}
export default Navbar;
