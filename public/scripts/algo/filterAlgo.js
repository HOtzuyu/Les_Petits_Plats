export function filtersAlgo () {
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