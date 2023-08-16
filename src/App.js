import React, { useState } from 'react';

function App() {
  // State to hold the contents of the uploaded file
  const [fileContent, setFileContent] = useState('');

  // Function to handle file change event
  const handleFileChange = (event) => {
    // Get the selected file from the input
    const file = event.target.files[0];

    // Check if a file was selected
    if (file) {
      // Create a FileReader instance
      const reader = new FileReader();

      // Set up the onload event handler
      reader.onload = (e) => {
        // Update the fileContent state with the read contents
        setFileContent(e.target.result);
      };

      // Read the contents of the file as text
      reader.readAsText(file);
    }
  };

  return (
    <div className="App">
      <h1>File Reader App</h1>
      
      {/* Input element for selecting a text file */}
      <input type="file" accept=".js, .py, .css" onChange={handleFileChange} />
      
      <div>
        <h2>File Content:</h2>
        {/* Display the contents of the selected file */}
        <pre>{fileContent}</pre>
      </div>
    </div>
  );
}

export default App;
