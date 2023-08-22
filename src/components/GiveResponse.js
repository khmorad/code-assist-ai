import React, { useState, useEffect } from "react";
import axios from "axios";

const GiveResponse = ({ prompt }) => {
  const [generatedText, setGeneratedText] = useState("");

  useEffect(() => {
    generateText();
  }, [prompt]);

  const generateText = async () => {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY
    const apiUrl = "https://api.openai.com/v1/engines/davinci-codex/completions";

    try {
      const response = await axios.post(
        apiUrl,
        {
          prompt: prompt,
          max_tokens: 300, // Adjust this as needed
          temperature: 0.4, // Adjust this value (0.2 for more deterministic, 0.8 for more random)

        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      setGeneratedText(response.data.choices[0].text);
    } catch (error) {
      console.error("Error generating text:", error);
    }
  };

  return (
    <div className="generated-text">
      <h2>Generated Text:</h2>
      <p>{generatedText}</p>
    </div>
  );
};

export default GiveResponse;
