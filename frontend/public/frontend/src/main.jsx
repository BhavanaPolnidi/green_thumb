import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import StoreContextProvider from './Context/StoreContext';

// Import the image
import supportIcon from './assets/support.png'; // Adjust path as necessary

const Root = () => {
  const [showIframe, setShowIframe] = useState(false);

  const toggleIframe = () => {
    setShowIframe(!showIframe);
  };

  return (
    <BrowserRouter>
      <StoreContextProvider>
        <App />
        <div>
          {showIframe && (
            <div className="iframe-container">
              <iframe src="https://chatrace.com/webchat/?p=1702521&ref=1722858779942" className="iframe" title="Message Page"></iframe>
            </div>
          )}
          <button className="message-icon" onClick={toggleIframe}>
            <img src={supportIcon} alt="Message Icon" className="message-image" />
          </button>
        </div>
      </StoreContextProvider>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
