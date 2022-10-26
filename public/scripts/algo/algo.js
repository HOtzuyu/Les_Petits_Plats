let currentTabRecipes = filteredRecipes = searchedRecipes = recipes;

/**
 * configuration of the principal search bar
 * reset all recipe cards 
 * call in filter.js
 */
function searchBarAlgo() {
    const filtersDatas = Array.from(document.querySelectorAll(".tag button"));
    const inputData = document.querySelector("#searchinput").value.toLowerCase();
    if (inputData.length > 2) {
        let result = [];
        for (const element of filteredRecipes) {
            const match = inputMatch(inputData, element);
            if (match === true) {
                result.push(element);
            }
        }
        searchedRecipes = result;
        if (searchedRecipes.length != 0) {
            new Recipes(searchedRecipes);
            newFiltersList(searchedRecipes);
        } else {
            const resultSection = document.querySelector(".result-section");
            document.querySelector("#wrapper-recettes").classList.add('hide');
            document.querySelector(".result-section ").classList.remove('hide');
            resultSection.innerHTML = `<p>Aucune recette ne correspond à votre critère… vous pouvez
            chercher « tarte aux pommes », « poisson », etc...</p>`;
        }
        currentTabRecipes = searchedRecipes;
    } else if (inputData.length < 3 && filtersDatas.length === 0) {
        currentTabRecipes = recipes;
        searchedRecipes = recipes;
        new Recipes(recipes);
        newFiltersList(recipes);
        document.querySelector("#wrapper-recettes").classList.remove('hide');
        document.querySelector(".result-section ").classList.add('hide');
        document.querySelector(".filtres-actifs").innerHTML = "";
    } else {
        searchedRecipes = recipes;
        currentTabRecipes = recipes;
        filtersAlgo(filtersDatas);
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
        for (const filterData of filtersDatas) {
            filterMatch(filterData);
        }
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
    if (filterType === "ingredients") {
        eventLoop(tagData, "ingredients", "A");
    } else if (filterType === "appliances") {
        eventLoop(tagData, "appliance", "B");

    } else if (filterType === "ustensils") {
        eventLoop(tagData, "ustensils", "A");
    }
    return currentTabRecipes;
}

/**
 * 
 * @param {tagData'type} data 
 * @param {type} type 
 * @param {test if a or b} AB 
 * @returns 
 */
function eventLoop(data, type, AB) {
    let result = [];
    for (element of currentTabRecipes) {
        if (AB === "A") {
            !!searchA(element, data, type) && result.push(element)

        } else if (AB === "B") {
            !!searchB(element, data, type) && result.push(element)
        }
    }
    return currentTabRecipes = result;
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
                    return true
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

/**
 * 
 * @param {display or remove cards} recipes 
 */
function newFiltersList(recipes) {
    const filtersList = new getFilters(recipes);
    const ingredients = filtersList.getIngredients();
    const appliances = filtersList.getAppliances();
    const ustensils = filtersList.getUstensils();
    const ingredientsDOM = document.querySelector("#ingredients");
    const appliancesDOM = document.querySelector("#appliances");
    const ustensilsDOM = document.querySelector("#ustensils");
    new List(ingredientsDOM, ingredients, "bg-ingredient");
    new List(appliancesDOM, appliances, "bg-appliance");
    new List(ustensilsDOM, ustensils, "bg-ustensil");
}