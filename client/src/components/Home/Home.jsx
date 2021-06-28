import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { changePage, ascendantSorting, descendingSorting, emptyRecipes, descendingScore, ascendantScore} from '../../store/actions/buttonsActions';
import { getRecipes, getRecipesDiets } from '../../store/actions/recipesActions';
import RecipeCard from '../RecipeCard/RecipeCard';
import Pagination from '../Pagination/Pagination';
import Searchbar from '../Searchbar/Searchbar';
import CheckboxDiets from '../CheckboxDiets/CheckboxDiets';
import style from './Home.css';
import React from 'react';


export default function Home () {  
    const stateLoading = useSelector(state => state.recipesLoading);
    const statePage = useSelector(state => state.page);
    const stateRecipes = useSelector(state => state.recipes);
    const stateDiets = useSelector(state => state.recipesDiets);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRecipes(''));
        dispatch(getRecipesDiets());
    }, [dispatch]);

    const indexOfLastRecipe = statePage * 9;
    const indexOfFirstRecipe = indexOfLastRecipe - 9;
    const currentRecipes = stateRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
    
    const paginate = (pageNumber) => {
        dispatch(changePage(pageNumber));
    }

    const alfphabeticSort = e => {
        e.preventDefault();
        switch (e.target.value) {
            case 'asc':
                dispatch(emptyRecipes()); 
                dispatch(ascendantSorting(stateRecipes));
                break;

            case 'desc':
                dispatch(emptyRecipes());
                dispatch(descendingSorting(stateRecipes));
                break;
        
            default:
                break;
        }
    }
    
    const scoreSort = e => {
        e.preventDefault();
        switch (e.target.value) {
            case 'minMax':
                dispatch(emptyRecipes());
                dispatch(ascendantScore(stateRecipes));
                break;
            
            case 'maxMin':
                dispatch(emptyRecipes());
                dispatch(descendingScore(stateRecipes));
                break;
        
            default:
                break;
        }
    }

    const clearParams = () => {
        dispatch(emptyRecipes());
        dispatch(getRecipes(''));
    }


    return (
        <div className='container-background' style={style}>
            {currentRecipes.length === 0 && <div><h1>Error, no hay recetas.</h1></div>}        
                <div className='title-page' style={style}>
                    <h1>Recipes.</h1>
                </div>
                {stateLoading && <div>Buscando...</div>}
                { currentRecipes.length >=1 &&
                <div className='container-home' style={style}>

                    <div className ='container-control' style={style}>
                        <div className='container-control-1' style={style}>
                            <div>
                                <button className='button-control' style={style}onClick={clearParams}>Limpiar busquedas</button>
                            </div>
                            <Searchbar/>
                            <Link to ={'/create'}>
                                <button className='button-control' style={style}>Crear Receta</button>
                            </Link>
                        </div>

                        <div className='container-control-2' style={style}>
                            <div>
                                <select id="Alfabetico" onChange={(e) => alfphabeticSort(e)}>
                                    <option value="asc">A-Z</option>
                                    <option value="desc">Z-A</option>
                                </select>

                                <select id="Puntaje" onChange={(e) => scoreSort(e)}>
                                    <option value="maxMin">Puntaje mayor</option>
                                    <option value="minMax">Puntaje menor</option>
                                </select>
                            </div>
                            {stateDiets.length > 1 && <CheckboxDiets stateRecipes={stateRecipes}/>}
                        </div>
                    </div>

                    <div className='container-showrecipes' style={style}>
                        
                        <div className ='container-recipes-card' style={style}>
                            
                            {Array.isArray(currentRecipes) && currentRecipes.map(recipes => {
                                return (
                                    <div className='container-card' style={style} key={recipes.id}>
                                        <RecipeCard 
                                        id={recipes.id} 
                                        title={recipes.title} 
                                        image={recipes.image} 
                                        score={recipes.spoonacularScore}
                                        diets={recipes.diets}/>
                                    </div>
                                )
                            })}
                            </div>
                        <div className='container-recipes-paginator'style={style}>
                            <Pagination recipesPerPage={9} totalRecipes={stateRecipes.length} paginate={paginate}/>
                        </div>
                    </div>
                </div>
                }
    </div>
    );
}