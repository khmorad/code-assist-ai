import React from 'react';
import '../componentStyling/Sidebar.css';
import { TypeAnimation } from 'react-type-animation';

const Sidebar = ({ responses, onSelectResponse, isOpen, onClose }) => {
  const formatTimestamp = (index) => {
    const now = new Date();
    const time = new Date(now.getTime() - (responses.length - index - 1) * 60000);
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const truncateResponse = (response, maxLength = 100) => {
    return response.length > maxLength ? response.substring(0, maxLength) + '...' : response;
  };

  return (
    <>
      {isOpen && window.innerWidth <= 1024 && (
        <div className="sidebar-overlay active" onClick={onClose}></div>
      )}
      <div className={`sidebar ${isOpen && window.innerWidth <= 1024 ? 'open' : ''}`}>
        <h2 className="sidebar-title">Response History</h2>
        {responses.length === 0 ? (
          <div className="sidebar-empty">
            <div className="sidebar-empty-icon">💭</div>
            <div className="sidebar-empty-text">
              No responses yet. Upload some files and ask questions to see your conversation history here.
            </div>
          </div>
        ) : (
          <ul className="response-list">
            {responses.map((response, index) => (
              <li 
                key={index} 
                className="response-item new" 
                onClick={() => {
                  onSelectResponse(response);
                  if (window.innerWidth <= 1024) onClose();
                }}
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onSelectResponse(response);
                    if (window.innerWidth <= 1024) onClose();
                  }
                }}
              >
                <div className="response-preview">
                  {truncateResponse(response)}
                </div>
                <div className="response-meta">
                  <span className="response-index">#{index + 1}</span>
                  <span className="response-timestamp">{formatTimestamp(index)}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Sidebar;
