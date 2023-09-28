import * as model from './model';
import wordView from './views/wordView';
import searchView from './views/searchView';
import activeWordView from './views/activeWordView';
import savedWordsView from './views/savedWordsView';

const renderWords = async function (query) {
  try {
    await model.getWord(query);
    model.state.words.filter(word => word !== undefined);
    wordView.renderSpinner();
    wordView.render(model.state.words, model.state.rendered);
    model.state.rendered = false;
  } catch (error) {
    wordView.renderError('🤨 Unknown word');
    searchView.shakeDiv();
    console.error(`🤨 Unknown word (${error})`);
  }
};

const controlResult = function () {
  const query = searchView.getQuery();
  if (!query) return;
  model.state.search.query = query;
  renderWords(query);
  activeWordView.addHandlerRender(controlActive);
};

const controlActive = function () {
  activeWordView.renderSpinner();
  wordView.render(model.state.words, model.state.rendered);
  const [activeWord] = model.state.words.filter(word => {
    return word.ID === +window.location.hash.slice(1);
  });
  activeWordView.render(activeWord);
  console.log(model.state);
  model.state.activeWord = activeWord;
};

const controlActiveSave = function (id) {
  window.history.replaceState(null, '', `#${id}`);
  const [savedWordLink] = model.state.savedWords.filter(
    word => word.ID === +id
  );
  activeWordView.render(savedWordLink);
  model.state.activeWord = savedWordLink;

  // activeWordView.render(model.state.savedWords.filter(word => word.ID === id));
};

const controlSaveWord = function () {
  if (!model.state.activeWord.saved) {
    model.saveWord(model.state.activeWord);
  } else {
    model.deleteWord(model.state.activeWord.ID);
  }
  activeWordView.render(model.state.activeWord);
  savedWordsView.render(model.state.savedWords);
};
const controlSavedWords = function () {
  savedWordsView.render(model.state.savedWords);
};

const init = function () {
  searchView.addHandlerShowResult(controlResult);
  savedWordsView.addHandlerSavedWords(controlSavedWords);
  savedWordsView.addHandlerActivateSaved(controlActiveSave);
  activeWordView.addHandlerSaveWord(controlSaveWord);
};
init();
