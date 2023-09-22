import icon from 'url:../img/arrow-32.png';

class SearchWord {
  _data;
  _parentElement = document.querySelector('.search');
  _wordDivElement = document.querySelector('.word-div');

  getQuery() {
    const query = this._parentElement.querySelector('.search--bar').value;
    this.clearInput();
    return query;
  }
  clearInput() {
    this._parentElement.querySelector('.search--bar').value = '';
  }

  addHandlerShowResult(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.search--button');
      if (!btn) return;
      handler();
    });
  }
}

export default new SearchWord();
