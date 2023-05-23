/** searchLive est definit ds searchInput.js **/
/* eslint-disable no-undef */
/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
/*** Variables ***/

/** On sélectionne les items dans chaque filtre **/

const filterItemIngredients = document.getElementsByClassName('filter__ingredients--items');
const filterItemAppliances = document.getElementsByClassName('filter__appliances--items');
const filterItemUstensils = document.getElementsByClassName('filter__ustensils--items');


let tagIngredientAlreadyAdded = false;
let tagApplianceAlreadyAdded = false;
let tagUstensilAlreadyAdded = false;

/** TAGS WRAPPERS - Conteneur des tags **/

const tagIngredientWrapper = document.querySelector('.tag__ingredients--wrapper');
const tagApplianceWrapper = document.querySelector('.tag__appliances--wrapper');
const tagUstensilWrapper = document.querySelector('.tag__ustensils--wrapper');

/*** FUNCTIONS ***/

/** Ajouter des tags pour les filtres **/

/* Ingrédients */

// eslint-disable-next-line no-unused-vars
function addTagFilterIngredients() {
  if (tagIngredientAlreadyAdded === false) {
    tagIngredientAlreadyAdded = true;
    Array.from(filterItemIngredients).forEach((element) => {
      element.addEventListener('click', (e) => {
        const tagIngredientContainer = document.createElement('div');
        tagIngredientContainer.setAttribute('class', 'tag__ingredient');
        
        const tagIngredient = document.createElement('li');
        tagIngredient.innerText = e.target.innerText;
        tagIngredient.classList.add('tag-blue');
        
        const deleteTagIcon = document.createElement('span');
        deleteTagIcon.classname = 'deleteIcon';
        
        const deleteIconImg = document.createElement('i');
        deleteIconImg.className = 'fa-regular fa-circle-xmark';
        deleteIconImg.style.cursor = 'pointer';
        deleteIconImg.style.width = '20px';
        
        deleteIconImg.addEventListener('click', () => {
          tagIngredientContainer.remove();
          searchLive();
          return false;
        });
        tagIngredientWrapper.appendChild(tagIngredientContainer);
        tagIngredientContainer.appendChild(tagIngredient);
        tagIngredientContainer.appendChild(deleteTagIcon);
        deleteTagIcon.appendChild(deleteIconImg);
        searchLive();
      });
    });
  }
}

/* Appareils */ 

// eslint-disable-next-line no-unused-vars
function addTagFilterAppliances() {
  if (tagApplianceAlreadyAdded === false) {
    tagApplianceAlreadyAdded = true;
    Array.from(filterItemAppliances).forEach((element) => {
      element.addEventListener('click', (e) => {

        const tagApplianceContainer = document.createElement('div');
        tagApplianceContainer.setAttribute('class', 'tag__appliance');

        const tagAppliance = document.createElement('li');
        tagAppliance.innerText = e.target.innerText;
        tagAppliance.classList.add('tag-green');

        const deleteTagIcon = document.createElement('span');
        deleteTagIcon.className = 'deleteIcon';
        
        const deleteIconImg = document.createElement('i');
        deleteIconImg.className = 'fa-regular fa-circle-xmark';
        deleteIconImg.style.cursor = 'pointer';
        deleteIconImg.style.width = '20px';
        deleteTagIcon.addEventListener('click', () => {
          tagApplianceContainer.remove();
          searchLive();
          return false;
        });
        tagApplianceWrapper.appendChild(tagApplianceContainer);
        tagApplianceContainer.appendChild(tagAppliance);
        tagApplianceContainer.appendChild(deleteTagIcon);
        deleteTagIcon.appendChild(deleteIconImg);
        searchLive();
      });
    });
  }
}

/* Ustensils */ 

// eslint-disable-next-line no-unused-vars
function addTagFilterUstensils() {
  if (tagUstensilAlreadyAdded === false) {
    tagUstensilAlreadyAdded = true;
    Array.from(filterItemUstensils).forEach((element) => {
      element.addEventListener('click', (e) => {
        
        const tagUstensilContainer = document.createElement('div');
        tagUstensilContainer.setAttribute('class', 'tag__ustensil');

        const tagUstensil = document.createElement('li');
        tagUstensil.innerText = e.target.innerText;
        tagUstensil.classList.add('tag-red');
        
        const deleteTagIcon = document.createElement('span');
        deleteTagIcon.className = 'deleteIcon';
        
        const deleteIconImg = document.createElement('i');
        deleteIconImg.className = 'fa-regular fa-circle-xmark';
        deleteIconImg.style.cursor = 'pointer';
        deleteIconImg.style.width = '20px';
        deleteTagIcon.addEventListener('click', () => {
          tagUstensilContainer.remove();
          searchLive();
          return false;
        });
        tagUstensilWrapper.appendChild(tagUstensilContainer);
        tagUstensilContainer.appendChild(tagUstensil);
        tagUstensilContainer.appendChild(deleteTagIcon);
        deleteTagIcon.appendChild(deleteIconImg);
        searchLive();
      });
    });
  }
}


/** TAG FILTRE RECIPES **/

/* filteredRecipesWithTags */
// eslint-disable-next-line no-unused-vars
function filteredRecipesWithTags(recipesToFilter) {
  /* Faire des tableaux des items afficher pour chaque filtre */ 
  const taggedIngredientsDOM = Array.from(document.querySelectorAll('.tag__ingredients--wrapper .tag__ingredient .tag-blue'));

  const taggedAppliancesDOM = Array.from(document.querySelectorAll('.tag__appliances--wrapper .tag__appliance .tag-green'));

  const taggedustensilsDOM = Array.from(document.querySelectorAll('.tag__ustensils--wrapper .tag__ustensil .tag-red'));
  let recipesToDisplay = [];
  let taggedIngredients = [];
  let taggedAppliances = [];
  let taggedUstensils = [];
  
  /* Créer des tableaux avec map contenant le texte de chaque tableau */
  taggedIngredients = taggedIngredientsDOM.map((taggedIngredient) => taggedIngredient.innerText);
  taggedAppliances = taggedAppliancesDOM.map((taggedAppliance) => taggedAppliance.innerText);
  taggedUstensils = taggedustensilsDOM.map((taggedUstensil) => taggedUstensil.innerText);
  
  /* Définir le tableau recipesToDisplay un filtre de recipes */
  recipesToDisplay = recipesToFilter.filter((recipe) => {
    let recipeIsMatching = false;
    let ingredientIsMatching = false;
    let applianceIsMatching = false;
    let ustensilIsMatching = false;

    let ingredientsMatching = 0;
    let appliancesMatching = 0;
    let ustensilsMatching = 0;

    let ingredientsInTheRecipe = [];
    let appliancesInTheRecipe = [];
    let ustensilsInTheRecipe = [];

    ingredientsInTheRecipe = recipe.ingredients.map(({ ingredient }) => ingredient);
    
    appliancesInTheRecipe.push(recipe.appliance);
    
    ustensilsInTheRecipe = recipe.ustensils.map((ustensil) => ustensil);

    if(taggedIngredients.length > 0) {
      taggedIngredients.forEach((taggedIngredient) => {
        if (ingredientsInTheRecipe.includes(taggedIngredient)) {
          ingredientsMatching += 1;
        }
      });
    }

    if(taggedAppliances.length > 0) {
      taggedAppliances.forEach((taggedAppliance) => {
        if (appliancesInTheRecipe.includes(taggedAppliance)) {
          appliancesMatching += 1;
        }
      });
    }
    
    if (taggedUstensils.length > 0) {
      taggedUstensils.forEach((taggedUstensil) => {
        if (ustensilsInTheRecipe.includes(taggedUstensil)) {
          ustensilsMatching += 1;
        }
      });
    }

    if (ingredientsMatching === taggedIngredients.length) {
      ingredientIsMatching = true;
    }

    if (taggedAppliances.length > 0) {
      if (appliancesMatching > 0) {
        applianceIsMatching = true;
      }
    } else applianceIsMatching = true;

    if (ustensilsMatching === taggedUstensils.length) {
      ustensilIsMatching = true;
    }

    if ((ingredientIsMatching === true) && (applianceIsMatching === true) && (ustensilIsMatching === true)) {
      recipeIsMatching = true;
    }

    return recipeIsMatching;
  });
  // filFilters est ds sortBtnList 
  fillFilters(recipesToDisplay);
  return recipesToDisplay;
}