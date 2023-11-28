const ITEMS_PER_PAGE = 8

export const orderByWeight = (state, action) => {
  try {
    const { allDogsBackUp, currentPage } = state;
    const isDescending = action.payload === 'DESC';

    // Crear una nueva copia del array de perros de respaldo
    const allDogsBackUpCopy = [...allDogsBackUp];

    // Ordenar los perros según el peso
    allDogsBackUpCopy.sort((a, b) => {
      const weightA = parseInt(a.weight_min, 10) || parseInt(a.weight_max, 10) || 0;
      const weightB = parseInt(b.weight_min, 10) || parseInt(b.weight_max, 10) || 0;

      return isDescending ? weightB - weightA : weightA - weightB;
    });

    // Actualizar allDogsBackUp con la nueva copia ordenada
    return {
      ...state,
      allDogs: allDogsBackUpCopy.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE),
      allDogsBackUp: allDogsBackUpCopy,
    };
  } catch (error) {
    console.error('Error en orderByWeight:', error);
    // Devolver el estado original en caso de error
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