import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Landing from '../src/components/Landing/Landing';
import RecipeInfo from '../src/components/RecipeInfo/RecipeInfo';
import Create from '../src/components/Create/Create';
import Home from './components/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path='/' component={Landing}/>
        <Route exact path='/home' component={Home}/>
        <Route exact path='/create' component={Create}/>
        <Route path='/home/recipe/:id' component={RecipeInfo}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
