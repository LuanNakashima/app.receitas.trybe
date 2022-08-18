# APP DE RECEITAS!
#### Um projeto Trybe

O projeto App de Receitas, é sem dúvidas um dos maiores e mais desafiadores projetos que já trabalhei, tanto pela dimensão dele, com mais de 20 páginas e componentes no total, utilizandos duas APIs, tanto por ser o meu primeiro grande projeto em grupo. Fiquei responsável pela parte da renderização da maioria dos componentes e consumir as APIs.

A ideia do projeto, é ser um app de receitas mobile, que mostra receitas de pratos e drinks, com a lista de ingredientes, modo de prepraro e vídeo.

As principais tecnologias utilizadas foram HTML, CSS, JavaScript e React(Context API).

import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useHistory, Link } from 'react-router-dom';
import ListFood from './ListFood';
import ShareIcon from '../images/shareIcon.svg';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import '../CSS/ProgressFood.css'

import Context from '../Context/Context';

import { btnFavLocal, getLocalFav,
  deleteLocalFav, SetLocalDoneRecipes } from '../Helpers';

function ProgressFood() {
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

  const fetchFood = useCallback(async () => {
    const ids = window.location.pathname.split('/');
    const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ids[2]}`;
    const response = await fetch(URL);
    const data = await response.json();
    const { meals } = data;
    setFoodProgress(meals[0]);
    setFoodDetail(data);
  }, []);

  const foodItem = foodDetail ? foodDetail.meals[0] : [];
  console.log(foodItem);

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
    fetchFood();
    btnFavLocal(ids[2], setFavStatus);
  }, [fetchFood]);

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
        <ListFood
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
      id: foodItem.idMeal,
      type: 'food',
      nationality: foodI