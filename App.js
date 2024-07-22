// frontend/src/App.js
import React from 'react';
import TranslateComponent from './components/TranslateComponent';
import SpeechComponent from './components/SpeechComponent';
import './App.css';


function App() {
  return (
    <div className="App">
      <h1>Language Translation App</h1>
      <TranslateComponent />
      <SpeechComponent />
    </div>
  );
}

export default App;
