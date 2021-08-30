// Component Is Similar To A Partial In Jekyll, Creating An Article Partial Code

import React from "react";
import style from "./recipe.module.css";//Importing Css Module

// Similar To Doing A Forloop In Liquid Code (E.g. "for prop in RecipeArticle"), Then Printing "prop.something"
const RecipeArticle = ({title, calories, image, diet, ingredients}) => (
	<article className={ style.recipe_article }>
		<h1>{ title }</h1>{/*prop.title*/}
		<ol>
			{ingredients.map(x => (
				<li>{x.text}</li>
			))}
		</ol>
		<p>Calories: { calories }</p>
		<img className={ style.recipe_image } src={ image } alt={ `${title}` } aria-hidden="true"/>
		<em>{ diet }</em>
	</article>
);

export default RecipeArticle;