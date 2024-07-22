// frontend/src/components/SpeechComponent.js
import React, { useState } from 'react';
import axios from 'axios';

const SpeechComponent = () => {
  const [audioContent, setAudioContent] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [speechText, setSpeechText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

  const handleAudioUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setAudioContent(reader.result.split(',')[1]);
    };
    reader.readAsDataURL(file);
  };

  const handleSpeechToText = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/speech/recognize', { audioContent });
      setTranscription(response.data.transcription);
    } catch (error) {
      console.error('Error recognizing speech:', error);
    }
  };

  const handleTextToSpeech = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/speech/synthesize', { text: speechText, languageCode: 'en-US', ssmlGender: 'NEUTRAL' });
      setAudioUrl(`data:audio/mp3;base64,${response.data.audioContent}`);
    } catch (error) {
      console.error('Error synthesizing text to speech:', error);
    }
  };

  return (
    <div>
      <input type="file" accept="audio/*" onChange={handleAudioUpload} />
      <button onClick={handleSpeechToText}>Convert Speech to Text</button>
      <div>
        <h3>Transcription: {transcription}</h3>
      </div>
      <textarea
        value={speechText}
        onChange={(e) => setSpeechText(e.target.value)}
        placeholder="Enter text for speech synthesis"
      ></textarea>
      <button onClick={handleTextToSpeech}>Convert Text to Speech</button>
      {audioUrl && (
        <audio controls>
          <source src={audioUrl} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default SpeechComponent;
