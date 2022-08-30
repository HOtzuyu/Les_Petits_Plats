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
    static init() {
        new App(recipes);
    }
    constructor(recipes) {
        this.recipes = recipes;
        this.launchSearchBar();
        this.launchRecipes();
        this.launchFilters();
    }

    launchSearchBar () {
        new Searchbar();
    }

    launchFilters() {
        const filtersList = new getFilters(this.recipes);
        const ingredients = filtersList.getIngredients();
        const appliances = filtersList.getAppliances();
        const ustensils = filtersList.getUstensils();
        new Filter(ingredients, document.querySelector("#ingredients"), "bg-ingredient");
        new Filter(appliances, document.querySelector("#appliances"), "bg-appliance");
        new Filter(ustensils, document.querySelector("#ustensils"), "bg-ustensil");

        // document.querySelector("#ingredients").addEventListener('click', () => {
        //     new Filter(ingredients, document.querySelector("#ingredients"), "bg-ingredient");
        // })

        // document.querySelector("#appliances").addEventListener('click', () => {
        //     new Filter(appliances, document.querySelector("#appliances"), "bg-ingredient");

        // })

        // document.querySelector("#ustensils").addEventListener('click', () => {
        //     new Filter(ustensils, document.querySelector("#ustensils"), "bg-ingredient");

        // })
    }

    launchRecipes() {
        new Recipes(this.recipes);
    }
}

App.init();