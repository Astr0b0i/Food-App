import { Link, BrowserRouter  } from 'react-router-dom';
import style from './Landing.css';
import React from 'react';

export default function Landing () {
    return (
            <div className='container-landing' style={style}>
                <div className='title'style={style}>
                    <h2 >Create recipes.<br/>
                        See recipes.<br/>
                        Learn recipes.</h2>
                    <Link to ='/home'>
                        <button className='button' name='home'>Home</button>
                    </Link>
                </div>

            </div>
    );
}