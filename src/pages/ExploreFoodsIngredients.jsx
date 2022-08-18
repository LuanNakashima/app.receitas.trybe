import React, { useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Context from '../Context/Context';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFoodsIngredients() {
  const { ingredientsList, setIngredientsList,
    setIngreOn, ingreOn, setIngreList, ingreList } = useContext(Context);

  useEffect(() => {
    (async () => {
      const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
      const cardLimit = 12;
      const response = await fetch(URL);
      const { meals } = await response.json();
      const ingredient12 = meals.slice(0, cardLimit);
      setIngredientsList(ingredient12);
    })();
    setIngreOn(true);
  }, [setIngredientsList, setIngreOn]);

  const { history } = useHistory();

  useEffect(() => {
    if (ingreOn && ingredientsList && ingreList) {
      history.push('/foods');
    }
  }, [ingreOn, ingredientsList, history, ingreList]);

  const setNewFilter = async (ingredient) => {
    const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;

    const response = await fetch(URL);
    const data = await response.json();
    setIngreList(data);
  };

  return (
    <div>
      <Header showIcon={ false } titleHeader="Explore Ingredients" />
      <div
        className="ingredient-card"
      >
        { ingredientsList ? (
          ingredientsList.map((ingredient, index) => (
            <div
              className="ingredient"
              key={ ingredient.idIngredient }
            >
              <Link
                className="link-to-ingredient"
                to="/foods"
                onClick={ () => {
                  setNewFilter(ingredient.strIngredient);
                } }
              >
                <div
                  data-testid={ `${index}-ingredient-card` }
                >
                  <img
                    className="ingredient-img"
                    src={ `https://www.themealdb.com/images/ingredients/${ingredientsList[index].strIngredient}-Small.png` }
                    alt={ ingredient.strIngredient }
                    data-testid={ `${index}-card-img` }
                  />
                </div>
              </Link>
              <p data-testid={ `${index}-card-name` }>{ ingredient.strIngredient }</p>
            </div>

          ))
        ) : undefined }
      </div>
      <Footer />
    </div>
  );
}

export default ExploreFoodsIngredients;
