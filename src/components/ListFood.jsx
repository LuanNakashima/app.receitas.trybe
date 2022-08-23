import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../Context/Context';

function ListFood({ index, value, isChecked }) {
  const [verific, setVerific] = useState(isChecked);

  const {
    totalIngre,
    setFinishBtnDisabled,
  } = useContext(Context);

  const history = useHistory();
  const { location } = history;
  const { pathname } = location;
  const id = pathname.split('/');

  let ingredientLocal = {
    cocktails: {},
    meals: {
      [id[2]]: [],
    },
  };

  const checkBoxFunc = ({ target }, check) => {
    setVerific(!verific);
    if (target.checked) {
      const local = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (local && local.meals[id[2]]) {
        const { meals } = local;
        const a = [...meals[id[2]], check];
        local.meals[id[2]] = a;
        localStorage.setItem('inProgressRecipes', JSON.stringify(local));
      } else if (local) {
        ingredientLocal = local;
        ingredientLocal.meals[id[2]] = [check];
        localStorage.setItem('inProgressRecipes', JSON.stringify(ingredientLocal));
      } else {
        ingredientLocal.meals[id[2]] = [check];
        localStorage.setItem('inProgressRecipes', JSON.stringify(ingredientLocal));
      }
    } else {
      const local = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const localRemoved = local.meals[id[2]].filter((a) => a !== check);
      local.meals[id[2]] = localRemoved;
      localStorage.setItem('inProgressRecipes', JSON.stringify(local));
    }
  };

  const disableBtn = () => {
    const localMeal = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (localMeal) {
      const done = localMeal.meals[id[2]];
      if (done.length === totalIngre) {
        setFinishBtnDisabled(true);
      }
    }
  };

  return (
    <label
      data-testid={ `${index}-ingredient-name-and-measure` }
      id="labelCheckBox"
      key={ index }
      htmlFor={ value[0] }
    >
      <li className="ingredientProgress" data-testid={ `${index}-ingredient-step` }>
        <input
          id={ value[0] }
          type="checkbox"
          value={ value[0] }
          onClick={ (param) => {
            checkBoxFunc(param, value[0]);
            disableBtn();
          } }
          checked={ verific }
        />
        <p>{ `${value[0]}: ${value[1]}` }</p>
      </li>
    </label>
  );
}

ListFood.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
};

export default ListFood;
