import icon from 'url:../../img/arrow-32.png';

class FavoriteWords {
  _data;
  _parentElement = document.querySelector('.added-words');
  _favoritesElement = document.querySelector('.added-words');
  _favoriteBtn = document.querySelector('.favorites');

  addHandlerActivateSaved(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const wordBtn = e.target.closest('.word-div--mini');
      if (!wordBtn) return;
      const { id } = wordBtn.dataset;
      handler(id);
    });
  }

  addHandlerSavedWords(handler) {
    const favElem = this._favoritesElement;
    this._favoriteBtn.addEventListener('click', function (e) {
      handler();
      favElem.classList.toggle('hidden');
    });
  }

  render(data, render = true) {
    this._data = data;
    const markup = this._data
      .map((word, i) => {
        return this._generateMarkup(word, i);
      })
      .join('');
    // if (!(data.length <= 4)) return;
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
    this._parentElement
      .querySelectorAll('.word-div--element')
      .forEach(el => el.classList.remove('word-div--hidden'));
  }

  _generateMarkup(word, i) {
    return `
    <div class="word-div--mini" data-id="${word.ID}">
    <div class="word-div--content">
      <div class="word-div--head">
        <div class="word-div--word">${word.word}</div>
        <div class="word-div--speech">${word.phonetic}</div>
        <div class="word-div--arrow">
          <span
            ><img class="arrow" src="${icon}"
          /></span>
        </div>
    </div>
  </div>
  </div>`;
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
}

export default new FavoriteWords();
