
/* eslint-disable no-undef */
const searchBarInput = document.querySelector('.search__input');
const noResultText = document.querySelector('.no-result-message');

/** Fonction de recherche de l'objet Array **/
function searchLive() {
  let tagsUsed = false;
  recipesToDisplay = [];
  let mainInput;

  //Retourne un tableau 'recipeToDisplay'
  if (searchBarInput.value.length > 2) {
    mainInput = searchBarInput.value;

    recipesToDisplay = recipes.filter((recipe) => {
      let recipeIsMatching = false;
      if (recipe.name.toLowerCase().includes(mainInput.toLowerCase())
        || recipe.description.toLowerCase().includes(mainInput.toLowerCase())
        || recipe.ingredients.forEach(({ ingredient }) => {
          if (ingredient.toLowerCase().includes(mainInput.toLowerCase())) {
            recipeIsMatching = true;
          }
        })) {
        recipeIsMatching = true;
      }
      return recipeIsMatching;
    });

    /* Remplir les filtres avec le tableau retourné */
    fillFilters(recipesToDisplay);
  }

  /* Si l'un de ses tableaux comportent un élément alors un tag est utilisé, applique donc la fonction filteredRecipesWithTags avec comme callback recipesToDisplay;
  Les tableaux sont définis dans tags.js dans la fonction filteredRecipesWithTags. */
  if (Array.from(document.querySelectorAll('.tag__ingredients--wrapper .tag__ingredient .tag-blue')).length > 0
    || Array.from(document.querySelectorAll('.tag__appliances--wrapper .tag__appliance .tag-green')).length > 0
    || Array.from(document.querySelectorAll('.tag__ustensils--wrapper .tag__ustensil .tag-red')).length > 0) {
    tagsUsed = true;
    if (recipesToDisplay.length > 0) {
      recipesToDisplay = filteredRecipesWithTags(recipesToDisplay);
    } else {
      recipesToDisplay = filteredRecipesWithTags(recipes);
    }
  }

  /** Message erreur dans le cas d'une mauvaise recherche **/
  if (recipesToDisplay.length > 0) {
    noResultText.innerHTML = '';
    displayData(recipesToDisplay);
  } else {
    displayData(recipesToDisplay);
    noResultText.innerHTML = '<p>Aucune recette ne correspond à votre critère...</p>';
  }

  // Si la barre de recherche est vide ou moins de 3 caractères.
  if (((searchBarInput.value === '') || (searchBarInput.value.length < 3)) && tagsUsed === false) {
    fillFilters(recipes);
    displayData(recipes);
    noResultText.innerHTML = '';
  }
}



let typingTimer;
const typeInterval = 100;
searchBarInput.addEventListener('keyup', () => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(searchLive(), typeInterval);
});

