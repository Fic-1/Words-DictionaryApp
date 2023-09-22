import icon from 'url:../../img/arrow-32.png';

class RenderWord {
  _data;
  _parentElement = document.querySelector('.word-div');
  _clearElement = document.querySelector('.cards');
  _errorMessage = 'Something went wrong 😥';
  _imgElement = this._parentElement.closest('.word-div--arrow-img');

  render(data, render = true) {
    this._data = data;
    const markup = this._data
      .reverse()
      .map((word, i) => {
        return this._generateMarkupForWords(word, i);
      })
      .join('');
    console.log(markup);
    if (!(data.length <= 4)) return;
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
            <p>${message}</p>
          </div>`;
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner(data) {
    if (!(data.length < 4)) return;
    const markup = `<section class="dots-container">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </section>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
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
    const newMarkup = this._generateMarkupForWords();

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

  _generateMarkupForWords(word, i) {
    // arrowImg.src = './src/img/arrow-32.png';
    return `
      <div class="word-div${i + 1}">
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
              <span><img src='${icon}'/></span>
            </div>
          </div>
          <div class="word-div--footer">
            <div class="word-div--label">Synonyms:</div>
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
        `;
  }

  _generateMarkup(word, i) {
    const arrowImg = document.querySelector('.word-div--arrow-img');
    console.log(this._imgElement);
    // arrowImg.src = './src/img/arrow-32.png';
    return `
        <div class="word-div--content">
          <div class="word-div--head">
            <div class="word-div--word">${this._data[0].word}</div>
            <div class="word-div--speech">${
              this._data[0].phonetic ? this._data[0].phonetic : ''
            }</div>
          </div>
          <div class="word-div--body">
            <div class="word-div--definition">
            ${this._data[0].definitions[0].definitions[0].definition}
            </div>
            <div class="word-div--arrow">
              <span><img src='${icon}'/></span>
            </div>
          </div>
          <div class="word-div--footer">
            <div class="word-div--label">Synonims:</div>
            <div class="word-div--synonims">
            ${'none'}
            </div>
          </div>
        `;
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  addHandlerShowResult() {}
}

export default new RenderWord();
