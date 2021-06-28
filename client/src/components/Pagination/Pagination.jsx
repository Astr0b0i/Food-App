import style from './Pagination.css';
import React from 'react';

export default function Pagination ({recipesPerPage, totalRecipes, paginate}){
    const pageNumbers = [];

    for(let i = 1; i<= Math.ceil(totalRecipes / recipesPerPage); i++){
        pageNumbers.push(i);
    }
    
    return (
        <div className='pagination' style={style}>
            {pageNumbers.map(number => {
                return(
                    <a onClick = {() => paginate(number)} key={number}>{number}</a>
                )
            })}
        </div>
    )
}