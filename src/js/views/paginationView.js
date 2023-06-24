import View from "./View";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");
  // _curPage;
  // _numPages;

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");

      if (!btn) return;

      const gotoPage = +btn.dataset.goto;
      handler(gotoPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );

    // page 1, there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
          <button data-goto='${
            curPage + 1
          }' class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
      `;
    }

    // last page
    if (curPage === numPages && numPages > 1) {
      return `
      <button data-goto='${
        curPage - 1
      }' class="btn--inline pagination__btn--prev">
      <i class="fa-solid fa-arrow-left"></i>
            <span>Page ${curPage - 1}</span>
      `;
    }

    // other page
    if (curPage < numPages) {
      return `
          <button data-goto='${
            curPage - 1
          }' class="btn--inline pagination__btn--prev">
            <i class="fa-solid fa-arrow-left"></i>
            <span>Page ${curPage - 1}</span>
          </button>
          <button data-goto='${
            curPage + 1
          }' class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
      `;
    }
    // page 1, there are NO other pages
    return "";
  }
}

export default new PaginationView();
