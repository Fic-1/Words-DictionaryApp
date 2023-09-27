export const state = {
  words: [],
  search: {
    query: '',
    results: [],
    page: 1,
  },
  savedWords: [],
  rendered: true,
};
console.log(state);
function uniqueID() {
  return Math.floor(Math.random() * Date.now());
}
export const createWordObject = async function (wordData) {
  try {
    const data = wordData;
    return {
      ID: uniqueID(),
      word: data.word,
      phonetic: data.phonetic,
      audio: data.phonetics[0]?.audio,
      sourceUrl: data.sourceUrls[0],
      license: { name: data.license.name, url: data.license.url },
      definitions: data.meanings.map(meaning => {
        return {
          partOfSpeech: meaning.partOfSpeech,
          definitions: meaning.definitions,
          synonyms: meaning.synonyms,
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
    console.log(data);
    if (!data.word) throw new Error('Unknown word');
    state.words.unshift(await createWordObject(data));
  } catch (error) {
    // console.error(`This word does not exist (${error})`);
    throw new Error(error);
  }
};
