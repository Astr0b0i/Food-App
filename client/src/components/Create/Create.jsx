import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import style from './Create.css';
import React from 'react';

export default function Create () {
    const [input, setInput] = useState({
        name: "",
        dishSummary:"",
        score: null,
        healthyFoodLevel: null,
        stepByStep:"",
        diets:[]
    });
    const stateDiets = useSelector(state => state.recipesDiets);

    let initial = {};
    stateDiets && stateDiets.forEach(diet => {
        initial[diet.name]= false;
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        const dietsArr = Object.keys(filterObj(dietsCheck,true));
        setInput({
            ...input,
            [input.diets]: dietsArr.forEach(e => input.diets.push(e)),
        })
        
        try {
            await axios.post(`http://localhost:3001/recipe`, input);
        } catch(err) {
            console.log(err);
        }
    }

    const handleInputChange = function(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value,
        });
      }

    
    const handleCheckboxChange = (e) => {
        const {name, checked} = e.target;
        setDietsCheck({
            ...dietsCheck,
            [name]:checked
        });
    }

    return (
        <div className='container-background' style={style}>
            <div className='title-page' style={style}>
                <h1>Create.</h1>
            </div>

            <form onSubmit={handleSubmit} className='container-create' style={style}> 
                    <div className='container-input' style={style}>
                        <p>Nombre</p>
                        <input 
                            name='name' 
                            value={input.name || ''} 
                            onChange={handleInputChange}
                            required></input> 
                    </div>
                    
                    <div className='container-input' style={style}>
                        <p>Resumen:</p>
                        <textarea 
                            className='input-textarea' 
                            style={style} 
                            name='dishSummary' 
                            type='text' 
                            value={input.dishSummary || ''} 
                            onChange={handleInputChange}
                            required></textarea>
                    </div>
                    
                    <div className='container-input' style={style}>
                        <p>Puntuacion</p>
                        <input 
                            name='score' 
                            type='number' 
                            value={input.score || 0} 
                            onChange={handleInputChange}></input>
                    </div>
                
                    <div className='container-input' style={style}>
                        <p>Nivel de saludable</p>
                        <input 
                            name='healthyFoodLevel' 
                            type='number' 
                            value={input.healthyFoodLevel || 0} 
                            onChange={handleInputChange}></input>
                    </div>
                    
                    <div className='container-input' style={style}>
                        <p>Paso a paso:</p>
                        <textarea  
                            className='input-textarea' 
                            style={style} 
                            name='stepByStep' 
                            type='text' 
                            value={input.stepByStep || ''} 
                            onChange={handleInputChange} ></textarea>
                    </div>
                    
                    <div className='container-diets' style={style}>
                        {stateDiets.length !== 0 &&
                            stateDiets.map((diet, index) => {
                                return (
                                <div key={index} >
                                    <input
                                        type='checkbox' 
                                        id={index} 
                                        name={diet.name} 
                                        value={diet.name || ''} 
                                        onChange={handleCheckboxChange}></input>
                                    <label htmlFor={index}>{diet.name}</label>
                                </div>) 
                            })
                        }
                    </div>
                    <div className='container-buttons' style={style}>
                        <Link to ={'/home'}>
                            <button>home</button>
                        </Link>
                        <div>
                            <button type='submit' onClick = {() => handleSubmit}>Subir receta</button>
                        </div>
                    </div> 
            </form> 
        </div>
    );
}