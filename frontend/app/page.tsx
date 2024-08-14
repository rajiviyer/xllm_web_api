import ParamForm from "@/components/ParamForm";
import Output from "@/components/Output";
function HomePage() {
  return (
    <div className="flex flex-col lg:flex-row">
      {/* <div>Test</div> */}
      {/* Left Container */}
      <div className="w-full lg:w-1/3 p-8 flex flex-col items-center lg:sticky top-16 h-auto lg:h-screen mt-4">
        <ParamForm />
      </div>
      {/* Right Container */}
      <div className="w-full lg:w-2/3 lg:p-8 overflow-y-auto h-screen mt-4">
        <Output />
      </div>
    </div>
  );
}
export default HomePage;
