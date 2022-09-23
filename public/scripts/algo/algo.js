let currentTabRecipes = filteredRecipes = searchedRecipes = recipes;
const filtersDatas = Array.from(document.querySelectorAll(".tag button"));

function searchBarAlgo () {
    const inputData = document.querySelector("#searchinput").value.toLowerCase();
    if (inputData.length > 2) {
        let result = [];
        for (const element of filteredRecipes) {
            const match = inputMatch (inputData, element);
            if (match == true) {
                result.push(element);
            }
        }
        searchedRecipes = result;
        if (searchedRecipes.length != 0) {
            new Recipes (searchedRecipes);
            newFiltersList (searchedRecipes);
        }
        else {
            const resultSection = document.querySelector(".result-section");
            document.querySelector("#wrapper-recettes").classList.add('hide');
            document.querySelector(".result-section ").classList.remove('hide');
            resultSection.innerHTML = `<p>Aucune recette ne correspond à votre critère… vous pouvez
            chercher « tarte aux pommes », « poisson », etc...</p>`;
        }
        currentTabRecipes = searchedRecipes;
    }
    else if (inputData.length < 3 && filtersDatas.length === 0) {
        currentTabRecipes = recipes;
        searchedRecipes = recipes;
        new Recipes (recipes);
        newFiltersList (recipes);
        document.querySelector("#wrapper-recettes").classList.remove('hide');
        document.querySelector(".result-section ").classList.add('hide');
        document.querySelector(".filtres-actifs").innerHTML="";
    }
    else {
        searchedRecipes = recipes;
        currentTabRecipes = recipes;
        console.log("step 1 :");
        // const algo = require("./filterAlgo");
        filtersAlgo();

    }
}
//looking for a match
function inputMatch (inputData, element) {
    const findInTitle = searchInTitle(element, inputData);
    const findInDescription = searchInDescription(element, inputData);
    const findInIngredients = searchInIngredients(element, inputData);
    if (findInTitle || findInDescription || findInIngredients == true) {
        return true;
    }
    else {
        return false;
    }
}


function filtersAlgo () {
    console.log("step 2 :");
    if (filtersDatas.length != 0) {
        for (const filterData of filtersDatas) {
            filterMatch(filterData);
        }
        new Recipes (currentTabRecipes);
        newFiltersList(currentTabRecipes);
        filteredRecipes = currentTabRecipes;
        currentTabRecipes = searchedRecipes;
    }
    else  {
        filteredRecipes = recipes;
        searchBarAlgo();
    }
}

//looking for a match
function filterMatch (tagData) {
    const filterType = tagData.getAttribute("data-filtertype");
    tagData = tagData.innerText.toLowerCase();
    if (filterType === "ingredients") {
        let result = [];
        for (const element of currentTabRecipes) {
            const match = searchInIngredients (element, tagData);
            if (match == true) {
                result.push(element)
            }
        }
        currentTabRecipes = result;
    }
    else if (filterType === "appliances") {
        let result = [];
        for (const element of currentTabRecipes) {
            const match = searchInAppliances (element, tagData);
            if (match == true) {
                result.push(element)
            }
        }
        currentTabRecipes = result;
    }
    else if (filterType === "ustensils") {
        let result = [];
        for (const element of currentTabRecipes) {
            const match = searchInUstensils (element, tagData);
            if (match == true) {
                result.push(element)
            }
        }
        currentTabRecipes = result;
    }
}


function newFiltersList (recipes) {
    const filtersList = new getFilters (recipes);
    const ingredients = filtersList.getIngredients();
    const appliances = filtersList.getAppliances();
    const ustensils = filtersList.getUstensils();

    const ingredientsDOM = document.querySelector("#ingredients");
    const appliancesDOM = document.querySelector("#appliances");
    const ustensilsDOM = document.querySelector("#ustensils");

    new List (ingredientsDOM, ingredients, "bg-ingredient");
    new List (appliancesDOM, appliances, "bg-appliance");
    new List (ustensilsDOM, ustensils, "bg-ustensil");
}


function searchInTitle (element, data) {
    return element.name.toLowerCase().includes(data);
}

function searchInIngredients (element, data) {
    const tabIngredients = element.ingredients;
    for (const elem of tabIngredients) {
        if (elem.ingredient.toLowerCase().includes(data)) {
            return true
        }
    }
}

function searchInAppliances (element, data) {
    return element.appliance.toLowerCase().includes(data);
}

function searchInUstensils (element, data) {
    const tabUstensils = element.ustensils;
    for (const elem of tabUstensils) {
        if (elem.toLowerCase().includes(data)) {
            return true
        }
    }
}

function searchInDescription (element, data) {
    return element.description.toLowerCase().includes(data)
}

