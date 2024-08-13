function HomePage() {
  return (
    <div className="flex flex-col lg:flex-row">
      {/* <div>Test</div> */}
      {/* Left Container */}
      <div className="w-full lg:w-1/3 p-8 flex flex-col items-center lg:sticky top-16 h-auto lg:h-screen">
        <h1 className="text-3xl font-bold">XLLM Project</h1>
        <p className="text-lg">
          Built using Next.js with Typescript & TailwindCSS
        </p>
      </div>
      {/* Right Container */}
      <div className="w-full lg:w-2/3 lg:p-8 overflow-y-auto h-screen">
        <h1 className="text-3xl font-bold">XLLM Project</h1>
        <p className="text-lg">
          Built using Next.js with Typescript & TailwindCSS
        </p>
      </div>
    </div>
  );
}
export default HomePage;
