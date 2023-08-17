import React from "react";
import "./HistoryColumn.css"; // Make sure to import the correct CSS file

function HistoryColumn({ historyItems, onAnalyzeNewFile }) {
    return (
      <div className="history-column">
        <h3>History</h3>
        <ul>
          {historyItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <button className="analyze-button" onClick={onAnalyzeNewFile}>
          Analyze New File
        </button>
      </div>
    );
  }

export default HistoryColumn;