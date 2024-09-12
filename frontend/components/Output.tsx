import Card from "./Card";
import { Doc, Embeddings, DataProps } from "@/lib/utils/types";
import { useState } from "react";
import "./Output.css";
function Output({ result }: { result: DataProps }) {
  const docs: Doc[] = result["docs"];

  const nResult: number = docs.length;
  const embeddingsData: Embeddings[] = result["embeddings"];
  const nEmbeddings: number = embeddingsData.length;
  console.log("nEmbeddings", nEmbeddings);
  console.log("nResult", nResult);

  // console.log("embeddingsData", embeddingsData);

  const [selectedDoc, setSelectedDoc] = useState<Doc | null>(null);
  const [isRawDataExpanded, setIsRawDataExpanded] = useState(false);

  // Embeddings toggle state
  const [isEmbeddingsExpanded, setIsEmbeddingsExpanded] = useState(false);

  const openModal = (doc: Doc) => {
    console.log("clicked");

    setSelectedDoc(doc);

    // Reset description state when a new modal is opened
    setIsRawDataExpanded(false);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedDoc(null);
  };

  // Toggle description expansion
  const toggleRawText = () => {
    setIsRawDataExpanded(!isRawDataExpanded);
  };

  // Toggle embeddings container
  const toggleEmbeddings = () => {
    setIsEmbeddingsExpanded(!isEmbeddingsExpanded);
  };
  return (
    <div>
      {nResult > 0 && (
        <div>
          <h2 className="text-slate-100 mb-3 text-center">Docs</h2>
          {/* Button to toggle embeddings container */}
          {nEmbeddings > 0 && (
            <button onClick={toggleEmbeddings} className="embeddings-btn">
              {isEmbeddingsExpanded ? "Hide Embeddings" : "Show Embeddings"}
            </button>
          )}
          {/* <button onClick={toggleEmbeddings} className="embeddings-btn">
            {isEmbeddingsExpanded ? "Hide Embeddings" : "Show Embeddings"}
          </button> */}
          {/* Expandable container for embeddings data */}
          {nEmbeddings > 0 && isEmbeddingsExpanded && (
            <div className="embeddings-container">
              <table className="embeddings-table">
                <thead>
                  <tr>
                    <th>N</th>
                    <th>PMI</th>
                    <th>F</th>
                    <th>Token [from embeddings]</th>
                    <th>Word [from prompt]</th>
                  </tr>
                </thead>
                <tbody>
                  {embeddingsData.map((embedding, index) => (
                    <tr key={index}>
                      <td>{embedding.n}</td>
                      <td>{embedding.pmi.toFixed(2)}</td>
                      <td>{embedding.f}</td>
                      <td>{embedding.token}</td>
                      <td>{embedding.word}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="text-slate-100 mb-6 text-center text-xs italic mt-4">
            * Click on a card to see more details
          </p>
        </div>
      )}
      <div className="flex flex-wrap gap-4 align-middle relative z-[1]">
        {docs.map((doc, index) => {
          return <Card key={index} doc={doc} onClick={() => openModal(doc)} />;
        })}
        {selectedDoc && (
          <div className="modal-overlay">
            <div className="modal">
              <p className="modal-content">
                <span className="text-sunset font-bold">ID: </span>
                {selectedDoc.id}
              </p>
              {selectedDoc.agent?.length > 0 && (
                <p className="modal-content">
                  <span className="text-sunset font-bold">Agent: </span>
                  {selectedDoc.agent}
                </p>
              )}
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
              {selectedDoc.link_list_text?.length > 0 && (
                <p className="modal-content">
                  <span className="text-sunset font-bold">Links: </span>
                  {selectedDoc.link_list_text}
                </p>
              )}
              {selectedDoc.likes_list_text && (
                <p className="modal-content">
                  <span className="text-sunset font-bold">Likes: </span>
                  {selectedDoc.likes_list_text}
                </p>
              )}
              <p className="modal-content">
                <span className="text-sunset font-bold">Raw Text: </span>
                {/* Display partial or full description based on state */}
                {isRawDataExpanded
                  ? selectedDoc.raw_text
                  : selectedDoc.raw_text.substring(0, 50) + "..."}
                <a
                  href="#"
                  onClick={toggleRawText}
                  style={{
                    color: "#0891B2",
                    fontSize: "1rem",
                  }}
                >
                  {isRawDataExpanded ? " -" : " +"}
                </a>
              </p>
              <button id="close-card-btn" className="mt-4" onClick={closeModal}>
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
