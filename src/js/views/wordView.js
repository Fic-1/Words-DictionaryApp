import icon from 'url:../img/arrow-32.png';

class RenderWord {
  _data;
  _parentElement = document.querySelector('.word-div');
  _clearElement = document.querySelector('.cards');
  _errorMessage = 'Something went wrong 😥';
  _imgElement = this._parentElement.closest('.word-div--arrow-img');

  render(data, render = true) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
            <p>${message}</p>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
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
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
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
