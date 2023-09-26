import * as model from './model';
import wordView from './views/wordView';
import searchView from './views/searchView';
import cardView from './views/activeWordView';
import activeWordView from './views/activeWordView';

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

const findWord = function (data, id) {
  const word = data.filter(word => word.ID === id);
  console.log(word);
};

const renderWords = async function (query) {
  try {
    await model.getWord(query);
    console.log(model.state);
    wordView.render(model.state.words, model.state.rendered);
    model.state.rendered = false;
  } catch (error) {
    wordView.renderError('🤨 Unknown word');
    searchView.shakeDiv();
    throw new Error(`🤨 Unknown word (${error})`);
  }
};

const controlResult = function () {
  wordView.renderSpinner(model.state.words);
  const query = searchView.getQuery();
  if (!query) return;
  model.state.search.query = query;
  renderWords(query);
};

const controlActive = function () {
  const [activeWord] = model.state.words.filter(word => {
    return word.ID === +window.location.hash.slice(1);
  });
  console.log(activeWord);
  activeWordView.render(activeWord);
};

const init = function () {
  searchView.addHandlerShowResult(controlResult);
  activeWordView.addHandlerRender(controlActive);
};
init();
