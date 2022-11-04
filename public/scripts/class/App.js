class App {
    static init() {
        new App(recipes);
    }
    constructor(recipes) {
        this.recipes = recipes;
        this.launchRecipes();
        this.launchFilters();
    }


    launchFilters() {
        const filtersList = new GetFilters(this.recipes);
        const ingredients = filtersList.getIngredients();
        const appliances = filtersList.getAppliances();
        const ustensils = filtersList.getUstensils();
        new Trieur(ingredients, document.querySelector("#ingredients"), "bg-ingredient");
        new Trieur(appliances, document.querySelector("#appliances"), "bg-appliance");
        new Trieur(ustensils, document.querySelector("#ustensils"), "bg-ustensil");
    }

    launchRecipes() {
        new Recipes(this.recipes);
    }
}
