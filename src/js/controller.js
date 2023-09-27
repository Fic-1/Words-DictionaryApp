import * as model from './model';
import wordView from './views/wordView';
import searchView from './views/searchView';
import cardView from './views/activeWordView';
import activeWordView from './views/activeWordView';
import savedWordsView from './views/savedWordsView';

const btnSearch = document.querySelector('.search--button');
const searchBar = document.querySelector('.search--bar');
const wordDiv = document.querySelector('.word-div');

// const getWord = async function () {
//   model.createWordObject(searchBar.value)
// };

// VIEW
btnSearch.addEventListener('click', function (e) {
  e.preventDefault();
});
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    //3.) Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // 1.) Loading recipe
    await model.loadRecipe(id);
    // 2.) Rendereing the recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
    console.error(error);
  }
};

const renderWords = async function (query) {
  try {
    await model.getWord(query);
    model.state.words.filter(word => word !== undefined);
    wordView.renderSpinner(model.state.words);
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
  wordView.render(model.state.words, model.state.rendered);
  const [activeWord] = model.state.words.filter(word => {
    return word.ID === +window.location.hash.slice(1);
  });
  activeWordView.render(activeWord);
  model.state.activeWord = activeWord;
};

const controlActiveSave = function (id) {
  window.history.replaceState(null, '', `#${id}`);
  const [savedWordLink] = model.state.savedWords.filter(
    word => word.ID === +id
  );
  activeWordView.render(savedWordLink);

  // activeWordView.render(model.state.savedWords.filter(word => word.ID === id));
};

const controlSaveWord = function () {
  if (!model.state.activeWord.saved) {
    model.saveWord(model.state.activeWord);
  } else {
    model.deleteWord(model.state.activeWord.id);
  }
  activeWordView.render(model.state.activeWord);
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
