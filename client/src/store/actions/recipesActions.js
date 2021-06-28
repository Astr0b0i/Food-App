import axios from 'axios';
export const RECIPE_REQUEST = 'RECIPE_REQUEST';
export const RECIPE_SUCCESS = 'RECIPE_SUCCESS';
export const RECIPE_FAILURE = 'RECIPE_FAILURE';
export const RECIPE_ID_SUCCESS = 'RECIPE_ID_SUCCESS';
export const RECIPE_DIETS_SUCCESS = 'RECIPE_DIETS_SUCCESS';


export const recipeRequest = () => {
    return {
        type: RECIPE_REQUEST
    }
}

export const recipeFailure = (payload) => {
    return {
        type: RECIPE_FAILURE,
        payload: payload
    }
}

export const getRecipes = (query) => {
    return (dispatch => {
        if (query !== ''){
            dispatch(recipeRequest())
            axios.get(`http://localhost:3001/recipes?name=${query}`)
            .then(response => {
                dispatch({ type: RECIPE_SUCCESS, payload: response.data});
            })
            .catch(err => {
                dispatch(recipeFailure('No se encontro recetas'))
            })
        } else {
            dispatch(recipeRequest())
            axios.get(`http://localhost:3001/recipes/all`)
            .then(response => {
                dispatch({ type: RECIPE_SUCCESS, payload: response.data});
            })
            .catch(err => {
                dispatch(recipeFailure('Error, no se pudieron traer los datos'))
            });
        }
    })
}

export const recipeId = (id) => {
    return (dispatch => {
        dispatch(recipeRequest())
        axios.get(`http://localhost:3001/recipes/${id}`)
        .then(response => {
            dispatch({  type: RECIPE_ID_SUCCESS, payload: response.data});
        })
        .catch(err => {
            dispatch(recipeFailure('Id incorrecto'));
        })
    })
}

export const getRecipesDiets = () => {
    return (dispatch => {
        dispatch(recipeRequest())
        axios.get(`http://localhost:3001/types`)
        .then(response => {
            dispatch({  type: RECIPE_DIETS_SUCCESS, payload: response.data});
        })
        .catch(err => {
            dispatch(recipeFailure('Error con las dietas incorrecto'));
        })
    })
}
