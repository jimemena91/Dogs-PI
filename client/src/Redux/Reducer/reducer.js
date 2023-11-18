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
  REMOVE_TEMPERAMENT,
} from "../Actions/actions-types";

let initialState = {
  allDogs: [],
  allTemperaments: [],

  allDogsBackUp: [],
  dogDetail: {},
  currentPage: 0,
  dogsFiltered: [],
  selectedTemperaments: [],
  filter: false,

  totalPages: 0,
};

function filterDogsByTemperament(allDogs, temper) {
  return allDogs.filter((dog) => {
    if (dog.temperaments && Array.isArray(dog.temperaments)) {
      const formattedTemperaments = dog.temperaments.map((temp) =>
        temp.toLowerCase().trim()
      );
      const formattedTemper = temper.toLowerCase().trim();
      return formattedTemperaments.includes(formattedTemper);
    }
    return false;
  });
}

function rootReducer(state = initialState, action) {
  const ITEMS_PER_PAGE = 8;
  switch (action.type) {
    case GET_DOG_DETAIL:
      return {
        ...state,
        dogDetail: action.payload,
      };
    case GET_TEMPERAMENTS:
      return {
        ...state,
        allTemperaments: action.payload,
      };
    
    case GET_DOGS:
      console.log("Datos almacenados en el estado global:", action.payload);
      return {
        ...state,
        allDogs: [...action.payload].splice(0, ITEMS_PER_PAGE),
        allDogsBackUp: action.payload,
      };
  

    case GET_DOGS_NAME:
      return {
        ...state,
        allDogs: action.payload,
      };

    case PAGINATE:
      const totalPages = Math.ceil(
        state.filter
          ? state.dogsFiltered.length / ITEMS_PER_PAGE
          : state.allDogsBackUp.length / ITEMS_PER_PAGE
      );

      const next_page = state.currentPage + 1;
      const prev_page = state.currentPage - 1;
      const firstIndex =
        action.payload === "next"
          ? next_page * ITEMS_PER_PAGE
          : prev_page * ITEMS_PER_PAGE;

      if (state.filter) {
        if (
          action.payload === "next" &&
          firstIndex >= state.dogsFiltered.length
        )
          return state;
        else if (action.payload === "prev" && prev_page < 0) return state;
        return {
          ...state,
          allDogs: [...state.dogsFiltered].splice(firstIndex, ITEMS_PER_PAGE),
          currentPage: action.payload === "next" ? next_page : prev_page,
          totalPages,
        };
      }

      if (action.payload === "next" && firstIndex >= state.allDogsBackUp.length)
        return state;
      else if (action.payload === "prev" && prev_page < 0) return state;

      return {
        ...state,
        allDogs: [...state.allDogsBackUp].splice(firstIndex, ITEMS_PER_PAGE),
        currentPage: action.payload === "next" ? next_page : prev_page,
        totalPages,
      };

      case FILTER:
        let filteredDogs = [];
      
        if (Array.isArray(action.payload) && action.payload.length > 0) {
          // Si hay temperamentos seleccionados, aplicar el filtro sobre los resultados anteriores
          const previousFilteredDogs = state.filter ? state.dogsFiltered : state.allDogsBackUp;
      
          // Filtrar por múltiples temperamentos sobre los resultados anteriores
          filteredDogs = previousFilteredDogs.filter((dog) => {
            const formattedTemperaments = dog.temperaments.map((temp) =>
              temp.toLowerCase().trim()
            );
            // Verificar si todos los temperamentos seleccionados están presentes en el perro
            return action.payload.every((selectedTemp) =>
              formattedTemperaments.includes(selectedTemp.toLowerCase().trim())
            );
          });
        } else {
          // Sin temperamentos seleccionados, mostrar todos los resultados
          filteredDogs = state.allDogsBackUp;
        }
      
        return {
          ...state,
          allDogs: filteredDogs.slice(0, ITEMS_PER_PAGE),
          dogsFiltered: filteredDogs,
          filter: true,
          currentPage: 0,
      };

    case FILTER_BY_ORIGIN:
      const filteredByOrigin =
        action.payload === "api"
          ? state.allDogsBackUp.filter((dog) => !dog.createInDb)
          : action.payload === "db"
          ? state.allDogsBackUp.filter((dog) => dog.createInDb)
          : state.allDogsBackUp;

      return {
        ...state,
        allDogs: filteredByOrigin.slice(0, ITEMS_PER_PAGE),
        currentPage: 0,
      };

    case ORDER:
      let orderByName = [];
      if (action.payload === "AZ") {
        orderByName = [...state.allDogsBackUp].sort((prev, next) => {
          if (prev?.name.toLowerCase() > next?.name.toLowerCase()) return 1;

          if (prev?.name.toLowerCase() < next?.name.toLowerCase()) return -1;

          return 0;
        });
      }
      if (action.payload === "ZA") {
        orderByName = [...state.allDogsBackUp].sort((prev, next) => {
          if (prev?.name.toLowerCase() > next?.name.toLowerCase()) return -1;

          if (prev?.name.toLowerCase() < next?.name.toLowerCase()) return 1;

          return 0;
        });
      }

      return {
        ...state,
        allDogs: [...orderByName].splice(0, ITEMS_PER_PAGE),
        allDogsBackUp: orderByName,
        currentPage: 0,
      };

    case ORDER_BY_WEIGHT:
      let orderByWeight = [];
      if (action.payload === "ASC") {
        orderByWeight = [...state.allDogsBackUp].sort((prev, next) => {
          return prev.weight - next.weight;
        });
      } else if (action.payload === "DESC") {
        orderByWeight = [...state.allDogsBackUp].sort((prev, next) => {
          return next.weight - prev.weight;
        });
      }
      return {
        ...state,
        allDogs: [...orderByWeight].splice(0, ITEMS_PER_PAGE),
        allDogsBackUp: orderByWeight,
        currentPage: 0,
      };
      case REMOVE_TEMPERAMENT:
        const updatedSelectedTemperaments = state.selectedTemperaments.filter(
          (temp) => temp !== action.payload.name
        );
      
        let updatedFilteredDogs = state.allDogsBackUp;
        if (updatedSelectedTemperaments.length > 0) {
          updatedFilteredDogs = filterDogsByTemperament(
            state.allDogsBackUp,
            updatedSelectedTemperaments.join(", ")
          );
        }
      
        return {
          ...state,
          selectedTemperaments: updatedSelectedTemperaments,
          allDogs: updatedFilteredDogs.slice(0, ITEMS_PER_PAGE),
          dogsFiltered: updatedFilteredDogs,
          filter: true,
          currentPage: 0,
        };
      


    default:
      return state;
      break;
  }
}


export default rootReducer;
