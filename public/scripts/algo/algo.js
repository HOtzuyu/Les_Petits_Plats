let currentTabRecipes = filteredRecipes = searchedRecipes = recipes;
const filtersDatas = Array.from(document.querySelectorAll(".tag button"));

function searchBarAlgo () {
    const inputData = document.querySelector("#searchinput").value.toLowerCase();
    
    if (inputData.length > 2) {
        searchedRecipes = filteredRecipes.filter(element => {
            const match = inputMatch (inputData, element);
            if (match == true) {
                return element;
            }
        });
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
    
    if (filtersDatas.length != 0) {
        filtersDatas.forEach(filterData => {
            filterMatch(filterData);
        }); 
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
    switch (filterType) {
        case "ingredients":
            currentTabRecipes = currentTabRecipes.filter(element => {
                const match = searchInIngredients (element, tagData);
                if (match == true) {
                    return true;
                }
            });
            break;
        case "appliances":
            currentTabRecipes = currentTabRecipes.filter(element => {
                const match = searchInAppliances (element, tagData);
                if (match == true) {
                    return true;
                }
            });
            break;
        case "ustensils":
            currentTabRecipes = currentTabRecipes.filter(element => {
                const match = searchInUstensils (element, tagData);
                if (match == true) {
                    return true;
                }
            });
            break;
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
    return element.ingredients.some(element => {
        return element.ingredient.toLowerCase().includes(data);
    });
}

function searchInAppliances (element, data) {
    return element.appliance.toLowerCase().includes(data);
}

function searchInUstensils (element, data) {
    return element.ustensils.some(element => {
        return element.toLowerCase().includes(data);
    });
}

function searchInDescription (element, data) {
    return element.description.toLowerCase().includes(data)
}