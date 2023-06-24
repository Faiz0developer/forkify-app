const e="https://forkify-api.herokuapp.com/api/v2/recipes/",t="61ba306d-1cb7-4d43-8288-cdb4770d3b75",r=async function(e,t){try{let r=t?fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}):fetch(e),n=await Promise.race([r,new Promise(function(e,t){setTimeout(function(){t(Error("Request took too long! Timeout after 10 second"))},1e4)})]),i=await n.json();if(!n.ok)throw Error(`${i.message} (${n.status})`);return i}catch(e){throw e}},n={recipe:{},search:{query:"",results:[],page:1,resultPerPage:10},bookMarks:[]},i=function(e){let{recipe:t}=e.data;return{id:t.id,title:t.title,publisher:t.publisher,sourceUrl:t.source_url,image:t.image_url,ingredients:t.ingredients,cookingTime:t.cooking_time,servings:t.servings,...t.key&&{key:t.key}}},a=async function(a){try{let s=await r(`${e}${a}?key=${t}`);n.recipe=i(s),n.bookMarks.some(e=>e.id===a)?n.recipe.bookmarked=!0:n.recipe.bookmarked=!1,console.log(n.recipe)}catch(e){throw e}},s=async function(i){try{n.search.query=i;let a=await r(`${e}?search=${i}&key=${t}`);n.search.results=a.data.recipes.map(e=>({id:e.id,title:e.title,publisher:e.publisher,image:e.image_url,...e.key&&{key:e.key}})),n.search.page=1}catch(e){throw console.error(`${e}`),e}},o=function(e=n.search.page){n.search.page=e;let t=(e-1)*n.search.resultPerPage,r=e*n.search.resultPerPage;return n.search.results.slice(t,r)},c=function(e){n.recipe.ingredients.forEach(t=>{t.quantity=t.quantity*e/n.recipe.servings}),n.recipe.servings=e},d=function(){localStorage.setItem("bookmarks",JSON.stringify(n.bookMarks))},l=function(e){n.bookMarks.push(e),e.id===n.recipe.id&&(n.recipe.bookmarked=!0),d()},u=function(e){let t=n.bookMarks.findIndex(t=>t.id===e);n.bookMarks.splice(t,1),e===n.recipe.id&&(n.recipe.bookmarked=!1),d()};!function(){let e=localStorage.getItem("bookmarks");e&&(n.bookMarks=JSON.parse(e))}();const p=async function(a){try{let s=Object.entries(a).filter(e=>e[0].startsWith("ingredient")&&""!==e[1]).map(e=>{let t=e[1].replaceAll(" ","").split(",");if(3!==t.length)throw Error("Wrong ingredient format! Please use correct format :)");let[r,n,i]=t;return{quantity:r?+r:null,unit:n,description:i}}),o={title:a.title,source_url:a.sourceUrl,image_url:a.image,publisher:a.publisher,cooking_time:+a.cookingTime,servings:+a.servings,ingredients:s},c=await r(`${e}?key=${t}`,o);n.recipe=i(c),l(n.recipe)}catch(e){throw e}};class h{_data;render(e,t=!0){if(!e||Array.isArray(e)&&0===e.length)return this.renderError();this._data=e;let r=this._generateMarkup();if(!t)return r;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",r)}update(e){this._data=e;let t=this._generateMarkup(),r=document.createRange().createContextualFragment(t),n=Array.from(r.querySelectorAll("*")),i=Array.from(this._parentElement.querySelectorAll("*"));n.forEach((e,t)=>{let r=i[t];e.isEqualNode(r)||""===e.firstChild.nodeValue.trim()||(r.textContent=e.textContent),e.isEqualNode(r)||Array.from(e.attributes).forEach(e=>r.setAttribute(e.name,e.value))})}_clear(){this._parentElement.innerHTML=""}renderSpinner(){let e=`
          <div class="spinner">
          <i class="fa-solid fa-spinner fa-2xl"></i>
          </div>
    `;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",e)}renderError(e=this._errorMessage){let t=`
          <div class="error">
            <div>
            <i class="fa-solid fa-triangle-exclamation fa-2xl"></i>
            </div>
            <p>${e}</p>
          </div>
    `;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",t)}renderMessage(e=this._message){let t=`
          <div class="message">
            <div>
            <i class="fa-solid fa-check fa-2xl"></i>
            </div>
            <p>${e}</p>
          </div>
    `;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",t)}}(Fraction=function(e,t){if(void 0!==e&&t)"number"==typeof e&&"number"==typeof t?(this.numerator=e,this.denominator=t):"string"==typeof e&&"string"==typeof t&&(this.numerator=parseInt(e),this.denominator=parseInt(t));else if(void 0===t){if("number"==typeof(num=e))this.numerator=num,this.denominator=1;else if("string"==typeof num){var r,n,i=num.split(" ");if(i[0]&&(r=i[0]),i[1]&&(n=i[1]),r%1==0&&n&&n.match("/"))return new Fraction(r).add(new Fraction(n));if(!r||n)return;if("string"==typeof r&&r.match("/")){var a=r.split("/");this.numerator=a[0],this.denominator=a[1]}else{if("string"==typeof r&&r.match("."))return new Fraction(parseFloat(r));this.numerator=parseInt(r),this.denominator=1}}}this.normalize()}).prototype.clone=function(){return new Fraction(this.numerator,this.denominator)},Fraction.prototype.toString=function(){if("NaN"===this.denominator)return"NaN";var e=this.numerator/this.denominator>0?Math.floor(this.numerator/this.denominator):Math.ceil(this.numerator/this.denominator),t=this.numerator%this.denominator,r=this.denominator,n=[];return 0!=e&&n.push(e),0!=t&&n.push((0===e?t:Math.abs(t))+"/"+r),n.length>0?n.join(" "):0},Fraction.prototype.rescale=function(e){return this.numerator*=e,this.denominator*=e,this},Fraction.prototype.add=function(e){var t=this.clone();return e=e instanceof Fraction?e.clone():new Fraction(e),td=t.denominator,t.rescale(e.denominator),e.rescale(td),t.numerator+=e.numerator,t.normalize()},Fraction.prototype.subtract=function(e){var t=this.clone();return e=e instanceof Fraction?e.clone():new Fraction(e),td=t.denominator,t.rescale(e.denominator),e.rescale(td),t.numerator-=e.numerator,t.normalize()},Fraction.prototype.multiply=function(e){var t=this.clone();if(e instanceof Fraction)t.numerator*=e.numerator,t.denominator*=e.denominator;else{if("number"!=typeof e)return t.multiply(new Fraction(e));t.numerator*=e}return t.normalize()},Fraction.prototype.divide=function(e){var t=this.clone();if(e instanceof Fraction)t.numerator*=e.denominator,t.denominator*=e.numerator;else{if("number"!=typeof e)return t.divide(new Fraction(e));t.denominator*=e}return t.normalize()},Fraction.prototype.equals=function(e){e instanceof Fraction||(e=new Fraction(e));var t=this.clone().normalize(),e=e.clone().normalize();return t.numerator===e.numerator&&t.denominator===e.denominator},Fraction.prototype.normalize=function(){var e=function(e){return"number"==typeof e&&(e>0&&e%1>0&&e%1<1||e<0&&e%-1<0&&e%-1>-1)},t=function(e,t){if(!t)return Math.round(e);var r=Math.pow(10,t);return Math.round(e*r)/r};return function(){if(e(this.denominator)){var r=t(this.denominator,9),n=Math.pow(10,r.toString().split(".")[1].length);this.denominator=Math.round(this.denominator*n),this.numerator*=n}if(e(this.numerator)){var r=t(this.numerator,9),n=Math.pow(10,r.toString().split(".")[1].length);this.numerator=Math.round(this.numerator*n),this.denominator*=n}var i=Fraction.gcf(this.numerator,this.denominator);return this.numerator/=i,this.denominator/=i,(this.numerator<0&&this.denominator<0||this.numerator>0&&this.denominator<0)&&(this.numerator*=-1,this.denominator*=-1),this}}(),Fraction.gcf=function(e,t){var r=[],n=Fraction.primeFactors(e),i=Fraction.primeFactors(t);return(n.forEach(function(e){var t=i.indexOf(e);t>=0&&(r.push(e),i.splice(t,1))}),0===r.length)?1:function(){var e,t=r[0];for(e=1;e<r.length;e++)t*=r[e];return t}()},Fraction.primeFactors=function(e){for(var t=Math.abs(e),r=[],n=2;n*n<=t;)t%n==0?(r.push(n),t/=n):n++;return 1!=t&&r.push(t),r},f=Fraction;class m extends h{_parentElement=document.querySelector(".recipe");_errorMessage="We couldn't find the recipe. Please try another one!";_generateMarkup(){return`
            <figure class="recipe__fig">
              <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
              <h1 class="recipe__title">
                <span>${this._data.title}</span>
              </h1>
            </figure>

            <div class="recipe__details">
              <div class="recipe__info">
              <i class="fa-solid fa-clock"></i>
                <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
                <span class="recipe__info-text">minutes</span>
              </div>
              <div class="recipe__info">
              <i class="fa-solid fa-user-group"></i>
                <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
                <span class="recipe__info-text">servings</span>

                <div class="recipe__info-buttons">
                  <button data-update-to='${this._data.servings-1}' class="btn--tiny btn--update-servings">
                  <i class="fa-solid fa-circle-minus"></i>
                  </button>
                  <button data-update-to='${this._data.servings+1}' class="btn--tiny btn--update-servings">
                  <i class="fa-solid fa-circle-plus"></i>
                  </button>
                </div>
              </div>

              <div class="recipe__user-generated ${this._data.key?"":"hidden"}">
               <i class="fa-solid fa-user"></i>
              </div>
              <button class="btn--round btn-bookmark">
               <i class="fa${this._data.bookmarked?"-solid":"-regular"} fa-bookmark">.</i>
              </button>
            </div>

            <div class="recipe__ingredients">
              <h2 class="heading--2">Recipe ingredients</h2>
              <ul class="recipe__ingredient-list">
              ${this._data.ingredients.map(this._generateMarkupIngredient).join("")}
              </ul>
            </div>

            <div class="recipe__directions">
              <h2 class="heading--2">How to cook it</h2>
              <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
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
    `}addHandlerAddBookmark(e){this._parentElement.addEventListener("click",function(t){let r=t.target.closest(".btn-bookmark");r&&e()})}addHandlerUpdateServings(e){this._parentElement.addEventListener("click",function(t){let r=t.target.closest(".btn--update-servings");if(!r)return;let{updateTo:n}=r.dataset;+n>0&&e(+n)})}addHandlerRender(e){["hashchange","load"].forEach(t=>window.addEventListener(t,e))}_generateMarkupIngredient(e){return`
  <li class="recipe__ingredient">
    <i class="fa-solid fa-check"></i>
    <div class="recipe__quantity">${e.quantity?new f(e.quantity).toString():""}
    </div>
    <div class="recipe__description">
      <span class="recipe__unit">${e.unit}</span>
        ${e.description}
    </div>
  </li>
  `}}var f,g=new m;class _{#e=document.querySelector(".search");getQuery(){let e=this.#e.querySelector(".search__field").value;return this.#t(),e}#t(){this.#e.querySelector(".search__field").value=""}addHandlerSearch(e){this.#e.addEventListener("submit",function(t){t.preventDefault(),e()})}}var v=new _,b=new class extends h{_parentElement="";_generateMarkup(){let e=window.location.hash.slice(1);return`
          <li class="preview">
            <a class="preview__link ${this._data.id===e?"preview__link--active":""}" href="#${this._data.id}">
              <figure class="preview__fig">
                <img src="${this._data.image}" alt="${this._data.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${this._data.title}</h4>
                <p class="preview__publisher">${this._data.publisher}</p>
                <div class="preview__user-generated ${this._data.key?"":"hidden"}">
                 <i class="fa-solid fa-user"></i>
                </div>
              </div>
            </a>
          </li>
    `}};class k extends h{_parentElement=document.querySelector(".results");_errorMessage="No recipes found for your query! Please try again.";_generateMarkup(){return this._data.map(e=>b.render(e,!1)).join("")}}var y=new k;class w extends h{_parentElement=document.querySelector(".pagination");addHandlerClick(e){this._parentElement.addEventListener("click",function(t){let r=t.target.closest(".btn--inline");if(!r)return;let n=+r.dataset.goto;e(n)})}_generateMarkup(){let e=this._data.page,t=Math.ceil(this._data.results.length/this._data.resultPerPage);return 1===e&&t>1?`
          <button data-goto='${e+1}' class="btn--inline pagination__btn--next">
            <span>Page ${e+1}</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
      `:e===t&&t>1?`
      <button data-goto='${e-1}' class="btn--inline pagination__btn--prev">
      <i class="fa-solid fa-arrow-left"></i>
            <span>Page ${e-1}</span>
      `:e<t?`
          <button data-goto='${e-1}' class="btn--inline pagination__btn--prev">
            <i class="fa-solid fa-arrow-left"></i>
            <span>Page ${e-1}</span>
          </button>
          <button data-goto='${e+1}' class="btn--inline pagination__btn--next">
            <span>Page ${e+1}</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
      `:""}}var M=new w;class E extends h{_parentElement=document.querySelector(".bookmarks__list");_errorMessage="No bookmarks yet. Find a nice recipe and bookmark it :).";addHandlerRender(e){window.addEventListener("load",e)}_generateMarkup(){return this._data.map(e=>b.render(e,!1)).join("")}}var $=new E;class F extends h{_parentElement=document.querySelector(".upload");_message="Recipe successfully uploaded";_window=document.querySelector(".add-recipe-window");_overlay=document.querySelector(".overlay");_btnOpen=document.querySelector(".nav__btn--add-recipe");_btnClose=document.querySelector(".btn--close-modal");constructor(){super(),this._addHandlerShowWindow(),this._addHandlerHideWindow()}toggleWindow(){this._overlay.classList.toggle("hidden"),this._window.classList.toggle("hidden")}_addHandlerShowWindow(){this._btnOpen.addEventListener("click",this.toggleWindow.bind(this))}_addHandlerHideWindow(){this._btnClose.addEventListener("click",this.toggleWindow.bind(this)),this._overlay.addEventListener("click",this.toggleWindow.bind(this))}addHandlerUpload(e){this._parentElement.addEventListener("click",function(t){t.preventDefault();let r=t.target.closest(".upload__btn");if(!r)return;let n=[...new FormData(this)],i=Object.fromEntries(n);e(i)})}_generateMarkup(){}}var S=new F;const q=document.querySelector(".recipe"),H=async function(){try{let e=window.location.hash.slice(1);if(!e)return;g.renderSpinner(q),y.update(o()),$.update(n.bookMarks),await a(e),g.render(n.recipe)}catch(e){g.renderError(),console.error(e)}},x=async function(){try{y.renderSpinner();let e=v.getQuery();if(!e)return;await s(e),y.render(o()),M.render(n.search)}catch(e){console.log(e)}},P=async function(e){try{S.renderSpinner(),await p(e),console.log(n.recipe),g.render(n.recipe),S.renderMessage(),$.render(n.bookMarks),window.history.pushState(null,"",`#${n.recipe.id}`),$.update(n.bookMarks),setTimeout(function(){S.toggleWindow()},2500)}catch(e){console.error("\uD83C\uDF88",e),S.renderError(e.message)}};$.addHandlerRender(function(){$.render(n.bookMarks)}),g.addHandlerRender(H),g.addHandlerUpdateServings(function(e){c(e),g.update(n.recipe)}),g.addHandlerAddBookmark(function(){n.recipe.bookmarked?u(n.recipe.id):l(n.recipe),g.update(n.recipe),$.render(n.bookMarks)}),v.addHandlerSearch(x),M.addHandlerClick(function(e){y.render(o(e)),M.render(n.search)}),S.addHandlerUpload(P);
//# sourceMappingURL=index.b5c5898d.js.map
