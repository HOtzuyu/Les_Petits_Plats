/**----------DOM----------*/
const recipesContainer = document.querySelector("#output");
const tags = document.querySelector(".selectedTag");

//inputs
const ingredientFilter = document.querySelector("#ingredients-filter");
const applianceFilter = document.querySelector("#appliance-filter");
const ustensilFilter = document.querySelector("#ustensils-filter");
const principalSearch = document.querySelector("#recherche");

//chevrons
const ingredientChevron = document.querySelector(".ingredientChevron");
const applianceChevron = document.querySelector(".applianceChevron");
const ustensilChevron = document.querySelector(".ustensilChevron");
const chevrons = document.querySelectorAll(".chevron");

//ul
const listOfIngredients = document.querySelector("#ingredientsList");
const listOfUstensils = document.querySelector("#ustensilsList");
const listOfAppliances = document.querySelector("#applianceList");




class App {
    static init () {
        new App (recipes);
    }
    constructor (recipes) {
        this.recipes = recipes;        
        this.launchRecipes();
    }
    
    launchRecipes () {
        new Recipes(this.recipes);
    }
}

App.init();