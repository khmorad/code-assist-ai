import React, { useState, useRef } from 'react';
import axios from 'axios';
import '../componentStyling/GiveResponse.css';

const GiveResponse = ({ fileContent }) => {
  const [generatedText, setGeneratedText] = useState('');
  const useIn = useRef();
  const stringContent = JSON.stringify(fileContent); // Stringify the fileContent
  
  const generateSummary = async () => {
    const userReq = useIn.current.value;
    const prompt = `${userReq}: ${stringContent}`; // Use the prompt with the stringified content
    const maxTokens = 1000;
   
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/text-davinci-003/completions',
        {
          prompt,
          max_tokens: maxTokens
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`
          }
        }
      );
      console.log('fileContent:', fileContent);
      console.log('API Response:', response);
      setGeneratedText(response.data.choices[0].text);
    } catch (error) {
      console.error('Error generating text:', error);
    }
  };

  return (
    <div className='in-Wrapper'>
      <div className="inputUser">
      <input type="text" ref={useIn} placeholder="what should I do?"className="userChange" />

      <button className='but' onClick={generateSummary}>give command</button>
      </div>
      <div>{generatedText}</div>
    </div>
  );
};

export default GiveResponse;
