const wordRepo = require('./word.db.repository');

const getAll = async conditions => wordRepo.getAll(conditions);

const get = async wordId => {
  return await wordRepo.get(wordId);
};

const create = async (cloudMedia, wordData) => {
  return await wordRepo.create({
    ...wordData,
    audio: cloudMedia[0].secure_url,
    audioMeaning: cloudMedia[1].secure_url,
    audioExample: cloudMedia[2].secure_url,
    image: cloudMedia[3].secure_url
  });
};

module.exports = { getAll, get, create };
