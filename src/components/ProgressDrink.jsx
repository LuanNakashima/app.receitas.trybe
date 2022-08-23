import React, { useEffect, useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import ListDrink from './ListDrink';
import ShareIcon from '../images/shareIcon.svg';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import '../CSS/ProgressFood.css';

import Context from '../Context/Context';

import { btnFavLocal, getLocalFav,
  deleteLocalFav, SetLocalDoneRecipes } from '../Helpers';

function ProgressDrink() {
  const [foodDetail, setFoodDetail] = useState();
  const [foodProgress, setFoodProgress] = useState();
  const [copied, setCopied] = useState(false);
  const [favStatus, setFavStatus] = useState(false);

  const {
    setTotalIngre,
    finishBtnDisabled,
  } = useContext(Context);

  const history = useHistory();
  const { location } = history;
  const { pathname } = location;
  const id = pathname.split('/');

  const foodItem = foodDetail ? foodDetail.drinks[0] : [];
  console.log(foodItem);

  const list = {
    id: foodItem.idDrink,
    type: 'drink',
    nationality: '',
    category: foodItem.strCategory,
    alcoholicOrNot: foodItem.strAlcoholic,
    name: foodItem.strDrink,
    image: foodItem.strDrinkThumb,
  };

  useEffect(() => {
    const ids = window.location.pathname.split('/');
    (async () => {
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ids[2]}`;
      const response = await fetch(URL);
      const data = await response.json();
      const { drinks } = data;
      setFoodProgress(drinks[0]);
      setFoodDetail(data);
    })();
    btnFavLocal(ids[2], setFavStatus);
  }, []);

  const renderIngredients = () => {
    const ingredient = Object.entries(foodProgress).filter(([key, values]) => key
      .includes('strIngredient')
      && typeof values === 'string' && values !== '' && values !== ' ');

    const measure = Object.entries(foodProgress).filter(([key, values]) => key
      .includes('strMeasure')
      && typeof values === 'string' && values !== '' && values !== ' ');

    const ingre = ingredient.map((a) => a.splice(1));

    const meas = measure.map((a) => a.splice(1));

    ingre.forEach((b, index) => {
      b.push(meas[index][0]);
    });

    setTotalIngre(ingre.length);

    const verificCheck = (param) => {
      const local = localStorage.getItem('inProgressRecipes');
      if (local) {
        return local.includes(param);
      }
    };

    return (
      ingre.map((value, index) => (
        <ListDrink
          key={ value[0] }
          value={ value }
          index={ index }
          isChecked={ verificCheck(value[0]) }
        />))
    );
  };

  const copyFunc = (param) => {
    navigator.clipboard.writeText(param);
    setCopied(true);
  };

  const favButton = () => {
    setFavStatus(!favStatus);
    if (!favStatus) {
      getLocalFav(list);
      console.log('mandou pro local');
    } else {
      deleteLocalFav(id[2]);
      console.log('apagar do local');
    }
  };

  const doneLocal = () => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    today = `${mm}/${dd}/${yyyy}`;

    return {
      id: foodItem.idDrink,
      type: 'drink',
      nationality: '',
      category: foodItem.strCategory,
      alcoholicOrNot: foodItem.strAlcoholic,
      name: foodItem.strDrink,
      image: foodItem.strDrinkThumb,
      doneDate: today,
      tags: foodItem.strTags,
    };
  };

  return (
    foodProgress ? (
      <main className="progressDiv">
        <img
          data-testid="recipe-photo"
          className="imgFood"
          src={ foodProgress.strDrinkThumb }
          alt="food"
        />

        <h1 data-testid="recipe-title">{foodProgress.strDrink}</h1>

        <div className="btn-recipe-progress">
          <button
            data-testid="share-btn"
            className="btnDetail"
            type="button"
            onClick={ () => { copyFunc(`http://localhost:3000/drinks/${id[2]}`); } }
          >
            <img src={ ShareIcon } alt="share-btn" />
          </button>

          <button
            className="btnDetail"
            type="button"
            onClick={ favButton }
          >
            <img
              data-testid="favorite-btn"
              src={ favStatus ? BlackHeartIcon : WhiteHeartIcon }
              alt="fav-icon"
            />
          </button>
        </div>

        { copied ? <p>Link copied!</p> : undefined}

        <h3 data-testid="recipe-category">{foodProgress.strCategory}</h3>

        <div className='details'>
          <h5>Ingredients</h5>

          <ul>
            {renderIngredients()}
          </ul>

          <h3>instructions</h3>

          <p data-testid="instructions" className="instructions">
            {foodProgress.strInstructions}
          </p>
        </div>

          <Link to="/done-recipes">
            <button
              data-testid="finish-recipe-btn"
              className='start-recipe-btn'
              type="button"
              disabled={ !finishBtnDisabled }
              onClick={ () => { SetLocalDoneRecipes(doneLocal()); } }
            >
              Finish Recipe
            </button>
          </Link>
      </main>
    ) : (<p>Loading</p>)
  );
}

export default ProgressDrink;
