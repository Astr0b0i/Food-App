import React from 'react';
import { Link } from 'react-router-dom';
import style from './RecipeCard.css';

export default function RecipeCard ({id, title, image, diets}) {
    return (
        <div className ='card' style={style}>
            <Link to={`/home/recipe/${id}`} style={{ textDecoration: 'none' }}>
            <img style={style} src={image} alt='no-image'/>
            
            <div className='container-text' style={style}>
                <h5 style={style}>{title}</h5>
                {id.toString().includes('-') 
                    ? diets.map((diet, index) => {return (<p style={style} key={index}>{diet.name}</p>)})
                    : diets.map((diet, index) => {return (<p style={style} key={index}>{diet}</p>)})                
                }
            </div>
            </Link>
        </div>
    );
}