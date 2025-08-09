import React, { useState, ChangeEvent } from "react";
import { useDropzone } from "react-dropzone";
import { CodeBlock, dracula } from "react-code-blocks";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        <Sidebar 
          responses={responses} 
          onSelectResponse={handleSelectResponse}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <div className="main-content">
          <MovingDots />
          <h1 className="logo">CodeAssist.ai</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Upload your code files and get AI-powered assistance for error detection, debugging, and code improvements.
          </p>

          <div className="button-group">
            <div className="flex-container">
              <div {...getRootProps()} className="drag-drop-box">
                <input {...getInputProps()} />
                <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.7 }}>📁</div>
                <p>Drag and drop your files here or click to browse</p>
                <p style={{ fontSize: '0.875rem', opacity: 0.7, marginTop: '0.5rem' }}>
                  Supports: .js, .py, .java, .css, .html, .tsx, .ts and more
                </p>
              </div>
              {isDisplayAreaVisible && (
                <div className="button-container">
                  <button
                    className="reset-button"
                    onClick={handleReset}
                  >
                    🔄 Upload New Files
                  </button>
                  <button
                    className="reset-button"
                    onClick={() => setDisplayFiles(!displayFiles)}
                  >
                    {displayFiles ? '👁️ Hide Files' : '👁️ Show Files'}
                  </button>
                  <button
                    className="reset-button"
                    onClick={() => setSidebarOpen(true)}
                    style={{ display: window.innerWidth <= 1024 ? 'block' : 'none' }}
                  >
                    📚 View History
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {isDisplayAreaVisible && <GiveResponse fileContent={uploadedFiles} onNewResponse={handleNewResponse} />}
          
          {isDisplayAreaVisible && displayFiles && (
            <div style={{ marginTop: '2rem' }}>
              <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>📄 Uploaded Files</h2>
              {uploadedFiles.map((file, index) => (
                <div key={index} className="display-area">
                  <div className="file-content">
                    <h3 className="file-name">{file.name}</h3>
                    {renderCodeBlock(file)}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {selectedResponse && (
            <div className="selected-response">
              <h2>AI Response</h2>
              <p>{selectedResponse}</p>
            </div>
          )}
          
          {!isDisplayAreaVisible && (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem 1rem', 
              color: 'var(--text-muted)',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.5 }}>🚀</div>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>Get Started</h3>
              <p style={{ lineHeight: 1.6 }}>
                Upload your code files to begin. Our AI will analyze your code, detect potential issues, 
                and provide helpful suggestions for improvements.
              </p>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '1rem', 
                marginTop: '2rem',
                fontSize: '0.875rem'
              }}>
                <div style={{ padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '0.5rem' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔍</div>
                  <strong>Error Detection</strong>
                  <p style={{ margin: '0.5rem 0 0', opacity: 0.8 }}>Find bugs and issues in your code</p>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '0.5rem' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>💡</div>
                  <strong>Smart Suggestions</strong>
                  <p style={{ margin: '0.5rem 0 0', opacity: 0.8 }}>Get AI-powered improvement recommendations</p>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '0.5rem' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⚡</div>
                  <strong>Quick Analysis</strong>
                  <p style={{ margin: '0.5rem 0 0', opacity: 0.8 }}>Fast and comprehensive code review</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
