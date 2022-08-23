import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../Context/Context';

function ShowIngreList() {
  const {
    ingreList,
  } = useContext(Context);

  const renderFood = () => {
    if (ingreList) {
      try {
        console.log(ingreList);
        const doze = 12;
        const { meals } = ingreList;
        console.log(meals);
        const all12 = meals.slice(0, doze);
        console.log(all12);
        return (
          all12.map((recipe, index) => (
            <div
              className="card"
              data-testid={ `${index}-recipe-card` }
              key={ recipe.strMeal }
            >
              <Link
                className="cardLink"
                to={ `/foods/${recipe.idMeal}` }
              >
                <img
                  className="cardImg"
                  data-testid={ `${index}-card-img` }
                  src={ recipe.strMealThumb }
                  alt={ recipe.strMeal }
                />

                <p
                  data-testid={ `${index}-card-name` }
                >
                  { recipe.strMeal }
                </p>
              </Link>
            </div>
          ))
        );
      } catch (error) {
        const doze = 12;
        const { drinks } = ingreList;
        const all12 = drinks.slice(0, doze);
        return (
          all12.map((recipe, index) => (
            <div
              className="card"
              data-testid={ `${index}-recipe-card` }
              key={ recipe.strDrink }
            >
              <Link
                className="cardLink"
                to={ `/foods/${recipe.idDrink}` }
              >
                <img
                  className="cardImg"
                  data-testid={ `${index}-card-img` }
                  src={ recipe.strDrinkThumb }
                  alt={ recipe.strDrink }
                />

                <p
                  data-testid={ `${index}-card-name` }
                >
                  { recipe.strDrink }
                </p>
              </Link>
            </div>
          ))
        );
      }
    }
    return <p>a</p>;
  };

  return (
    <div className="main ingreMain">{ renderFood() }</div>
  );
}

export default ShowIngreList;
