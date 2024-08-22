import Card from "./Card";
import { Doc } from "@/lib/utils/types";
// import "./Output.css";
function Output({ result }: { result: Doc[] }) {
  // const [selectedDoc, setSelectedDoc] = useState<Doc | null>(null);
  // const openModal = (doc: Doc) => {
  //   console.log("clicked");

  //   setSelectedDoc(doc);
  // };

  // // Function to close the modal
  // const closeModal = () => {
  //   setSelectedDoc(null);
  // };

  return (
    <div>
      <h2 className="text-slate-100 mb-6 text-center">XLLM Web App</h2>
      <div className="flex flex-wrap gap-4 justify-center relative z-[1]">
        {result.map((doc, index) => {
          return <Card key={index} doc={doc} />;
        })}
        {/* {selectedDoc && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Description</h2>
              <p>{selectedDoc.description}</p>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}
export default Output;
