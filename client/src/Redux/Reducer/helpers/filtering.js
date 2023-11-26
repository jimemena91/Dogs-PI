const ITEMS_PER_PAGE = 8

export const filterDogs = (state, action) => {
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
      
      filteredDogs = state.allDogsBackUp;
    }
  
    const updatedTotalPages = Math.ceil(filteredDogs.length / ITEMS_PER_PAGE);
  
    return {
      allDogs: filteredDogs.slice(0, ITEMS_PER_PAGE),
      dogsFiltered: filteredDogs,
      filter: true,
      currentPage: 0,
      totalPages: updatedTotalPages,
    };
  };
  export const filterByOrigin = (state, action) => {
    const filteredByOrigin =
      action.payload === "api"
        ? state.allDogsBackUp.filter((dog) => !dog.createInDb)
        : action.payload === "db"
        ? state.allDogsBackUp.filter((dog) => dog.createInDb)
        : state.allDogsBackUp;
  
    console.log('Before Filter:', state);
    console.log('After Filter:', {
      allDogs: filteredByOrigin.slice(0, ITEMS_PER_PAGE),
      dogsFiltered: filteredByOrigin,
      currentPage: 0,
    });
  
    return {
      allDogs: filteredByOrigin.slice(0, ITEMS_PER_PAGE),
      dogsFiltered: filteredByOrigin,
      currentPage: 0,
      filter: true, 
    };
  };

  export const removeTemperament = (state, action) => {
    const updatedSelectedTemperament = action.payload.name;
  
    
    const updatedFilteredDogs = state.dogsFiltered.filter(
      (dog) =>
        dog.temperaments &&
        dog.temperaments.includes(updatedSelectedTemperament)
    );
  
    const newTotalPages = Math.ceil(updatedFilteredDogs.length / ITEMS_PER_PAGE);
    const newCurrentPage = Math.min(state.currentPage, newTotalPages - 1);
  
    const startIndex = newCurrentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
  
    const slicedBreeds = updatedFilteredDogs.slice(startIndex, endIndex);
  
    return {
      allDogs: slicedBreeds,
      dogsFiltered: updatedFilteredDogs,
      currentPage: newCurrentPage,
      totalPages: newTotalPages,
    };
  };
 
  
  