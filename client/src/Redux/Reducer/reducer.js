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
        const { payload } = action;
      
        const updatedDogs = payload.map((dog) => {
          const isFromApi = !isNaN(Number(dog.id));
          
          return {
            ...dog,
            createInDb: isFromApi ? false : true,
          };
        });
      
        return {
          ...state,
          allDogs: updatedDogs.splice(0, ITEMS_PER_PAGE),
          allDogsBackUp: updatedDogs,
        };

    case GET_DOGS_NAME:
      return {
        ...state,
        allDogs: action.payload,
      };
    case PAGINATE:
      const totalDogs = state.filter
        ? state.dogsFiltered.length
        : state.allDogsBackUp.length;
      const updatedTotalPagesPaginate = Math.ceil(totalDogs / ITEMS_PER_PAGE);

      const newCurrentPage =
        action.payload === "next"
          ? Math.min(state.currentPage + 1, updatedTotalPagesPaginate - 1)
          : Math.max(state.currentPage - 1, 0);

      const firstIndexPaginate = newCurrentPage * ITEMS_PER_PAGE;

      return {
        ...state,
        allDogs: state.filter
          ? state.dogsFiltered.slice(
              firstIndexPaginate,
              firstIndexPaginate + ITEMS_PER_PAGE
            )
          : state.allDogsBackUp.slice(
              firstIndexPaginate,
              firstIndexPaginate + ITEMS_PER_PAGE
            ),
        currentPage: newCurrentPage,
        totalPages: updatedTotalPagesPaginate,
      };

    case FILTER:
      let filteredDogs = [];

      if (Array.isArray(action.payload) && action.payload.length > 0) {
        filteredDogs = state.allDogsBackUp.filter((dog) => {
          const formattedTemperaments = dog.temperaments.map((temp) =>
            temp.toLowerCase().trim()
          );

          return action.payload.every((selectedTemp) =>
            formattedTemperaments.includes(selectedTemp.toLowerCase().trim())
          );
        });
      } else {
        // Sin temperamentos seleccionados, mostrar todos los resultados
        filteredDogs = state.allDogsBackUp;
      }

      const updatedTotalPages = Math.ceil(filteredDogs.length / ITEMS_PER_PAGE);

      return {
        ...state,
        allDogs: filteredDogs.slice(0, ITEMS_PER_PAGE),
        dogsFiltered: filteredDogs,
        filter: true,
        currentPage: 0,
        totalPages: updatedTotalPages,
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
      const orderByName = [...state.allDogsBackUp].sort((prev, next) => {
        const orderValue = action.payload === "AZ" ? 1 : -1;
        return orderValue * prev.name.localeCompare(next.name);
      });

      return {
        ...state,
        allDogs: [...orderByName].splice(0, ITEMS_PER_PAGE),
        allDogsBackUp: orderByName,
        currentPage: 0,
      };

      case ORDER_BY_WEIGHT:
        try {
          const sortedBreeds = [...state.allDogsBackUp];
          sortedBreeds.sort((a, b) => {
            const weightA = parseInt(a.weight_min) || parseInt(a.weight_max) || 0;
            const weightB = parseInt(b.weight_min) || parseInt(b.weight_max) || 0;
      
            console.log(`Peso A: ${weightA}, Peso B: ${weightB}`);
      
            if (action.payload === 'asc') {
              console.log('Ordenando de menor a mayor');
              return weightA - weightB;
            } else {
              console.log('Ordenando de mayor a menor');
              console.log(`Comparando ${weightB} con ${weightA}`);
              const result = weightB - weightA;
              console.log(`Resultado de la comparación: ${result}`);
              return result;
            }
          });
      
          console.log('Breeds ordenados:', sortedBreeds);
      
          const newCurrentPage =
            state.currentPage * ITEMS_PER_PAGE < sortedBreeds.length
              ? state.currentPage
              : Math.floor(sortedBreeds.length / ITEMS_PER_PAGE) - 1;
      
          console.log('Nueva página actual:', newCurrentPage);
      
          const startIndex = newCurrentPage * ITEMS_PER_PAGE;
          const endIndex = startIndex + ITEMS_PER_PAGE;
      
          console.log('Índices de corte:', startIndex, endIndex);
      
          const slicedBreeds = sortedBreeds.slice(startIndex, endIndex);
      
          console.log('Breeds después de cortar:', slicedBreeds);
      
          return {
            ...state,
            allDogs: slicedBreeds,
            currentPage: newCurrentPage,
          };
        } catch (error) {
          console.error('Error en ORDER_BY_WEIGHT:', error);
          return state; // Devolvemos el estado actual en caso de error
        }
      

      
    case REMOVE_TEMPERAMENT:
      const updatedSelectedTemperament = action.payload.name;

      // Filtra usando dogsFiltered en lugar de selectedTemperaments
      const updatedFilteredDogs = state.dogsFiltered.filter(
        (dog) =>
          dog.temperaments &&
          dog.temperaments.includes(updatedSelectedTemperament)
      );

      const newTotalPages = Math.ceil(
        updatedFilteredDogs.length / ITEMS_PER_PAGE
      );
      const currentPage = Math.min(state.currentPage, newTotalPages - 1);

      return {
        ...state,
        allDogs: updatedFilteredDogs.slice(
          currentPage * ITEMS_PER_PAGE,
          (currentPage + 1) * ITEMS_PER_PAGE
        ),
        dogsFiltered: updatedFilteredDogs,
        currentPage,
        totalPages: newTotalPages,
      };

    default:
      return state;
      break;
  }
}

export default rootReducer;