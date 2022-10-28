/**
 * Add cards RecetteCards-fact.js
 */
class Recipes {
    constructor(recipes) {
        this.recipes = recipes;
        this.addRecipes();
    }
    addRecipes() {
        const resultSection = document.querySelector("#wrapper-recettes");
        resultSection.innerHTML = "";
        this.recipes.forEach(element => {
            const recipeDOM = new RecetteCard(element);
            resultSection.appendChild(recipeDOM.buildCard());
        });
    }
}