import React, { useState } from 'react';
import axios from 'axios';

const GiveResponse = ({ fileContent }) => {
  const [generatedText, setGeneratedText] = useState('');
  const stringContent = JSON.stringify(fileContent); // Stringify the fileContent

  const generateSummary = async () => {
    const prompt = `give quick summery of the project: ${stringContent}`; // Use the prompt with the stringified content
    const maxTokens = 50;
    const apiKey = "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";

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

      setGeneratedText(response.data.choices[0].text);
    } catch (error) {
      console.error('Error generating text:', error);
    }
  };

  return (
    <div>
      <button onClick={generateSummary}>Generate Summary</button>
      <div>{generatedText}</div>
    </div>
  );
};

export default GiveResponse;
