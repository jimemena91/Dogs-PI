const ITEMS_PER_PAGE = 8

export const orderByWeight = (state, action) => {
    try {
      const sortedBreeds = [...state.allDogsBackUp];
      sortedBreeds.sort((a, b) => {
        const weightA = parseInt(a.weight_min) || parseInt(a.weight_max) || 0;
        const weightB = parseInt(b.weight_min) || parseInt(b.weight_max) || 0;
  
        if (action.payload === 'asc') {
          return weightA - weightB;
        } else {
          return weightB - weightA;
        }
      });
  
      const newCurrentPage =
        state.currentPage * ITEMS_PER_PAGE < sortedBreeds.length
          ? state.currentPage
          : Math.floor(sortedBreeds.length / ITEMS_PER_PAGE) - 1;
  
      const startIndex = newCurrentPage * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
  
      const slicedBreeds = sortedBreeds.slice(startIndex, endIndex);
  
      return {
        allDogs: slicedBreeds,
        currentPage: newCurrentPage,
      };
    } catch (error) {
     alert('Error en orderByWeight:', error);
      return state;
    }
  };

  export const orderByName = (state, action) => {
    const orderValue = action.payload === "AZ" ? 1 : -1;
    const orderByName = [...state.allDogsBackUp].sort((prev, next) => {
      return orderValue * prev.name.localeCompare(next.name);
    });
  
    return {
      allDogs: [...orderByName].slice(0, ITEMS_PER_PAGE),
      allDogsBackUp: orderByName,
      currentPage: 0,
    };
  };