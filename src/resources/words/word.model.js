const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { addMethods } = require('../../utils/toResponse');

const WordsSchema = new Schema(
  {
    group: {
      type: Number,
      required: true,
      unique: true,
      min: 0
    },
    page: { type: Number, required: true, min: 0 },
    word: { type: String, required: true, max: 150, min: 1, unique: true },
    image: { type: String, required: true, max: 150 },
    audio: { type: String, required: true, max: 150 },
    audioMeaning: { type: String, required: true, max: 150 },
    audioExample: { type: String, required: true, max: 150 },
    textMeaning: { type: String, required: true, max: 300, min: 1 },
    textExample: { type: String, required: true, max: 300, min: 1 },
    transcription: { type: String, required: true, max: 150, min: 1 },
    wordTranslate: { type: String, required: true, max: 150, min: 1 },
    textMeaningTranslate: { type: String, required: true, max: 300, min: 1 },
    textExampleTranslate: { type: String, required: true, max: 300, min: 1 }
  },
  { collection: 'words' }
);

addMethods(WordsSchema);

module.exports = mongoose.model('Words', WordsSchema);
