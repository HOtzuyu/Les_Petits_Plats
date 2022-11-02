let currentTabRecipes = filteredRecipes = searchedRecipes = recipes;

/**
 * configuration of the principal search bar
 * reset all recipe cards 
 * call in filter.js
 */
function searchBarAlgo() {
    const inputData = document.querySelector("#searchinput").value.toLowerCase();
    const filtersDatas = Array.from(document.querySelectorAll(".tag button"));
    if (inputData.length > 2) {
        searchedRecipes = filteredRecipes.filter(element => {
            const match = inputMatch(inputData, element);
            return !!match && element;
        });
        if (searchedRecipes.length != 0) {
            new Recipes(searchedRecipes);
            newFiltersList(searchedRecipes);
            display("block");
        } else {
            display("hide");
        }
        currentTabRecipes = searchedRecipes;
    } else if (inputData.length < 5 && filtersDatas.length === 0) {
        currentTabRecipes = recipes;
        searchedRecipes = recipes;
        new Recipes(recipes);
        newFiltersList(recipes);
        display("block");
        document.querySelector(".filtres-actifs").innerHTML = "";
    } else {
        searchedRecipes = recipes;
        currentTabRecipes = recipes;
        filtersAlgo();
    }
};


/**
 * 
 * @param {toggle block or hide} id 
 */
function display(id) {
    if (id === "block") {
        document.querySelector("#wrapper-recettes").classList.remove('hide');
        document.querySelector(".result-section ").classList.add('hide');
    } else if (id === "hide") {
        const resultSection = document.querySelector(".result-section");
        document.querySelector("#wrapper-recettes").classList.add('hide');
        document.querySelector(".result-section ").classList.remove('hide');
        resultSection.innerHTML = `<p>Aucune recette ne correspond à votre critère… vous pouvez chercher<br>« tarte aux pommes », « poisson », etc...</p>`;
    }
}

/**
 * 
 * @param {input in search bar string} inputData 
 * @param {type} element 
 * @returns 
 * 
 * If the user typing match with the recipe.js elements
 */
function inputMatch(inputData, element) {
    const findInTitle = searchB(element, inputData, "name");
    const findInDescription = searchB(element, inputData, "description");
    const findInIngredients = searchA(element, inputData, "ingredients");
    return !!findInTitle || findInDescription || findInIngredients ? true : false;
}

/**
 * 
 * @param {all tag filter} filtersDatas 
 * 
 * filter by selected tags | listen if tag add or remove
 */
function filtersAlgo(filtersDatas) {
    if (filtersDatas.length != 0) {
        filtersDatas.forEach(filterData => {
            filterMatch(filterData);
        });
        new Recipes(currentTabRecipes);
        newFiltersList(currentTabRecipes);
        filteredRecipes = currentTabRecipes;
        currentTabRecipes = searchedRecipes;
    } else {
        filteredRecipes = recipes;
        searchBarAlgo();
    }
}

/**
 * 
 * @param {tag's type} tagData 
 * @returns 
 */
function filterMatch(tagData) {
    const filterType = tagData.getAttribute("data-filtertype");
    tagData = tagData.innerText.toLowerCase();
    switch (filterType) {
        case "ingredients":
            currentTabRecipes = currentTabRecipes.filter(element => {
                return !!searchA(element, tagData, "ingredients") && true;
            });
            break;
        case "appliances":
            currentTabRecipes = currentTabRecipes.filter(element => {
                return !!searchB(element, tagData, "appliance") && true;
            });
            break;
        case "ustensils":
            currentTabRecipes = currentTabRecipes.filter(element => {
                return !!searchA(element, tagData, "ustensils") && true;
            });
            break;
    }
}

/**
 * 
 * @param {display or remove cards} recipes 
 */
function newFiltersList(recipes) {
    const filtersList = new GetFilters(recipes);
    const ingredients = filtersList.getIngredients();
    const appliances = filtersList.getAppliances();
    const ustensils = filtersList.getUstensils();

    const ingredientsDOM = document.querySelector("#ingredients");
    const appliancesDOM = document.querySelector("#appliances");
    const ustensilsDOM = document.querySelector("#ustensils");

    new TagList(ingredientsDOM, ingredients, "bg-ingredient");
    new TagList(appliancesDOM, appliances, "bg-appliance");
    new TagList(ustensilsDOM, ustensils, "bg-ustensil");
}

/**
 * if loopEvent it's A
 * 
 * @param {tagData} element 
 * @param {type} data 
 * @param {A or B} type 
 * @returns 
 */
function searchA(element, data, type) {
    const tab = element[type];
    for (const elem of tab) {
        if (type === "ingredients") {
            if (elem.ingredient.toLowerCase().includes(data)) {
                return true;
            }
        } else if (type === "ustensils") {
            for (const elem of tab) {
                if (elem.toLowerCase().includes(data)) {
                    return true;
                }
            }
        }
    }
}

/**
 * if loopEvent it's B
 * 
 * @param {tagData} element 
 * @param {type} data 
 * @param {A or B} type  
 * @returns 
 */
function searchB(element, data, type) {
    return element[type].toLowerCase().includes(data);
}