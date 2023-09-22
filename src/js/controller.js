import * as model from './model';
import wordView from './views/wordView';
import searchView from './views/searchView';
import cardView from './views/cardView';

const btnSearch = document.querySelector('.search--button');
const searchBar = document.querySelector('.search--bar');
const wordDiv1 = document.querySelector('.word-div');

// const getWord = async function () {
//   model.createWordObject(searchBar.value)
// };

// VIEW
btnSearch.addEventListener('click', function (e) {
  e.preventDefault();
});
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
const controlWordDiv = function () {};

const controlResult = function () {
  wordView.renderSpinner(model.state.words);
  const query = searchView.getQuery();
  if (!query) return;
  renderWords(query);
  wordDiv1.classList.remove('word-div--hidden');
  console.log(cardView._wordDiv1Element);
};
const init = function () {
  searchView.addHandlerShowResult(controlResult);
  cardView.addHandlerWordDiv1(controlWordDiv);
  console.log(cardView._wordDiv1Element);
};
init();
