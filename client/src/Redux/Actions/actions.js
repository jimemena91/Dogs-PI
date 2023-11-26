import axios from "axios";
import {
  FILTER,
  FILTER_BY_ORIGIN,
  GET_DOGS,
  GET_DOGS_NAME,
  GET_DOG_DETAIL,
  GET_TEMPERAMENTS,
  ORDER,
  ORDER_BY_WEIGHT,
  PAGINATE,
  POST_DOG_SUCCESS,
  POST_DOG_FAILURE,
  GET_TEMPERAMENTS_FAILURE,
  REMOVE_TEMPERAMENT,
} from "./actions-types";

export function getTemperaments() {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/dogs/temperaments/");
      dispatch({ type: GET_TEMPERAMENTS, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_TEMPERAMENTS_FAILURE, payload: error.message });
    }
  };
}
export const removeTemperament = (temperamentToRemove) => {
  return {
    type: REMOVE_TEMPERAMENT,
    payload: { name: temperamentToRemove }, // Wrap the payload in an object with "name" property
  };
};

export function postDog(state) {
  return async function (dispatch) {
    try {
      await axios.post("http://localhost:3001/dogs/", state);
      dispatch({ type: POST_DOG_SUCCESS });
      alert("Dog creado exitosamente");
    } catch (error) {
      dispatch({ type: POST_DOG_FAILURE, payload: error.message });
      alert(error.response?.data?.error || "Hubo un error al crear el perro.");
    }
  };
}
export function getDogs() {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/dogs/");
      dispatch({ type: GET_DOGS, payload: response.data });
      
      // Disparar la acción de paginación inicial
      dispatch(paginateDogsAction(0));
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.error);
      } else {
        alert("Hubo un error obteniendo los perros.");
      }
    }
  };
}
export function paginateDogsAction(pageNumber) {
  return async function (dispatch) {
    try {
      dispatch({ type: PAGINATE, payload: pageNumber });
    } catch (error) {
      alert("Hubo un error paginando los perros.");
    }
  };
}
export function filterDogsAction(temperaments) {
  return async function (dispatch) {
    try {
      dispatch({
        type: FILTER,
        payload: Array.isArray(temperaments) ? temperaments : [temperaments], // Asegúrate de que el payload sea siempre un array
      });
    } catch (error) {
      alert("Hubo un error filtrando los perros.");
      
        }
  };
  }

  export function filterOriginAction(origin) {
    return async function (dispatch) {
      try {
        
        dispatch({
          type: FILTER_BY_ORIGIN,
          payload: origin,
        });
      } catch (error) {
        alert('Hubo un error filtrando los perros por origen.');
        
      }
    };
  }

export const orderDogsAction = (orderType, orderCategory) => {
  return async function (dispatch) {
    try {
      if (orderCategory === "orderByName") {
        dispatch({ type: ORDER, payload: orderType });
      } else if (orderCategory === "orderByWeight") {
        dispatch({ type: ORDER_BY_WEIGHT, payload: orderType });
      }
    } catch (error) {
      alert("Hubo un error ordenando los perros.");
    }
  };
};

export function getDog(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/dogs/${id}`);
      const isFromApi = !isNaN(Number(response.data.id));

      // Ajusta la propiedad createInDb según la procedencia del perro
      const dogWithCreateInDb = {
        ...response.data,
        createInDb: !isFromApi,
      };

      dispatch({ type: GET_DOG_DETAIL, payload: dogWithCreateInDb });
    } catch (error) {
      alert("Hubo un error al obtener el detalle del perro.");
    }
  };
}
export function getNameDogs(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/dogs?name=${name}`
      );
      dispatch({ type: GET_DOGS_NAME, payload: response.data });
    } catch (error) {
      alert("Hubo un error al obtener el nombre del perro.");
    }
  };
}
