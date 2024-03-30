import React, { useState, useRef } from 'react';
import { CopyBlock } from "react-code-blocks";
import "../App.tsx"
import '../componentStyling/GiveResponse.css';

const GiveResponse = ({ fileContent }) => {
  const [generatedText, setGeneratedText] = useState('');
  const useIn = useRef();
  const stringContent = JSON.stringify(fileContent); // Stringify the fileContent

  const generateSummary = async () => {
    const userReq = useIn.current.value;
    const prompt = `${userReq}: ${stringContent}`; // Use the prompt with the stringified content
    const maxTokens = 1000;

    // Ensure your API key is stored securely using environment variables
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

    if (!apiKey) {
      console.error('Error: Missing API key. Please set REACT_APP_OPENAI_API_KEY in your environment variables.');
      return; // Prevent API call without a key
    }

    try {
      const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          prompt,
          max_tokens: maxTokens
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log('fileContent:', fileContent);
      console.log('API Response:', data);
      setGeneratedText(data.choices[0].text);
    } catch (error) {
      console.error('Error generating text:', error);
      setGeneratedText('An error occurred. Please try again later.'); // Provide user-friendly feedback
    }
  };

  return (
    <div className='in-Wrapper'>
      <div className="inputUser">
        <input type="text" ref={useIn} placeholder="what should I do?" className="userChange" />
        <button className='but' onClick={generateSummary}>give command</button>
      </div>
      <div className='display-area'>{generatedText}</div>
    </div>
  );
};

export default GiveResponse;
