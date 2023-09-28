import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./scrollBar.css";
import "./App.css";
import MovingDots from "./components/MovingDots";
import GiveResponse from "./components/GiveResponse";
function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDisplayAreaVisible, setIsDisplayAreaVisible] = useState(false);
  const [displayFiles, setDisplayFiles] = useState(false);
  const [loading, setLoading] = useState(false);
  
   //**********************local files under contruction****************/
   /*
  const LOCAL_FILE_KEY = 'CODEASSISAI.COM'
 
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_FILE_KEY, JSON.stringify(uploadedFiles));
    } catch (error) {
      console.error("Error saving data to local storage:", error);
    }
  }, [uploadedFiles]);

  useEffect(() => {
    try {
      const newList = JSON.parse(localStorage.getItem(LOCAL_FILE_KEY));
      if (newList) {
        setUploadedFiles(newList);
      }
    } catch (error) {
      console.error("Error retrieving data from local storage:", error);
    }
  }, []);
*/
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
  console.log(uploadedFiles)
  return (
    <div className="App">
      <MovingDots />

      <h1 className="logo">CodeAssist.ai</h1>

      <div className="button-group">
        <div className="flex-container">
          <div {...getRootProps()} className="drag-drop-box">
            <input {...getInputProps()} />
            <p>
              Drag and drop a folders here or Choose multiple Folders
            </p>
          </div>
          {isDisplayAreaVisible && ( // Conditionally render the button
          <>
            <button className="reset-button closer-reset" onClick={handleReset}>
              Upload New Files
            </button>
            <button className="reset-button closer-reset"  onClick={()=>{setDisplayFiles(!displayFiles)}}>
              view your files
            </button>
          </>
          )}
        </div>
      </div>
      {isDisplayAreaVisible && (
      <GiveResponse fileContent={uploadedFiles}/>
      )}
      {isDisplayAreaVisible && (
        displayFiles && (
          uploadedFiles.map((file, index) => (
            <div key={index}className="display-area">
            <div key={index} className="file-content">
              <h3>{file.name}</h3>
              <pre>{file.content}</pre>
            </div>
            </div>
          )))

        
      )}
      
      
    </div>
  );
}

export default App;
