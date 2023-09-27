import icon from 'url:../../img/arrow-32.png';

class FavoriteWords {
  _data;
  _parentElement = document.querySelector('.added-words');

  addHandlerOpenFavorite(handler) {
    console.log();
    this._parentElement.addEventListener('click', function (e) {
      const wordBtn = e.target.closest('.word-div--mini');
      if (!wordBtn) return;
      const { id } = wordBtn.dataset;
      console.log(id);
      handler(id);
    });
  }
}

export default new FavoriteWords();
