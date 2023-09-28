import addIcon from 'url:../../img/icons8-add-50.png';
import removeIcon from 'url:../../img/icons8-remove-50.png';

class ActiveWordView {
  _data;
  _parentElement = document.querySelector('.word-active');
  _wordDivActive = document.querySelector('.word-div');

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  render(data, active) {
    this._data = data;
    const markup = this._generateMarkup(active);
    if (!markup) return;
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  renderSpinner() {
    const markup = `<section class="dots-container">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </section>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  joinArrays(array) {
    const joinedArray = array
      .flatMap(def => (def.synonyms ? def.synonyms : 'null'))
      .filter(syn => syn)
      .join(', ');
    return joinedArray;
  }

  addHandlerSaveWord(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.save-word');
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup(active) {
    // const id = window.location.hash.slice(1);
    // if (word.ID === +id)
    //   ('word-div--element-active');
    // }
    return `
    <div class="word-active--head">
            <div class="word-active--title">
            <div class="word-active--word">${this._data.word}</div>
            <div class="word-active--phonetic">${
              this._data.phonetic ? this._data.phonetic : ''
            }</div>
          </div>
          <div class="word-active--sound"><audio controls preload="auto">
            <source src=${this._data.audio} type="audio/mpeg">
            Your browser does not support the audio element.
            </audio>
            <img class="save-word" src="${
              this._data.saved ? removeIcon : addIcon
            }">
          </div>
          </div>
          <div class="word-active--body">
          ${this._data.definitions.map(def => {
            return `
          <div class="word-active--part">
          <u>${def.partOfSpeech}</u>
          <div class="word-active--description">
          ${def.definitions
            .map((des, i) => `${i + 1}) ${des.definition}`)
            .join('<br>')}      
          `;
          })}  
            <div class="word-active--part word-active--synonyms"><u>Synonyms</u>:
              <div class="word-active--description">${
                !this.joinArrays(this._data.definitions)
                  ? 'Sorry, no synonyms'
                  : this.joinArrays(this._data.definitions)
              }</div>
            </div>
            
          </div>
          <div class="word-active--footer"> <div class="word-active--source">Source:
            <a href="${this._data.sourceUrl}">${this._data.sourceUrl}</a>
          </div>
            <div class="word-active--source">Licence:
              <a href="${this._data.license.url}">${
      this._data.license.name
    }</a></div>
          </div>
    `;
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
}

export default new ActiveWordView();
