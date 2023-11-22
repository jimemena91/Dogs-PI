import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./form.module.css";
import { getTemperaments, postDog } from "../../Redux/Actions/actions";
import { validateName, validateImage, validateDecimal, validateInteger, validateTemperaments } from "./validationUtils";

const Form = () => {
  const dispatch = useDispatch();

  const allTemperaments = useSelector((state) => state.allTemperaments);

  useEffect(() => {
    dispatch(getTemperaments());

    return () => {};
  }, []);

  const [state, setState] = useState({
    name: "",
    image: "",
    height_min: 0,
    height_max: 0,
    weight_min: 0,
    weight_max: 0,
    life_span_min: 0,
    life_span_max: 0,
    temperaments: [],
    createInDb: true,
  });

  const [errors, setErrors] = useState({
    name: "Name requerido",
    image: "Image requerido",
    height_min: "height_min requerido",
    height_max: "height_max requerido",
    weight_min: "weight_min requerido",
    weight_max: "weight_max requerido",
    life_span_min: "life_span_min requerido",
    life_span_max: "life_span_max requerido",
    temperaments: "Debe seleccionar al menos 1 temperamento",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "name":
        setErrors((prevErrors) => ({ ...prevErrors, name: validateName(value) }));
        break;
      case "image":
        setErrors((prevErrors) => ({ ...prevErrors, image: validateImage(value) }));
        break;
      case "height_min":
      case "height_max":
      case "weight_min":
      case "weight_max":
        setErrors((prevErrors) => ({ ...prevErrors, [name]: validateDecimal(value, name) }));
        break;
      case "life_span_min":
      case "life_span_max":
        setErrors((prevErrors) => ({ ...prevErrors, [name]: validateInteger(value, name) }));
        break;
      case "temperaments":
        setErrors((prevErrors) => ({ ...prevErrors, temperaments: validateTemperaments(value) }));
        break;
      default:
        break;
    }

    if (name === "temperaments") {
      const selectedTemperament = allTemperaments.find((temp) => temp === value);

      if (selectedTemperament && !state.temperaments.includes(selectedTemperament)) {
        setState((prevState) => ({
          ...prevState,
          temperaments: [...prevState.temperaments, selectedTemperament],
        }));
      }
    } else {
      setState({
        ...state,
        [name]: value,
        createInDb: true,
      });
    }
  };

  const disabledFunction = () => {
    for (let error in errors) {
      if (errors[error] !== "") {
        return true;
      }
    }
  
    // Ahora, también verifica el estado de los campos para deshabilitar el botón si no son válidos
    for (let field in state) {
      if (state[field] === "" || state[field] === 0) {
        return true;
      }
    }
  
    return false;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newState = { ...state, createInDb: true };
    dispatch(postDog(newState));
  };

  return (
    <div className={style.formPage}>
    <div className={style.formCont}>
      <form onSubmit={handleSubmit} className={style.formStyles}>
        <label>Name: </label>
        <input name="name" onChange={handleChange} type="text" />
        <div>
          <p className={style.errorText}>{errors.name}</p>
        </div>
        <label>Image: </label>
        <input
          name="image"
          value={state.image}
          onChange={handleChange}
          type="text"
        />
        <div>
          <p className={style.errorText}>{errors.image}</p>
        </div>
        <label>Height_min: </label>
        <input name="height_min" onChange={handleChange} type="text" />
        <div>
          <p className={style.errorText}>{errors.height_min}</p>
        </div>
        <label>Height_max: </label>
        <input name="height_max" onChange={handleChange} type="text" />
        <div>
          <p className={style.errorText}>{errors.height_max}</p>
        </div>
        <label>Weight_min: </label>
        <input name="weight_min" onChange={handleChange} type="text" />
        <div>
          <p className={style.errorText}>{errors.weight_min}</p>
        </div>
        <label>Weight_max: </label>
        <input name="weight_max" onChange={handleChange} type="text" />
        <div>
          <p className={style.errorText}>{errors.weight_max}</p>
        </div>
        <label>Life_span_min: </label>
        <input name="life_span_min" onChange={handleChange} type="text" />
        <div>
          <p className={style.errorText}>{errors.life_span_min}</p>
        </div>
        <label>Life_span_max: </label>
        <input name="life_span_max" onChange={handleChange} type="text" />
        <div>
          <p className={style.errorText}>{errors.life_span_max}</p>
        </div>
        <label>Temperaments: </label>
        <select onChange={handleChange} name="temperaments">
          {allTemperaments.map((temp) => (
            <option key={temp} value={temp}>
              {temp}
            </option>
          ))}
        </select>
        <div>
          {state.temperaments.map((temp) => (
            <span className={style.selectedTemp}>{temp}/</span>
          ))}
        </div>
        <div>
          <p className={style.errorText}>{errors.temperaments}</p>
        </div>
        <input
          disabled={disabledFunction()}
          type="submit"
          className={style.submitButton}
        />
      </form>
    </div>
    </div>
  );
};

export default Form;
