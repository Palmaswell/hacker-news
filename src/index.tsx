import React from 'react';
import ReactDOM from 'react-dom';

import { StoryProvider } from './context';
import App from './App';
// import * as serviceWorker from './sw';

ReactDOM.render(
  <React.StrictMode>
    <StoryProvider>
      <App />
    </StoryProvider>
  </React.StrictMode>,
  document.getElementById('app'),
);

// serviceWorker.register();
