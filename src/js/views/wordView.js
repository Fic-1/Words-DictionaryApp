import icon from 'url:../../img/arrow-32.png';

class RenderWord {
  _data;
  _parentElement = document.querySelector('.word-div');
  _container = document.querySelector('.container');
  _errorMessage = 'Something went wrong 😥';
  _imgElement = this._parentElement.closest('.word-div--arrow-img');

  render(data, render = true) {
    this._data = data;
    const markup = this._data
      .reverse()
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

  renderError(message = this._errorMessage) {
    const removeModal = e => {
      if (e.key !== 'Escape') return;
      container.classList.remove('container--blur');
      document.querySelector('.error').remove();
      removeHandler();
    };
    const removeHandler = function () {
      window.removeEventListener('keydown', removeModal);
    };

    const container = this._container;
    const markup = `<div class="error">
            <p>${message}</p>
            <span class="close--btn">X</span>
          </div>`;
    this._container.insertAdjacentHTML('beforebegin', markup);
    this._container.classList.add('container--blur');
    document
      .querySelector('.close--btn')
      .addEventListener('click', function (e) {
        container.classList.remove('container--blur');
        document.querySelector('.error').remove();
      });
    window.addEventListener('keydown', removeModal);
  }

  renderSpinner(data) {
    // if (!(data.length < 4)) return;
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

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currentElements = Array.from(
      this._parentElement.querySelectorAll('*')
    );

    newElements.forEach((newEl, i) => {
      const curEl = currentElements[i];

      //Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('💣', newEl.firstChild?.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }
      //Update changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _generateMarkup(word, i) {
    // arrowImg.src = './src/img/arrow-32.png';
    return `
      <a href="#${word.ID}"><div class="word-div--element zoom">
      <div class="word-div--content">
        <div class="word-div--head">
          <div class="word-div--word">${word.word}</div>
          <div class="word-div--speech">${
            word.phonetic ? word.phonetic : ''
          }</div>
        </div>
        <div class="word-div--body">
          <div class="word-div--definition">
          ${word.definitions[0].definitions[0].definition}
          </div>
          <div class="word-div--arrow">
            <span
              ><img class="arrow" src="${icon}"
            /></span>
          </div>
        </div>
        <div class="word-div--footer">
          <div class="word-div--label">Synonims:</div>
          <div class="word-div--synonims">
          ${
            !this.joinArrays(word.definitions)
              ? 'Sorry, no synonyms'
              : this.joinArrays(word.definitions)
          }
          </div>
        </div>
      </div>
    </div>
  </a>`;
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  addHandlerActivateResult(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const wordCard = e.target.closest('.word-div--element');
      if (!wordCard) return;
      handler();
    });
  }
}

export default new RenderWord();
