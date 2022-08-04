class RecetteCard {
    constructor(recipe) {
        this.id = recipe.id;
        this.name = recipe.name;
        this.servings = recipe.servings;
        this.ingredients = recipe.ingredients;
        this.time = recipe.time;
        this.description = recipe.description;
        this.appliance = recipe.appliance.toLowerCase();
    }

    buildCard() {
        const card = document.createElement("article");
        let photo = "";
        photo = this.name.toLowerCase().replace(/\s/g, "_");
        card.classList.add(
            "card",
            "col-lg-4",
            "col-md-6",
            "col-sm-12",
            "g-4",
            "border-0"
        );
        card.innerHTML = `
            <img
        `

    }
}