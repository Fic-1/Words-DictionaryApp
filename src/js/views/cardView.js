import icon from 'url:../../img/arrow-32.png';

class CardView {
  _data;
  _wordDiv1Element = document.querySelector('.word-div1');
  _wordDiv2Element = document.querySelector('.word-div2');
  _wordDiv3Element = document.querySelector('.word-div3');
  _wordDiv4Element = document.querySelector('.word-div4');
  _wordDiv5Element = document.querySelector('.word-div5');

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
  addHandlerWordDiv1(handler) {
    console.log(_wordDiv1Element);
    this._wordDiv1Element.addEventListener('click', function (e) {
      e.preventDefault();
      console.log('here');
      const btn = e.target.closest('.arrow');
      console.log('here');
      if (!btn) return;
      handler();
    });
  }
  addHandlerWordDiv2(handler) {}
  addHandlerWordDiv1(handler) {}
  addHandlerWordDiv1(handler) {}
  addHandlerWordDiv1(handler) {}
}

export default new CardView();
