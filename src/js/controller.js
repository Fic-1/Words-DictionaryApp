import * as model from './model';
import wordView from './views/wordView';
import searchView from './views/searchView';

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
    wordView.render(model.state.words);
  } catch (error) {
    wordView.renderError('🤨 Unknown word');
    throw new Error(`🤨 Unknown word (${error})`);
  }
};

const controlResult = function () {
  wordView.renderSpinner();
  const query = searchView.getQuery();
  if (!query) return;
  renderWords(query);
  wordDiv1.classList.toggle('word-div--hidden');
  console.log(query);
};
const init = function () {
  searchView.addHandlerShowResult(controlResult);
};
init();
