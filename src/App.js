import React, { useState } from "react";
import "./App.css";
import HistoryColumn from "./HistoryColumn";

function App() {
  // State to hold the uploaded file
  const [uploadedFile, setUploadedFile] = useState(null);
  // State to hold the file content
  const [fileContent, setFileContent] = useState("");
  // State to hold the visibility of drag-and-drop box and display area
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  // History Column
  const [historyItems, setHistoryItems] = useState([]);

  // Function to handle file change event
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setUploadedFile(file);
      setIsFileUploaded(true);
      readFileContent(file);
      addToHistory(file.name); // Add file name to history
    }
  };

  // Function to read file content
  const readFileContent = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      setFileContent(e.target.result);
    };

    reader.readAsText(file);
  };

  // Function to handle drag over event
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Function to handle drop event
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    if (file) {
      setUploadedFile(file);
      setIsFileUploaded(true);
      addToHistory(file.name);
    }
  };

  // Function to reset the state and go back to the original screen
  const handleReset = () => {
    setIsFileUploaded(false);
    setFileContent("");
  };

  // Function to add history items
  const addToHistory = (fileName) => {
    setHistoryItems([...historyItems, fileName]);
  };

  return (
    <div className="App">
      <h1> CodeAssist.AI</h1>

      <h2>
        CodeAssist.AI is designed to provide error detection and correction
        assistance for your project files.
      </h2>

      {isFileUploaded ? (
        // Display area with file content
        <div className="display-area">
          {/* Display the contents of the selected file */}
          <pre>{fileContent}</pre>
        </div>
      ) : (
        // Drag and drop box
        <label
          className="drag-drop-box"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          htmlFor="fileInput"
        >
          <p>
            Drag and drop a file here
            <br />
            or
            <br />
            Click to Choose File
          </p>
          <input
            type="file"
            accept=".js, .py, .css"
            onChange={handleFileChange}
            className="file-input"
            id="fileInput"
          />
        </label>
      )}

      {/* ... */}
      <HistoryColumn
        historyItems={historyItems}
        onAnalyzeNewFile={handleReset}
      />
      {/* ... */}
    </div>
  );
}

export default App;
