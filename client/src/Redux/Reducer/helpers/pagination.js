const ITEMS_PER_PAGE = 8

export const paginateDogs = (state, action) => {
  const totalDogs = state.filter
    ? state.dogsFiltered.length
    : state.allDogsBackUp.length;

  let newCurrentPage;

  if (action.payload === "next" && state.currentPage < state.totalPages - 1) {
    newCurrentPage = state.currentPage + 1;
  } else if (action.payload === "prev" && state.currentPage > 0) {
    newCurrentPage = state.currentPage - 1;
  } else {
    // Si action.payload es un número, establecer la página directamente
    newCurrentPage = action.payload;
  }

  const firstIndexPaginate = newCurrentPage * ITEMS_PER_PAGE;
  const lastIndexPaginate = Math.min(
    firstIndexPaginate + ITEMS_PER_PAGE,
    totalDogs
  );

  const paginatedDogs = state.filter
    ? state.dogsFiltered.slice(firstIndexPaginate, lastIndexPaginate)
    : state.allDogsBackUp.slice(firstIndexPaginate, lastIndexPaginate);

  const newState = {
    currentPage: newCurrentPage,
    totalPages: Math.ceil(totalDogs / ITEMS_PER_PAGE),
    allDogs: paginatedDogs, // Actualizar la lista de perros paginados
  };

  return newState;
};