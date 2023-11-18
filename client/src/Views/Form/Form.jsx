import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./form.module.css";
import { getTemperaments, postDog } from "../../Redux/Actions/actions";

const Form = () => {
  const dispatch = useDispatch();

  const allTemperaments = useSelector((state) => state.allTemperaments);

  useEffect(() => {
    console.log("Estado incial:", state)
    dispatch(getTemperaments());
console.log("Estado despues de obtener temperamentos:", state)
    return () => {};
  }, []);

  //const defaultImage = "https://img.freepik.com/fotos-premium/perro-bufanda-colorida-gafas-sol_901003-3478.jpg?size=626&ext=jpg&ga=GA1.1.1518270500.1698278400&semt=ais"

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
    image: "Image requeria",
    height_min: "height_min requerido",
    height_max: "height_max requerido",
    weight_min: "weight_min requerido",
    weight_max: "weight_max requerido",
    life_span_min: "life_span_min requerido",
    life_span_max: "life_span_max",
    temperaments: "",
  });

  const validate = (state, name) => {
    switch (name) {
      case "name":
        if (state.name === "") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            name: "Campo requerido",
          }));
        } else if (state.name.length < 5) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            name: "Debe tener al menos 5 caracteres",
          }));
        } else if (state.name.length > 10) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            name: "No debe superar los 10 caracteres",
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
        }
        break;

      case "image":
        const imgPattern = /^http(s)?:\/\/.+\..+/;
        if (state.image === "") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            image: "Campo requerido",
          }));
        } else if (!imgPattern.test(state.image)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            image: "URL de imagen inválida",
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, image: "" }));
        }
        break;

      case "height_min":
      case "height_max":
      case "weight_min":
      case "weight_max":
        const isDecimal = /^\d*\.?\d+$/; // Expresión regular para números decimales

        if (state[name] === "") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "Campo requerido",
          }));
        } else if (!isDecimal.test(state[name])) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "Debe ser un número decimal",
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
        }
        break;

      case "life_span_min":
      case "life_span_max":
        const isInteger = /^\d+$/; // Expresión regular para números enteros

        if (state[name] === "") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "Campo requerido",
          }));
        } else if (!isInteger.test(state[name])) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "Debe ser un número entero",
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
        }
        break;
      case "temperaments":
        if (state.temperaments.length === 0) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            temperaments: "Selecciona al menos un temperamento",
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, temperaments: "" }));
        }
        break;
      default:
        break;
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
  
    if (name === "temperaments") {
      const selectedTemperament = allTemperaments.find(temp => temp === value);
      console.log("Selected Temperament:", selectedTemperament);
  
      if (selectedTemperament && !state.temperaments.includes(selectedTemperament)) {
        console.log("Temperaments Before Add:", state.temperaments);
        setState(prevState => ({
          ...prevState,
          temperaments: [...prevState.temperaments, selectedTemperament],
        }));
        console.log("Temperaments After Add:", [...state.temperaments, selectedTemperament]);
        validate({ ...state, temperaments: [...state.temperaments, selectedTemperament] }, "temperaments");
      }
    } else {
      setState({
        ...state,
        [name]: value,
        createInDb: true,
      });
      validate({ ...state, [name]: value }, name);
    }
  };
  
  
  

  const disabledFunction = () => {
    let disabledAux = true
    for (let error in errors) {
      if (errors[error] === "") disabledAux = false;
      else {
        disabledAux = true;
        break;
      }
    }
    return disabledAux;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newState = { ...state, createInDb: true };
  
    dispatch(postDog(newState));
  };


  return (
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
  );
};

export default Form;
