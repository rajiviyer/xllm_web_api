import Card from "./Card";
import { Doc } from "@/lib/utils/types";
import { useState } from "react";
import "./Output.css";
function Output({ result }: { result: Doc[] }) {
  const nResult: number = result.length;
  const [selectedDoc, setSelectedDoc] = useState<Doc | null>(null);
  const openModal = (doc: Doc) => {
    console.log("clicked");

    setSelectedDoc(doc);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedDoc(null);
  };

  return (
    <div>
      {nResult > 0 && <h2 className="text-slate-100 mb-6 text-center">Docs</h2>}
      <div className="flex flex-wrap gap-4 align-middle relative z-[1]">
        {result.map((doc, index) => {
          return <Card key={index} doc={doc} onClick={() => openModal(doc)} />;
        })}
        {selectedDoc && (
          <div className="modal-overlay">
            <div className="modal">
              <p className="modal-content">
                <span className="text-sunset font-bold">Title: </span>
                {selectedDoc.title}
              </p>
              <p className="modal-content">
                <span className="text-sunset font-bold">Category: </span>
                {selectedDoc.category}
              </p>
              <p className="modal-content">
                <span className="text-sunset font-bold">Tags: </span>
                {selectedDoc.tags}
              </p>
              <p className="modal-content">
                <span className="text-sunset font-bold">Description: </span>
                {selectedDoc.description}
              </p>
              <p className="modal-content">
                <span className="text-sunset font-bold">Modified Date: </span>
                {selectedDoc.modified_date}
              </p>
              {selectedDoc.link_list_text && (
                <p className="modal-content">
                  <span className="text-sunset font-bold">Links: </span>
                  {selectedDoc.link_list_text}
                </p>
              )}
              {/* <p className="modal-content">
                <span className="text-sunset font-bold">Links: </span>
                {selectedDoc.link_list_text}
              </p> */}
              <button className="mt-4" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Output;
