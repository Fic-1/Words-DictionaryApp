export const state = {
  words: [],
  search: {
    query: '',
    results: [],
    page: 1,
  },
  savedWords: [],
};

export const createWordObject = async function (wordData) {
  try {
    const data = wordData;
    return {
      word: data.word,
      phonetic: data.phonetic,
      definitions: data.meanings.map(meaning => {
        return {
          partOfSpeech: meaning.partOfSpeech,
          definitions: meaning.definitions,
        };
      }),
      currentDefinition: 1,
    };
  } catch (error) {
    console.error(error);
  }
};

export const getWord = async function (word) {
  try {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const [data] = await res.json();
    if (!data.word) throw new Error('Unknown word');
    state.words.push(await createWordObject(data));
  } catch (error) {
    console.error(error);
  }
};
