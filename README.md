ead2378fa38c30e20a7db545ccdcc632




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
        const findInIngredients = searchInIngredients(element.ingredient, inputData);
        return findInTitle || findInDescription || !!findInIngredients;
    }


    function filtersAlgo() {
        const filtersDatas = Array.from(document.querySelectorAll(".tag button"));
        console.log("step 2 :");
        if (filtersDatas.length != 0) {
            console.log('1');
            for (const filterData of filtersDatas) {
                filterMatch(filterData);
            }
            new Recipes (currentTabRecipes);
            newFiltersList(currentTabRecipes);
            filteredRecipes = currentTabRecipes;
            currentTabRecipes = searchedRecipes;
        }
        else  {
            console.log('2');
            filteredRecipes = recipes;
            searchBarAlgo();
        }
    }

    //looking for a match
    function filterMatch (tagData) {
        const filterType = tagData.getAttribute("data-filtertype");
        tagData = tagData.innerText.toLowerCase();

        if (filterType === "ingredients") {
            return loopelement(currentTabRecipes, tagData, "ingredients")

        }
        else if (filterType === "appliances") {
            return loopelement(currentTabRecipes, tagData, "appliances")

        }
        else if (filterType === "ustensils") {
        return loopelement(currentTabRecipes, tagData, "ustensils")
        }

        return null;
    }

    function loopelement(currentTabRecipes, tagData, type){
        let result = [];
        for (const element of currentTabRecipes) {
            const match = search(element[type], tagData);
            !!match && result.push(element);
        }
        return result;
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

    function search(element, data){
        return !!element.toLowerCase().includes(data);
    }