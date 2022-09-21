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

    launchSearchBar() {
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
    }

    launchRecipes() {
        new Recipes(this.recipes);
    }
}

App.init();