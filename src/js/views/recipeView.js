import View from "./View.js";
import { Fraction } from "fractional";

class RecipeView extends View {
  _parentElement = document.querySelector(".recipe");
  _errorMessage = "We couldn't find the recipe. Please try another one!";

  _generateMarkup() {
    return `
            <figure class="recipe__fig">
              <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
              <h1 class="recipe__title">
                <span>${this._data.title}</span>
              </h1>
            </figure>

            <div class="recipe__details">
              <div class="recipe__info">
              <i class="fa-solid fa-clock"></i>
                <span class="recipe__info-data recipe__info-data--minutes">${
                  this._data.cookingTime
                }</span>
                <span class="recipe__info-text">minutes</span>
              </div>
              <div class="recipe__info">
              <i class="fa-solid fa-user-group"></i>
                <span class="recipe__info-data recipe__info-data--people">${
                  this._data.servings
                }</span>
                <span class="recipe__info-text">servings</span>

                <div class="recipe__info-buttons">
                  <button data-update-to='${
                    this._data.servings - 1
                  }' class="btn--tiny btn--update-servings">
                  <i class="fa-solid fa-circle-minus"></i>
                  </button>
                  <button data-update-to='${
                    this._data.servings + 1
                  }' class="btn--tiny btn--update-servings">
                  <i class="fa-solid fa-circle-plus"></i>
                  </button>
                </div>
              </div>

              <div class="recipe__user-generated ${
                this._data.key ? "" : "hidden"
              }">
               <i class="fa-solid fa-user"></i>
              </div>
              <button class="btn--round btn-bookmark">
               <i class="fa${
                 this._data.bookmarked ? "-solid" : "-regular"
               } fa-bookmark">.</i>
              </button>
            </div>

            <div class="recipe__ingredients">
              <h2 class="heading--2">Recipe ingredients</h2>
              <ul class="recipe__ingredient-list">
              ${this._data.ingredients
                .map(this._generateMarkupIngredient)
                .join("")}
              </ul>
            </div>

            <div class="recipe__directions">
              <h2 class="heading--2">How to cook it</h2>
              <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__publisher">${
                  this._data.publisher
                }</span>. Please check out
                directions at their website.
              </p>
              <a
                class="btn--small recipe__btn"
                href="${this._data.sourceUrl}"
                target="_blank"
              >
                <span>Directions</span>
                <svg class="search__icon">
                  <use href="src/img/icons.svg#icon-arrow-right"></use>
                </svg>
              </a>
            </div>
    `;
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn-bookmark");
      if (!btn) return;
      handler();
    });
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--update-servings");
      if (!btn) return;

      const { updateTo } = btn.dataset;
      if (+updateTo > 0) handler(+updateTo);
    });
  }

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  _generateMarkupIngredient(ing) {
    return `
  <li class="recipe__ingredient">
    <i class="fa-solid fa-check"></i>
    <div class="recipe__quantity">${
      ing.quantity ? new Fraction(ing.quantity).toString() : ""
    }
    </div>
    <div class="recipe__description">
      <span class="recipe__unit">${ing.unit}</span>
        ${ing.description}
    </div>
  </li>
  `;
  }
}

export default new RecipeView();
