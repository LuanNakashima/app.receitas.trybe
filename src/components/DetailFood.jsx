import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ShareIcon from '../images/shareIcon.svg';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import Carousel from 'react-elastic-carousel';
import '../CSS/DetailFood.css'

import { renderIngredients,
  renderFootBtn, btnFavLocal, getLocalFav,
  deleteLocalFav, localDoneRecipes, localInProgress } from '../Helpers';

function DetailFood() {
  const [foodDetail, setFoodDetail] = useState();
  const [recomFood, setRecomFood] = useState();
  const [done, setDone] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [copied, setCopied] = useState(false);
  const [favStatus, setFavStatus] = useState(false);

  const history = useHistory();
  const { location } = history;
  const { pathname } = location;
  const id = pathname.split('/');

  const foodItem = foodDetail ? foodDetail.meals[0] : [];

  const list = {
    id: foodItem.idMeal,
    type: 'food',
    nationality: foodItem.strArea,
    category: foodItem.strCategory,
    alcoholicOrNot: '',
    name: foodItem.strMeal,
    image: foodItem.strMealThumb,
  };

  useEffect(() => {
    const ids = window.location.pathname.split('/');
    (async () => {
      const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ids[2]}`;
      const response = await fetch(URL);
      const data = await response.json();
      setFoodDetail(data);
    })();
    btnFavLocal(ids[2], setFavStatus);
  }, []);

  useEffect(() => {
    const ids = window.location.pathname.split('/');
    (async () => {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const six = 6;
      const response = await fetch(url);
      const { drinks } = await response.json();
      const all = drinks.slice(0, six);
      setRecomFood(all);
    })();

    localDoneRecipes(ids[2], setDone);
    localInProgress(ids[2], setInProgress);
  }, []);

  const renderCarousel = () => {
    if (recomFood) {
      return (
        <Carousel className="carousel">
          { recomFood.map((a, index) => (
            <div
              className="divCarousel"
              key={ index }
              data-testid={ `${index}-recomendation-card` }
            >
              <img className="imgCarousel" src={ a.strDrinkThumb } alt={ a.strDrink } />

              <p className="pCarousel">{ a.strCategory }</p>

              <h4
                data-testid={ `${index}-recomendation-title` }
                className="h4Carousel"
              >
                { a.strDrink }
              </h4>
            </div>
          )) }
        </Carousel>
      );
    }
  };

  const renderVideo = (param) => {
    const url = param.replace('watch', 'embed').replace('?v=', '/')
      .replace('youtube', 'youtube-nocookie');
    return (
      <iframe
        width="350"
        height="350"
        src={ url }
        title="video"
        data-testid="video"
        className="video"
      />
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
    } else {
      deleteLocalFav(id[2]);
    }
  };

  return (
    <>
      {foodDetail
        ? ( // true
          <>
            <main className="detailMain">
              <img
                data-testid="recipe-photo"
                className="imgFood"
                src={ foodItem.strMealThumb }
                alt="food"
              />

              <h1 data-testid="recipe-title">{foodItem.strMeal}</h1>

              <div className="btnsDetail">
                <button
                  className="btnDetail"
                  data-testid="share-btn"
                  type="button"
                  onClick={ () => { copyFunc(`http://localhost:3000/foods/${id[2]}`); } }
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

              <div className="details">
                <h3 data-testid="recipe-category">{`${foodItem.strCategory} Food`}</h3>

                <h5>Ingredients</h5>

                <ul>
                  {renderIngredients(foodItem)}
                </ul>

                <h3>Instructions</h3>

                <p data-testid="instructions" className="instructions">
                  {foodItem.strInstructions}
                </p>
              </div>

              {renderVideo(foodItem.strYoutube)}

              {renderCarousel()}

              <footer className="btnDiv">
                { renderFootBtn(done, id[2], inProgress, 'foods') }
              </footer>
            </main>
          </>
        ) : (
          <main>loading</main>
        )}
    </>
  );
}

export default DetailFood;
