import React, { useEffect, useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../Context/Context';

function ExploreDrinksIngredients() {
  const [ingredients, setIngredients] = useState();

  const {
    setIngreOn, ingreOn, ingreList, setIngreList } = useContext(Context);

  const getIngredientsIMG = async () => {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    const cardLimit = 12;
    const response = await fetch(URL);
    const { drinks } = await response.json();
    const ingredient12 = drinks.slice(0, cardLimit);
    setIngredients(ingredient12);
  };

  useEffect(() => {
    getIngredientsIMG();
    setIngreOn(true);
  }, [setIngreOn]);

  const { history } = useHistory();

  useEffect(() => {
    if (ingreOn && ingreList) {
      history.push('/foods');
    }
  }, [ingreOn, history, ingreList]);

  const setNewFilter = async (ingredient) => {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;

    const response = await fetch(URL);
    const data = await response.json();
    setIngreList(data);
  };

  return (
    <>
      <Header showIcon={ false } titleHeader="Explore Ingredients" />
      <div className="drinkNatMain">
        { ingredients ? (
          ingredients.map((ingredient, index) => (
            <div
              key={ ingredient.strIngredient1 }
              className="card"
            >
              <Link
              to="/foods"
              className="cardLink"
              onClick={ () => { setNewFilter(ingredient.strIngredient1); } }
              >
                <img
                  src={ `https://www.thecocktaildb.com/images/ingredients/${ingredients[index].strIngredient1}-Small.png` }
                  alt={ ingredient.strIngredient1 }
                  data-testid={ `${index}-card-img` }
                  className="cardImg"
                />
                <p data-testid={ `${index}-card-name` }>{ ingredient.strIngredient1 }</p>
              </Link>
            </div>
          ))
        ) : undefined }
      </div>
      <Footer />
    </>
  );
}

export default ExploreDrinksIngredients;
