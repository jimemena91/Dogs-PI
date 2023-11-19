import React, { useEffect, useState } from "react";
import CardsContainer from "../../Components/CardsContainer/CardsContainer";
import {
  filterDogsAction,
  getDogs,
  getTemperaments,
  orderDogsAction,
  paginateDogs,
  filterOriginAction,
} from "../../Redux/Actions/actions";
import { useDispatch, useSelector } from "react-redux";

import style from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();

  const allDogs = useSelector((state) => state.allDogs);
  const allTemperaments = useSelector((state) => state.allTemperaments);
  const [selectedTemperaments, setSelectedTemperaments] = useState([]);
  const totalPages = useSelector((state) => state.totalPages);
  const currentPage = useSelector((state) => state.currentPage);

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, []);

  const paginate = (event) => {
    dispatch(paginateDogs(event.target.name, selectedTemperaments));
  };

  const filterDogs = (event) => {
    if (event.target.name === "temperaments") {
      const selectedTemperament = event.target.value;
      const updatedTemperaments = [
        ...selectedTemperaments,
        selectedTemperament,
      ];
      setSelectedTemperaments(updatedTemperaments);
      dispatch(filterDogsAction(updatedTemperaments));
    }
  };
  const removeSelectedTemperament = (temperamentToRemove) => {
    const updatedTemperaments = selectedTemperaments.filter(
      (temp) => temp !== temperamentToRemove
    );

    // Actualiza el estado local
    setSelectedTemperaments(updatedTemperaments);

    // Actualiza el estado global
    dispatch(filterDogsAction(updatedTemperaments));
  };

  const filterByOrigin = (event) => {
    const selectedOrigin = event.target.value;
    dispatch(filterOriginAction(selectedOrigin));
  };

  const orderDogs = (event) => {
    const orderType = event.target.value;
    const orderCategory = event.target.name;

    if (orderCategory === "orderByName" || orderCategory === "orderByWeight") {
      dispatch(orderDogsAction(orderType, orderCategory));
    }
  };

  //boton de reset de personajes
  const handleClick = (event) => {
    event.preventDefault();
    dispatch(getDogs()); // Restaura la lista de perros
    dispatch(filterDogsAction([])); // Limpia los filtros
  };
  return (
    <div className={style.homeContainer}>
      <div className={style.filtersContainer}>
        <div className={style.filtersBackground}></div>
        <div className={style.filtersSection}>
          <h4>Filtros/Ordenamientos:</h4>
          <span>Ordenamiento por nombre: </span>
          <select onClick={orderDogs} name="orderByName">
            <option value="AZ">A-Z</option>
            <option value="ZA">Z-A</option>
          </select>
          <span>Ordenamiento por peso: </span>
          <select onChange={orderDogs} name="orderByWeight">
            <option value="ASC">Menor a Mayor</option>
            <option value="DESC">Mayor a Menor</option>
          </select>
          <select onChange={filterDogs} name="temperaments">
            {allTemperaments.map((temp) => (
              <option key={temp} value={temp}>
                {temp}
              </option>
            ))}
          </select>
          <span>
            Temperamentos seleccionados: {selectedTemperaments.join(", ")}
          </span>
          {selectedTemperaments.map((temp) => (
            <button key={temp} onClick={() => removeSelectedTemperament(temp)}>
              X {temp}
            </button>
          ))}
          <select onChange={filterByOrigin} name="origin">
            <option value="all">Todos los perros</option>
            <option value="api">Perros de la API</option>
            <option value="db">Perros de la Base de Datos</option>
          </select>
        </div>
        <div className={style.paginationSection}>
          <h4>Paginado: </h4>
          <span>Página actual: {currentPage + 1}</span>
          <span>Total de páginas: {totalPages}</span>
          <button
            className={style.paginationButton}
            name="prev"
            onClick={paginate}
          >
            Prev
          </button>
          <button
            className={style.paginationButton}
            name="next"
            onClick={paginate}
          >
            Next
          </button>
          <button
            onClick={(event) => {
              handleClick(event);
            }}
          >
            RESET DOGS
          </button>
        </div>
      </div>
      <CardsContainer allDogs={allDogs} />
    </div>
  );
};

export default Home;
