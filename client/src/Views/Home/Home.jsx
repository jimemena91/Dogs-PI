import React, { useEffect, useState } from "react";
import CardsContainer from "../../Components/CardsContainer/CardsContainer";
import {
  filterDogsAction,
  getDogs,
  getTemperaments,
  orderDogsAction,
  paginateDogsAction,
  filterOriginAction
} from "../../Redux/Actions/actions";
import { useDispatch, useSelector } from "react-redux";
import style from "./Home.module.css";

export const Home = () => {
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

  const paginate = (pageNumber) => {
    dispatch(paginateDogsAction(pageNumber));
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
      paginate(0);
    }
  };

  const removeSelectedTemperament = (temperamentToRemove) => {
    const updatedTemperaments = selectedTemperaments.filter(
      (temp) => temp !== temperamentToRemove
    );

    setSelectedTemperaments(updatedTemperaments);
    dispatch(filterDogsAction(updatedTemperaments));
  };

  const filterByOrigin = (event) => {
    const selectedOrigin = event.target.value;
    dispatch(filterOriginAction(selectedOrigin));
    paginate(0);
  };

  const orderDogs = (event) => {
    const orderType = event.target.value;
    const orderCategory = event.target.name;

    if (orderCategory === "orderByName" || orderCategory === "orderByWeight") {
      dispatch(orderDogsAction(orderType, orderCategory));
      paginate(0);
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(getDogs());
    dispatch(filterDogsAction([]));
  };
  return (
    <div className={style.homeContainer}>
      <div className={style.filtersContainer}>
        <div className={style.filtersBackground}></div>
        <div className={style.paginationSection}>
          <button
            className={style.paginationButton}
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 0}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => paginate(page - 1)}
                disabled={currentPage === page - 1}
                className={currentPage === page - 1 ? style.activePage : ""}
              >
                {page}
              </button>
            )
          )}

          <button
            className={style.paginationButton}
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
          >
            Next
          </button>
        </div>
        <div className={style.filtersSection}>
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
          <span>
            Temperamentos seleccionados: {selectedTemperaments.join(", ")}
          </span>
          <select onChange={filterDogs} name="temperaments">
            {allTemperaments.map((temp) => (
              <option key={temp} value={temp}>
                {temp}
              </option>
            ))}
          </select>
          {selectedTemperaments.map((temp) => (
            <button
              key={temp}
              onClick={() => removeSelectedTemperament(temp)}
              className={style.selectedTemperament}
            >
              X {temp}
            </button>
          ))}
          <span>Filtrado por origen:</span>
          <select onChange={filterByOrigin} name="origin">
            <option value="all">Todos los perros</option>
            <option value="api">Perros de la API</option>
            <option value="db">Perros de la Base de Datos</option>
          </select>
        </div>

        <button
          className={style.resetButton}
          onClick={(event) => {
            handleClick(event);
          }}
        >
          RESET DOGS
        </button>
      </div>
      <CardsContainer allDogs={allDogs} />
    </div>
  );
};

export default Home