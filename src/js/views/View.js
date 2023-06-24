export default class View {
  _data;
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));

    newElements.forEach((newEle, i) => {
      const curEle = curElements[i];

      // Updates changed text
      if (
        !newEle.isEqualNode(curEle) &&
        newEle.firstChild.nodeValue.trim() !== ""
      ) {
        curEle.textContent = newEle.textContent;
      }

      // Updates changed Attributes
      if (!newEle.isEqualNode(curEle)) {
        Array.from(newEle.attributes).forEach((atr) =>
          curEle.setAttribute(atr.name, atr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markup = `
          <div class="spinner">
          <i class="fa-solid fa-spinner fa-2xl"></i>
          </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
          <div class="error">
            <div>
            <i class="fa-solid fa-triangle-exclamation fa-2xl"></i>
            </div>
            <p>${message}</p>
          </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(message = this._message) {
    const markup = `
          <div class="message">
            <div>
            <i class="fa-solid fa-check fa-2xl"></i>
            </div>
            <p>${message}</p>
          </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
