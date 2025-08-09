import React, { useState, useRef } from 'react';
import '../componentStyling/GiveResponse.css';

const GiveResponse = ({ fileContent, onNewResponse }) => {  // Added onNewResponse prop
  const [generatedText, setGeneratedText] = useState('');
  const [responseReceived, setResponseReceived] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const useIn = useRef(null);
  const apikey = process.env.REACT_APP_OPENAI_API_KEY;

  const handleGenerateSummary = async () => {
    if (!useIn.current.value.trim()) return;
    
    const newUserRequest = { role: "outgoing", content: useIn.current.value.trim() };
    setGeneratedText("");
    setResponseReceived(false);
    setIsLoading(true);

    await processMessageToOpenAI(newUserRequest);
    useIn.current.value = '';
  };

  async function processMessageToOpenAI(message) {
    const promptMessage = {
      role: "system",
      content: `You are CodeAssist.AI, an expert code analysis assistant. Analyze the provided file content and respond to the user's request. Provide detailed, helpful feedback about code quality, potential issues, improvements, and best practices. File content: ${JSON.stringify(fileContent)}`,
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        promptMessage,
        { role: "user", content: message.content },
      ],
      max_tokens: 1500,
      temperature: 0.7,
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
        setIsLoading(false);

        // Pass the response back to the parent component
        onNewResponse(openAIResponse.content);  // Call the onNewResponse callback
      })
      .catch((error) => {
        console.error("Error fetching response from OpenAI API:", error);
        setGeneratedText('❌ An error occurred while processing your request. Please check your API key and try again.');
        setResponseReceived(true);
        setIsLoading(false);
      });
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerateSummary();
    }
  };

  return (
    <div className='in-Wrapper'>
      <div className="inputUser">
        <textarea 
          ref={useIn} 
          placeholder="Ask me anything about your code... (e.g., 'Find bugs', 'Suggest improvements', 'Explain this function')"
          className="userChange"
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          rows={1}
          style={{ resize: 'vertical', minHeight: '44px' }}
        />
        <button 
          className={`but ${isLoading ? 'loading' : ''}`} 
          onClick={handleGenerateSummary}
          disabled={isLoading}
        >
          {isLoading ? 'Analyzing...' : '🚀 Analyze Code'}
        </button>
      </div>
      {responseReceived && (
        <div className='response-display'>
          <h3>AI Analysis</h3>
          <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
            {generatedText}
          </div>
        </div>
      )}
    </div>
  );
};

export default GiveResponse;
