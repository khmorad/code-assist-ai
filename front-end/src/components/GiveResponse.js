import React, { useState, useRef } from 'react';
import "../App.tsx";
import '../componentStyling/GiveResponse.css';

const GiveResponse = ({ fileContent, onNewResponse }) => {  // Added onNewResponse prop
  const [generatedText, setGeneratedText] = useState('');
  const [responseReceived, setResponseReceived] = useState(false);
  const useIn = useRef(null);
  const apikey = process.env.REACT_APP_OPENAI_API_KEY;

  const handleGenerateSummary = async () => {
    if (!useIn.current.value.trim()) return;
    
    const newUserRequest = { role: "outgoing", content: useIn.current.value.trim() };
    setGeneratedText("");
    setResponseReceived(false);

    await processMessageToOpenAI(newUserRequest);
  };

  async function processMessageToOpenAI(message) {
    const promptMessage = {
      role: "system",
      content: `This is a summary request based on the provided file content: ${JSON.stringify(fileContent)}`,
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        promptMessage,
        { role: "user", content: message.content },
      ],
      max_tokens: 1000,
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apikey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => data.json())
      .then((data) => {
        const openAIResponse = {
          role: "incoming",
          content: data.choices[0].message.content,
        };
        setGeneratedText(openAIResponse.content);
        setResponseReceived(true);

        // Pass the response back to the parent component
        onNewResponse(openAIResponse.content);  // Call the onNewResponse callback
      })
      .catch((error) => {
        console.error("Error fetching response from OpenAI API:", error);
        setGeneratedText('An error occurred. Please try again later.');
        setResponseReceived(true);
      });
  }

  return (
    <div className='in-Wrapper'>
      <div className="inputUser">
        <input type="text" ref={useIn} placeholder="what should I do?" className="userChange" />
        <button className='but' onClick={handleGenerateSummary}>give command</button>
      </div>
      {responseReceived && (
        <div className='display-area'>{generatedText}</div>
      )}
    </div>
  );
};

export default GiveResponse;
