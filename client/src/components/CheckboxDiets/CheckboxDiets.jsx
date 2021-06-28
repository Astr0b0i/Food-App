import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emptyRecipes, filterDiets } from "../../store/actions/buttonsActions";
import style from './CheckBoxDiets.css';
import React from 'react';


export default function CheckboxDiets({stateRecipes}){
    const stateDiets = useSelector(state => state.recipesDiets);
    const dispatch = useDispatch();
    let initial = {};
    stateDiets && stateDiets.forEach(diet => {
        initial[diet.name.toLowerCase()]= false;
    })

    const filterObj = function( obj, predicate) {
        let result = {}, key;
        
        for (key in obj) {
            if (obj[key] === predicate) {
                result[key] = obj[key];
            }
        }
        return result;
    };

    const [dietsCheck, setDietsCheck] = useState(initial);

    const handleCheckboxChange = (e) => {
        const {name, checked} = e.target;
        setDietsCheck({
            ...dietsCheck,
            [name]:checked
        });

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const filter = filterObj(dietsCheck, true);
        const diets = Object.keys(filter);
        dispatch(emptyRecipes());
        dispatch(filterDiets(stateRecipes,diets));
    }

    return (
        <div>
            <form onSubmit={handleSubmit} style={style}>
                <div className='container-all-checks' style={style}>
                {stateDiets.length !== 0 &&
                    stateDiets.map((diet, index) => {
                        return (
                            <div className='container-check' key={index}>
                                <input type='checkbox' id={index} name={diet.name.toLowerCase()} value={diet.name} onChange={handleCheckboxChange}></input>
                                <label htmlFor={index}>{diet.name}</label>
                            </div>
                        ) 
                    })
                }
                    <button  className='button-search' style={style} stype='submit' onClick={() => handleSubmit}>Buscar por dietas</button>
                </div>
            </form>
        </div>
    )
}