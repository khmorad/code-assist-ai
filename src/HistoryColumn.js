import React from "react";
import "./HistoryColumn.css";

function HistoryColumn({ historyItems, onAnalyzeNewFile, onSelectHistoryItem }) {
  return (
    <div className="history-column">
      <h3>History</h3>
      <ul>
        {historyItems.map((item, index) => (
          <li key={index} onClick={() => onSelectHistoryItem(item)}>
            {item.name}
          </li>
        ))}
      </ul>
      <button className="analyze-button" onClick={onAnalyzeNewFile}>
        Analyze New File
      </button>
    </div>
  );
}

export default HistoryColumn;
