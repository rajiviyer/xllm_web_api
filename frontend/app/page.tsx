"use client";
import ParamForm from "@/components/ParamForm";
import Output from "@/components/Output";
import { useState } from "react";
import { Doc, DataProps } from "@/lib/utils/types";
function HomePage() {
  const [result, setResult] = useState<DataProps>({ embeddings: [], docs: [] });
  return (
    <div className="flex flex-col lg:flex-row">
      {/* <div>Test</div> */}
      {/* Left Container */}
      <div className="w-full lg:w-1/3 px-4 pt-1 flex flex-col overflow-y-auto items-center mt-2">
        {/* lg:sticky top-16 h-auto lg:h-screen */}
        <ParamForm setResult={setResult} />
      </div>
      {/* Right Container */}
      <div className="w-full lg:w-2/3 lg:p-8 overflow-y-auto h-screen mt-2">
        <Output result={result} />
      </div>
    </div>
  );
}
export default HomePage;
