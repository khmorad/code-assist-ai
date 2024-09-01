import React from 'react';
import '../componentStyling/Sidebar.css';

const Sidebar = ({ responses, onSelectResponse }) => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Response History</h2>
      <ul className="response-list">
        {responses.map((response, index) => (
          <li key={index} className="response-item" onClick={() => onSelectResponse(response)}>
            {response}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
