const { Translate } = require('@google-cloud/translate').v2;
const translate = new Translate();

const translateText = async (req, res) => {
  const { text, targetLang } = req.body;
  try {
    const [translation] = await translate.translate(text, targetLang);
    res.json({ translatedText: translation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const detectLanguage = async (req, res) => {
  const { text } = req.body;
  try {
    const [detection] = await translate.detect(text);
    res.json({ language: detection.language });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  translateText,
  detectLanguage
};
