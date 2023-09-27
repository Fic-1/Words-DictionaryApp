export const state = {
  words: [],
  search: {
    query: '',
    results: [],
    page: 1,
  },
  activeWord: {},
  savedWords: [],
  rendered: true,
};
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
      saved: false,
    };
  } catch (error) {
    console.error(error);
  }
};

const presistSavedWords = function () {
  localStorage.setItem('savedWords', JSON.stringify(state.savedWords));
};

export const saveWord = function (activeWord) {
  //Add bookmark
  state.savedWords.unshift(activeWord);

  //Mark current recipe as bookmark
  if (activeWord.id === state.activeWord.id) state.activeWord.saved = true;

  presistSavedWords();
};

export const deleteWord = function (id) {
  //delete bookmark
  const index = state.savedWords.findIndex(el => el.id == id);
  state.savedWords.splice(index, 1);
  //Mark current recipe as not bookmark
  if (id === state.activeWord.id) state.activeWord.saved = false;

  presistSavedWords();
};

export const getWord = async function (word) {
  try {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const [data] = await res.json();
    // console.log(data);
    if (!data.word) throw new Error('Unknown word');
    state.words.unshift(await createWordObject(data));
  } catch (error) {
    throw new Error(error);
  }
};

const init = function () {
  const storage = localStorage.getItem('savedWords');
  if (storage) state.savedWords = JSON.parse(storage);
};
init();
