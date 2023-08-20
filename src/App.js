import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone"; // Import useDropzone from the correct location
import "./scrollBar.css"
import "./App.css";
import HistoryColumn from "./HistoryColumn";

function App() {

  const [smallScreen, setSmallScreen] = useState(false)
  
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDisplayAreaExpanded, setIsDisplayAreaExpanded] = useState(true);

  const [uploadedFile, setUploadedFile] = useState(null); // State to hold the uploaded file
  const [fileContent, setFileContent] = useState(""); // State to hold the file content
  const [isFileUploaded, setIsFileUploaded] = useState(false);// State to hold the visibility of drag-and-drop box and display area
  const [historyItems, setHistoryItems] = useState([]);  // History Column
  


  const onDrop = async (acceptedFiles) => {
    const fileContents = await Promise.all(
      acceptedFiles.map(async (file) => {
        const content = await readFileContent(file);
        return { name: file.name, content };
      })
    );

    setUploadedFiles((prevFiles) => [...prevFiles, ...fileContents]);
  };

  useEffect(()=>{
    const resizeHandle = ()=>{
      setSmallScreen(window.innerWidth <=1300)
      setIsDisplayAreaExpanded(window.innerWidth > 1300); // Adjust this condition as needed

    }
    resizeHandle()
    window.addEventListener("resize", resizeHandle)
    return ()=>{
      window.removeEventListener("resize", resizeHandle)
    }
  },[])
  
  // Function to handle file change event
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
  
    if (file) {
      const content = await readFileContent(file);
      const historyObject = { name: file.name, content };
      
      setUploadedFile(file);
      setIsFileUploaded(true);
      setFileContent(content); // Use setFileContent here
      addToHistory(historyObject);
    }
  };

  // Function to read file content
  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsText(file);
    });
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
    setUploadedFiles([]); // Clear uploaded files
    setHistoryItems([]); // Clear history items
  };
  // Function to add history items
  const addToHistory = (fileName) => {
    setHistoryItems([...historyItems, fileName]);
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: true });
  return (
    <div className="App">
      <div {...getRootProps()} className="drag-drop-box">
        <input {...getInputProps()} />
        <p>
          Drag and drop a folder here or
         
          Click to Choose Folder
        </p>
      </div>
      {/* Display uploaded files */}
      <div className={`display-area ${isDisplayAreaExpanded ? "expanded" : ""}`}>
        {uploadedFiles.map((file, index) => (
          <div key={index} className="file-content">
            <h3>{file.name}</h3>
            <pre>{file.content}</pre>
          </div>
        ))}
      </div>
      {!smallScreen && (
        <HistoryColumn
          historyItems={historyItems}
          onAnalyzeNewFile={handleReset}
          onSelectHistoryItem={(selectedItem) => {
            // Handle history item selection here if needed
          }}
        />
      )}    </div>
  );
}

export default App;