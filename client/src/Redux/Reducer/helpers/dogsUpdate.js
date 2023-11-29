const ITEMS_PER_PAGE = 8;

export const updateDogsFromPayload = (state, action) => {
  const { payload } = action;

  const updatedDogs = payload.map((dog) => {
    const isFromApi = !isNaN(Number(dog.id));

    return {
      ...dog,
      createInDb: isFromApi ? false : true,
    };
  });

  return {
    allDogs: updatedDogs.slice(0, ITEMS_PER_PAGE),
    allDogsBackUp: updatedDogs,
  };
};
