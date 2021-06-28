import { useState } from "react"
import { useDispatch } from "react-redux";
import { getRecipes } from "../../store/actions/recipesActions";
import style from './Searchbar.css';
import React from 'react';



export default function Searchbar () {
    const [recipeName, setRecipeName] = useState('');
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setRecipeName(e.target.value.toString());
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getRecipes(recipeName));
    }

    return (
        <div className='container-search' style={style}> 
            <form onSubmit = {e => {handleSubmit(e)}} style={style}>
                <input
                    className='input-search'
                    style={style} 
                    type='text' 
                    value={recipeName}
                    placeholder='Search...'
                    onChange = {e => {handleChange(e)}} 
                />
                <button className='button-search'type='submit' onClick={handleSubmit} style={style}>Buscar</button>
            </form>
        </div>
    )
}