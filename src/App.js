import React, { useEffect, useState } from "react";
import RecipeArticle from "./component_recipe_article";
import './App.css';

const App = () => {
  // State
  const [recipesArray, setRecipes] = useState([]);//[{...}, {...}, {...}]
  const [search, setSearch] = useState("");
  const [finalQuery, setFinalQuery] = useState("Chicken");

  // API (Edamam: Recipe Search API) ID & KEY
  const APP_ID = "0b0f85a2";
  const APP_KEY = "2708ae27c2a5deb8c02161ac84d1c262";
  const requestAPI = `https://api.edamam.com/api/recipes/v2?type=public&q=${finalQuery}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  // React Hook
  // To Make The Request From The API
  // "useEffect" Function Is Called Everytime Page Loads, And Everytime Page Re-Renders
  // With The Empty Array [] Will Just Be Called Once When Loading
  // Alternatively Adding [counter] To The Array Will Run The Function When "counter" Changes As Well
  useEffect(() => {
    getRecipes();
    console.log("Fetching New Recipes! After Submiting Form");
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalQuery]);//Runs only when we click on the submit button

  // Fetching All Of Our Data (Promise: Some Data That Doesn't Come Back Instantly (Any External Request That You Are Fetching) (D.E))
  const getRecipes = async () => {
    // This Is A Response // This Won't Arrive Instantly, So We Have To "await" It
    const response = await fetch(requestAPI);//Request/Fetch

    // Once The Response Comes Back We Create A JSON Out Of It
    // Adding "json.()" Method On Top Of It, Will Format It In A Way That We Can Work Very Easily With The Data (D.E)
    const dataJson = await response.json();
    //console.log(dataJson);

    // Setting Data Into State Above (Into "recipesArray")
    setRecipes(dataJson.hits);
    console.log(dataJson.hits);
  };

  // Setting "search" Variable On Input Change To Current Value Of The Input
  const updateSearch = e => {
    setSearch(e.target.value);
    //console.log(search);//e.target.value
  };
  
  // Adds Final Search On Form Submition
  const finalSearch = e => {
    e.preventDefault();//Prevent Default Form Submition
    setFinalQuery(search);
    setSearch("");//Setting Back To Empty String, After Fetching
  };

  return (
    <main className="App">
      <form className="search-form" onSubmit={ finalSearch }>
        <input className="search-input" type="text" name="" value={ search } onChange={ updateSearch }/>
        <button className="search-button" type="submit">{/*onClick={finalSearch}*/}
          Search
        </button>
      </form>

      <div className="recipes">
        {/*Similar To Doing A Forloop In Liquid Code, To Print Some Stuff Dynamically Various Times*/}
        {recipesArray.map(x => {
          return (
            <RecipeArticle
              key={ x.recipe.label + x.recipe.image }//Want To Make A Count Or Print Index, But For Now This Does The Job
              title={ x.recipe.label }
              calories={ x.recipe.calories }
              image={ x.recipe.image }
              diet={ x.recipe.dietLabels }
              ingredients={ x.recipe.ingredients }
            />
          )
        })}
      </div>
    </main>
  )
};

export default App;