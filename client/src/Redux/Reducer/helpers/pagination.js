const ITEMS_PER_PAGE = 8

export const paginateDogs = (state, action) => {
    const totalDogs = state.filter
      ? state.dogsFiltered.length
      : state.allDogsBackUp.length;
    const updatedTotalPagesPaginate = Math.ceil(totalDogs / ITEMS_PER_PAGE);
  
    let newCurrentPage;
  
    if (action.payload === "next" && state.currentPage < updatedTotalPagesPaginate - 1) {
      newCurrentPage = state.currentPage + 1;
    } else if (action.payload === "prev" && state.currentPage > 0) {
      newCurrentPage = state.currentPage - 1;
    } else {
      
      newCurrentPage = state.currentPage;
    }
  
    const firstIndexPaginate = newCurrentPage * ITEMS_PER_PAGE;
    const lastIndexPaginate = Math.min(firstIndexPaginate + ITEMS_PER_PAGE, totalDogs);
  
    return {
      currentPage: newCurrentPage,
      totalPages: updatedTotalPagesPaginate,
      allDogs: state.filter
        ? state.dogsFiltered.slice(firstIndexPaginate, lastIndexPaginate)
        : state.allDogsBackUp.slice(firstIndexPaginate, lastIndexPaginate),
    };
  };
  