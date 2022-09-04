const Word = require('./word.model');
const { NOT_FOUND_ERROR, ENTITY_EXISTS } = require('../../errors/appErrors');
const ENTITY_NAME = 'word';
const MONGO_ENTITY_EXISTS_ERROR_CODE = 11000;

const getAll = async conditions => {
  const { group, page } = conditions;

  return Word.find({ group, page });
};

const get = async id => {
  const word = await Word.findOne({ _id: id });
  if (!word) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  return word;
};

const create = async word => {
  try {
    const result = await Word.create({ ...word, group: 6, page: 0 });

    const isExistWord = await Word.findOne({ word: word.word });

    if (!!isExistWord) {
      throw new ENTITY_EXISTS(`Entity with this ${word.word} exists`);
    }

    return result;
  } catch (err) {
    if (err.code === MONGO_ENTITY_EXISTS_ERROR_CODE) {
      throw new ENTITY_EXISTS(`Entity with this ${ENTITY_NAME} exists`);
    } else {
      throw err;
    }
  }
};

module.exports = { getAll, get, create };
