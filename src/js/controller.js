import * as model from "./model.js";
import { MODAL_CLOSE_SEC } from "./config.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultView from "./views/resultView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";

const recipeContainer = document.querySelector(".recipe");

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner(recipeContainer);

    // 0)Update results view to mark selected search result
    resultView.update(model.getSearchResultsPage());

    //1) Update bookmarks
    bookmarksView.update(model.state.bookMarks);

    //2) Loading Recipe

    await model.loadRecipe(id);

    //3) Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResult = async function () {
  try {
    resultView.renderSpinner();

    //1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResult(query);

    // 3) Render results
    resultView.render(model.getSearchResultsPage());

    // 4) Render Pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (gotoPage) {
  //1) Render NEW result
  resultView.render(model.getSearchResultsPage(gotoPage));

  // 2) Render NEW PAGINATION
  paginationView.render(model.state.search);
};

const controlServings = function (newServing) {
  // 1)Update Serving
  model.updateServings(newServing);

  // 2) Update recipe
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //1) adding and remove to bookmark
  if (!model.state.recipe.bookmarked) model.addBookMark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);

  //2) update recipe view
  recipeView.update(model.state.recipe);

  //3) Render bookmarkss
  bookmarksView.render(model.state.bookMarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookMarks);
};

const controlAddNewRecipe = async function (newRecipe) {
  try {
    // Rende spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    // Render Bookmark view
    bookmarksView.render(model.state.bookMarks);

    // Change ID in url
    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    //
    bookmarksView.update(model.state.bookMarks);

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error("🎈", err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddNewRecipe);
};

init();
