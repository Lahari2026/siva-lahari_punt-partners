// frontend/src/components/TranslateComponent.js
import React, { useState } from 'react';
import axios from 'axios';

const TranslateComponent = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [detectedLanguage, setDetectedLanguage] = useState('');
  const [targetLang, setTargetLang] = useState('es'); // default target language

  const handleTranslate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/translate/text', { text, targetLang });
      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error('Error translating text:', error);
    }
  };

  const handleDetectLanguage = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/translate/detect', { text });
      setDetectedLanguage(response.data.language);
    } catch (error) {
      console.error('Error detecting language:', error);
    }
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to translate"
      ></textarea>
      <button onClick={handleDetectLanguage}>Detect Language</button>
      <button onClick={handleTranslate}>Translate</button>
      <div>
        <h3>Detected Language: {detectedLanguage}</h3>
        <h3>Translated Text: {translatedText}</h3>
      </div>
    </div>
  );
};

export default TranslateComponent;
