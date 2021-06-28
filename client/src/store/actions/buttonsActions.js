export const CHANGE_PAGE = 'CHANGE_PAGE';
export const CHANGE_RECIPES = 'CHANGE_RECIPES'
export const EMPTY = 'EMPTY';

export const changePage = (numberPage) => {
    return {
        type: CHANGE_PAGE,
        payload: numberPage
    }
}

export const emptyRecipes = () => {
    return {
        type: EMPTY
    }
}

export const ascendantSorting = (recipes) => {
    const sort = recipes.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
    return {
        type: CHANGE_RECIPES,
        payload: sort
    }
}

export const descendingSorting = (recipes) => {
    const sort = recipes.sort((a,b) => (a.title > b.title) ? -1 : ((b.title > a.title) ? 1 : 0));
    return {
        type: CHANGE_RECIPES,
        payload: sort
    }
}

export const ascendantScore = (recipes) => {
    const sort = recipes.sort((a,b) => (a.spoonacularScore > b.spoonacularScore) ? 1 : ((b.spoonacularScore > a.spoonacularScore) ? -1 : 0))
    return {
        type: CHANGE_RECIPES,
        payload: sort
    }
}

export const descendingScore = (recipes) => {
    const sort = recipes.sort((a,b) => (a.spoonacularScore > b.spoonacularScore) ? -1 : ((b.spoonacularScore > a.spoonacularScore) ? 1 : 0))
    return {
        type: CHANGE_RECIPES,
        payload: sort
    }
}

export const filterDiets = (recipes, dietArr) => {
    (dietArr.indexOf('paleo') >= 0) ? dietArr.push('paleolithic') : dietArr.push();
    (dietArr.indexOf('lacto-vegetarian') >=0 && dietArr.indexOf('ovo-vegetarian') >=0) ? dietArr.push('lacto ovo vegetarian') : dietArr.push();
    (dietArr.indexOf('pescetarian') >= 0) ? dietArr.push('pescatarian') : dietArr.push();

    let filter = [];
    recipes.forEach(recipe => {
        const diets = recipe.diets;
        diets.forEach(diet =>{
            if (typeof diet === 'object') {
                Object.values(diet).forEach(d => {
                    if (dietArr.includes(d.toLowerCase())){
                        filter.push(recipe);
                    }
                }) 
            } else {
               let flagtotal = true;
                dietArr.forEach(e => {
                    if (!diets.includes(e)){
                       flagtotal=false;
                   }
                })
                console.log(dietArr, diets);
                console.log(flagtotal)
                if (flagtotal) filter.push(recipe);
                   
            } 
            
        })
    })
    filter = [...new Set(filter)]
    return {
        type: CHANGE_RECIPES,
        payload: filter
    }       
}