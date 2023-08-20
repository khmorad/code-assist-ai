import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import "./scrollBar.css";
import "./App.css";
import MovingDots from "./MovingDots";

function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDisplayAreaVisible, setIsDisplayAreaVisible] = useState(false);

  
  const onDrop = async (acceptedFiles) => {
    const fileContents = await Promise.all(
      acceptedFiles.map(async (file) => {
        const content = await readFileContent(file);
        return { name: file.name, content };
      })
    );

    setUploadedFiles((prevFiles) => [...prevFiles, ...fileContents]);
    setIsDisplayAreaVisible(true);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const content = await readFileContent(file);
      setUploadedFiles([{ name: file.name, content }]);
      setIsDisplayAreaVisible(true);
    }
  };

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

  const handleReset = () => {
    setUploadedFiles([]);
    setIsDisplayAreaVisible(false);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: true });

  return (
    <div className="App">
      <MovingDots />

      <h1 className = "logo">CodeAssist.ai</h1>

      <div className="button-group">
        <div className="flex-container">
          <div {...getRootProps()} className="drag-drop-box">
            <input {...getInputProps()} />
            <p>
              Drag and drop a folder here or
              Click to Choose Folder
            </p>
          </div>
          <button className="reset-button closer-reset" onClick={handleReset}>
            Upload New File
          </button>
        </div>
      </div>

      {isDisplayAreaVisible && (
        <div className="display-area">
          {uploadedFiles.map((file, index) => (
            <div key={index} className="file-content">
              <h3>{file.name}</h3>
              <pre>{file.content}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;