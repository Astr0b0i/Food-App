import { RECIPE_FAILURE, RECIPE_REQUEST, RECIPE_SUCCESS , RECIPE_ID_SUCCESS, RECIPE_DIETS_SUCCESS} from "../actions/recipesActions";
import { CHANGE_PAGE, CHANGE_RECIPES , EMPTY} from '../actions/buttonsActions';

const initialState = {
    recipesLoading: false,
    recipes: [],
    recipeInfo: {}, 
    recipesDiets: [],
    recipesError: '',
    page: 1,
}

const reducers = (state = initialState, action) => {
    switch (action.type) {

        case RECIPE_REQUEST:
            return {
                ...state,
                recipesLoading: true
            };
        
        case RECIPE_SUCCESS:
            return {
                ...state,
                recipesLoading: false,
                recipeInfo:{},
                recipes: action.payload,
                page:1
            }
        
        case RECIPE_ID_SUCCESS:
            return {
                ...state,
                recipesLoading: false,
                recipeInfo: action.payload
            }
        
        case RECIPE_DIETS_SUCCESS:
            return {
                ...state,
                recipesLoading: false,
                recipesDiets: action.payload,
                page: 1
            }

        case RECIPE_FAILURE:
            return {
                recipesLoading: false,
                recipes: [],
                recipesId: {},
                recipesError: action.payload,
                page: 1
            }

        case CHANGE_PAGE:
            return {
                ...state,
                page: action.payload
            }

        case EMPTY:
            return{
                ...state,
                recipes: [],
                page:1 
            }

        case CHANGE_RECIPES:
            return {
                ...state,
                recipes: action.payload
            }
    
        default:
            return {
                ...state
            };
    }
}

export default reducers;