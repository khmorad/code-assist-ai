import React from 'react';
import '../componentStyling/Sidebar.css';
import { TypeAnimation } from 'react-type-animation';

const Sidebar = ({ responses, onSelectResponse }) => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Response History</h2>
      <ul className="response-list">
        {responses.map((response, index) => (
          <li key={index} className="response-item" onClick={() => onSelectResponse(response)}>
            <TypeAnimation
              sequence={[
                response, // The text you want to display
                1000,    // Wait for 1 second before moving to the next step
              ]}
              speed={90}
              wrapper="span" // Use a span to wrap the text
              cursor={true}  // Show the typing cursor
              repeat={0}
              style={{ display: 'inline-block' }} // Inline-block styling to prevent block-level elements inside the list item
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
