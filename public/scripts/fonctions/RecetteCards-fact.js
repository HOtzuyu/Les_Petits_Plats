class RecetteCard {
    constructor(recipe) {
        this.name = recipe.name;
        this.ingredients = recipe.ingredients;
        this.time = recipe.time;
        this.description = recipe.description;
        this.appliance = recipe.appliance.toLowerCase();
    }

    buildCard() {
        const card = document.createElement("article");
        let photo = "";
        photo = this.name.toLowerCase().replace(/\s/g, "");
        card.classList.add(
            "card",
            "col-lg-4",
            "col-md-6",
            "col-sm-12",
            "g-4",
            "border-0",
            "p-0",
            "mt-2",
            "mb-4"
        );
        card.innerHTML = `
            <img src="/public/assets/image/${photo}.jpg" alt="${this.name}" class="card-img-top mb-2">
            <div class="d-flex justify-content-between align-items-center gap-1 w-100 px-3">
                <h2>${this.name}</h2>
                <p class="timer"><img src="/public/assets/pictos/timer.png" alt=""> ${this.time} min</p>
            </div>
            <div class="d-flex gap-1  px-3 card-detail">
                <ul class="w-50 list-ingredients">${this.ingredients
                    .map(
                      (element) =>
                        `
                  <li class="list-group-item border-0 p-0">
                      <span>${element.ingredient}</span> : ${
                          "quantity" in element ? element.quantity : ""
                        } ${"unit" in element ? element.unit : ""}
                  `
                    )
                    .join("")}</li>
                </ul>
                <div class="w-50 h-100 card-desc">
                    <p class="">${this.description}</p>
                </div>

            </div>
        `;
        return card;
    }
}