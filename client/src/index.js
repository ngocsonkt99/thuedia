import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { DataProvider } from './GlobalContext';


ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>

  </React.StrictMode>,
  document.getElementById('root')
);


