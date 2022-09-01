const wordRepo = require('./word.db.repository');

const getAll = async conditions => wordRepo.getAll(conditions);

const get = async wordId => {
  const word = await wordRepo.get(wordId);

  return word;
};

const create = async (cloudAudios, wordData) => {
  const word = await wordRepo.create(wordData);

  return word;
};

module.exports = { getAll, get, create };
