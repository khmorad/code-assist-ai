import React, { useState, ChangeEvent } from "react";
import { useDropzone } from "react-dropzone";
import { CodeBlock, dracula } from "react-code-blocks";
import "./scrollBar.css";
import "./App.css";
import MovingDots from "./components/MovingDots.tsx";
import GiveResponse from "./components/GiveResponse";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const languageMapping: { [key: string]: string } = {
  js: "javascript",
  py: "python",
  java: "java",
  css: "css",
  html: "html",
};

interface FileContent {
  name: string;
  content: string;
}

function App() {
  const [uploadedFiles, setUploadedFiles] = useState<FileContent[]>([]);
  const [isDisplayAreaVisible, setIsDisplayAreaVisible] = useState(false);
  const [displayFiles, setDisplayFiles] = useState(true);
  const [responses, setResponses] = useState<string[]>([]);
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);

  const getFileExtension = (filename: string): string => {
    return filename.split(".").pop()!.toLowerCase();
  };

  const renderCodeBlock = (file: FileContent) => {
    const extension = getFileExtension(file.name);
    const language = languageMapping[extension] || "plaintext";

    return (
      <CodeBlock
        key={file.name}
        text={file.content}
        language={language}
        showLineNumbers={true}
        theme={dracula}
      />
    );
  };

  const onDrop = async (acceptedFiles: File[]) => {
    const fileContents = await Promise.all(
      acceptedFiles.map(async (file) => {
        const content = await readFileContent(file);
        return { name: file.name, content };
      })
    );

    setUploadedFiles((prevFiles) => [...prevFiles, ...fileContents]);
    setIsDisplayAreaVisible(true);
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];

    if (file) {
      const content = await readFileContent(file);
      setUploadedFiles([{ name: file.name, content }]);
      setIsDisplayAreaVisible(true);
    }
  };

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target!.result as string);
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

  const handleNewResponse = (response: string) => {
    setResponses((prevResponses) => [...prevResponses, response]);
  };

  const handleSelectResponse = (response: string) => {
    setSelectedResponse(response);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
  });

  console.log(uploadedFiles);

  return (
    <div className="App">
    <Navbar />
    <div className="app-container">
      <Sidebar responses={responses} onSelectResponse={handleSelectResponse} />
      <div className="main-content">
        <MovingDots />
        <h1 className="logo">CodeAssist.ai</h1>

        <div className="button-group">
          <div className="flex-container">
            <div {...getRootProps()} className="drag-drop-box">
              <input {...getInputProps()} />
              <p>Drag and drop your file here or Choose multiple Files</p>
            </div>
            {isDisplayAreaVisible && (
              <>
                <button
                  className="reset-button closer-reset"
                  onClick={handleReset}
                >
                  Upload New Files
                </button>
                <button
                  className="reset-button closer-reset"
                  onClick={() => {
                    setDisplayFiles(!displayFiles);
                  }}
                >
                  View Your Files
                </button>
              </>
            )}
          </div>
        </div>
        {isDisplayAreaVisible && <GiveResponse fileContent={uploadedFiles} onNewResponse={handleNewResponse} />}
        {isDisplayAreaVisible && displayFiles && (
          uploadedFiles.map((file, index) => (
            <div key={index} className="display-area">
              <div key={index} className="file-content">
                <h3 className="file-name">{file.name}</h3>
                {renderCodeBlock(file)}
              </div>
            </div>
          ))
        )}
        {selectedResponse && (
          <div className="selected-response">
            <h2>Selected Response</h2>
            <p>{selectedResponse}</p>
          </div>
        )}
      </div>
    </div>
  </div>

  );
}

export default App;
