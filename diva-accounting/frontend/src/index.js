import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './i18n';
import './styles.css';
import { setupOfflineQueueListeners } from './offline/queue';

function Root() {
  useEffect(() => {
    const cleanup = setupOfflineQueueListeners();
    return cleanup;
  }, []);

  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);
