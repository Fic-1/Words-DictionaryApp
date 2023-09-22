import icon from 'url:../../img/arrow-32.png';

class SearchWord {
  _data;
  _formElement = document.querySelector('.form-query');
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
  shakeDiv() {
    this._formElement.classList.add('horizontal-shake');
    this.clearInput();
    setTimeout(() => {
      this._formElement.classList.remove('horizontal-shake');
    }, 500);
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
