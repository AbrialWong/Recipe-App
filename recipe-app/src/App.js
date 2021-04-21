import React, { useState } from "react";
import Axios from "axios";
import {v4 as uuidv4} from "uuid";
import "./App.css";
import Recipe from "./components/Recipes.js";
import Alert from "./components/Alert.js";

const App = () => {
  const [query, setQuery] = useState("");
  const [recipes,setRecipes] = useState([]);
  const [alert, SetAlert] = useState("");
  
  const APP_ID = "b7fa0073";
  const APP_KEY = "9857252449dae75a0623987e291e8a0a";
 
  const url = `https://api.edamam.com/search?q=
  ${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async () => {
      if(query !== ""){
        const result = await Axios.get(url);
        if(!result.data.more){
            return SetAlert("No food with such name");
        }
        setRecipes(result.data.hits);
        console.log(result);
        SetAlert("");
        setQuery("");
      }else{
         SetAlert("Please fill up the form");
      }
    
  };

  const onSubmit = (e) => {
    e.preventDefault(); // prevent the page from reload when you click on the submit button.
    getData();
  };

  const onChange=(e)=>{
      setQuery(e.target.value);
  }

  return (
    <div className="App">
      <h1 onClick={getData}>Recipe Searching App</h1>
      <form className="search-form" onSubmit={onSubmit}>
      {alert !== "" && <Alert alert={alert}/>}
        <input type="text" placeholder="Search Recipe" autoComplete="off" onChange={onChange} value={query}/>
        <input type="submit" value="search" />
      </form>
      <div className="recipes">
          {recipes !== [] && recipes.map(recipe =>
          <Recipe key={uuidv4} recipe={recipe} />)}
      </div>
    </div>
  );
};

export default App;
