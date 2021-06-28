// dumb component?
import { useEffect } from 'react';
import { useDispatch, useSelector} from "react-redux";
import { recipeId } from '../../store/actions/recipesActions';
import { Link } from 'react-router-dom';
import style from './RecipeInfo.css';
import React from 'react';


export default function RecipeInfo (props) {
    const dispatch = useDispatch();
    const stateIdRecipe = useSelector(state => state.recipeInfo);
    const stateError = useSelector(state => state.recipesError);
    
    useEffect(() => {
        const paramsId = props.match.params.id;
        dispatch(recipeId(paramsId));
    },[dispatch, props.match.params.id]);


    return (
        <div className='container-info' style={style}>
            <div className='title-page' style={style}>
                <h1>Info.</h1>
            </div>

            { stateIdRecipe.hasOwnProperty('diets') &&

            <div className='info' style={style}>
                <h1>{stateIdRecipe.title}</h1>
                <img src = {stateIdRecipe.image} alt="no image"/>
                
                <p>Diets:</p>
                <div className='container-diets' style={style}>
                    {
                    props.match.params.id.toString().includes('-') 
                    ? stateIdRecipe.diets.map((diet, index) => {return (<span key={index}>{diet.name}</span>)})
                    : stateIdRecipe.diets.map((diet, index) => {return (<span key={index}>{diet}</span>)})    
                    }
                </div>

                <p>Resumen:</p>
                <div dangerouslySetInnerHTML={{__html: stateIdRecipe.summary }}/>
                
                <p>Puntaje:</p> 
                <div>
                    <p>{stateIdRecipe.spoonacularScore}</p>
                </div> 

                <p>Nivel de comida saludable:</p>    
                <div>
                    <p>{stateIdRecipe.healthScore}</p>
                </div>    
                
                <p>Paso a paso:</p>
                <div dangerouslySetInnerHTML={{__html: stateIdRecipe.instructions }}/>
                <Link to ={'/home'}>
                    <button>Home</button>
                </Link>
            </div>
            }

            {stateError !== '' && <span>{stateError}</span>}
        </div>
    );
}