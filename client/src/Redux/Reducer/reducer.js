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
import * as paginationHelpers from './helpers/pagination';
import * as filteringHelpers from './helpers/filtering';
import * as sortingHelpers from './helpers/sorting';
import * as dogsUpdateHelpers from './helpers/dogsUpdate';

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
          return {
            ...state,
            ...dogsUpdateHelpers.updateDogsFromPayload(state, action),
          };

    case GET_DOGS_NAME:
      return {
        ...state,
        allDogs: action.payload,
      };
      case PAGINATE:
      return {
        ...state,
        ...paginationHelpers.paginateDogs(state, action),
      };
      case FILTER:
        return {
          ...state,
          ...filteringHelpers.filterDogs(state, action),
        };
        case FILTER_BY_ORIGIN:
          return {
            ...state,
            ...filteringHelpers.filterByOrigin(state, action),
          };
        case ORDER:
          return {
            ...state,
            ...sortingHelpers.orderByName(state, action),
          };

      case ORDER_BY_WEIGHT:
      return {
        ...state,
        ...sortingHelpers.orderByWeight(state, action),
      };

      
      case REMOVE_TEMPERAMENT:
        return {
          ...state,
          ...filteringHelpers.removeTemperament(state, action),
        };
   

    default:
      return state;
      break;
  }
}

export default rootReducer;