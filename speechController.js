const speech = require('@google-cloud/speech');
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');

const client = new speech.SpeechClient();
const ttsClient = new textToSpeech.TextToSpeechClient();

const speechToText = async (req, res) => {
  const { audioContent } = req.body;
  const audio = {
    content: audioContent,
  };

  const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US',
  };

  const request = {
    audio: audio,
    config: config,
  };

  try {
    const [response] = await client.recognize(request);
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    res.json({ transcription });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const convertTextToSpeech = async (req, res) => {
  const { text, languageCode, ssmlGender } = req.body;

  const request = {
    input: { text },
    voice: { languageCode, ssmlGender },
    audioConfig: { audioEncoding: 'MP3' },
  };

  try {
    const [response] = await ttsClient.synthesizeSpeech(request);
    res.json({ audioContent: response.audioContent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    speechToText,
    convertTextToSpeech // Updated name
};
