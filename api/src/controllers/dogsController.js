require("dotenv").config();
const { Dog, Temperament } = require("../db");
const axios = require("axios");
const { getDogsApi } = require("../utils/apiUtils");

const { URL_API, API_KEY } = process.env;

const createDog = async (
  name,
  image,
  height_min,
  height_max,
  weight_min,
  weight_max,
  life_span_min,
  life_span_max,
  temperaments,
  createInDb
) => {
  console.log("createDog function received createInDb:", createInDb);
  const newDog = await Dog.create({
    
    name,
    image,
    height_min,
    height_max,
    weight_min,
    weight_max,
    life_span_min,
    life_span_max,
    createInDb
  });

  const temperamentsDb = await Temperament.findAll({
    where: {
      name: temperaments
    }
  });
console.log(JSON.stringify(temperamentsDb))
  await newDog.addTemperaments(temperamentsDb);

  return newDog;
};


const getDogsDb = async () => {
  const dogsDb = await Dog.findAll({
    attributes: [
      "id",
      "name",
      "image",
      "height_min",
      "height_max",
      "weight_min",
      "weight_max",
      "life_span_min",
      "life_span_max"
    ],
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  
  const dogsDbMapped = dogsDb.map((dog) => ({
    ...dog.dataValues,
    temperaments: dog.dataValues.Temperaments.map((temp) => temp.name),
  }));

  return dogsDbMapped;
};

const getDogs = async (name) => {
  const dogsDb = await getDogsDb();
  const dogsApi = await getDogsApi();
  const allDogs = [...dogsDb, ...dogsApi];

  if (name) {
    const dogsFilter = allDogs.filter((dog) =>
      dog.name.toLowerCase().includes(name.toLowerCase())
    );
    if (!dogsFilter.length)
      throw new Error(`No se encontro el dog con el nombre ${name}`);
    return dogsFilter.slice(0, 8); 
  }
  return allDogs;
};

const dogUpdate = async (id, data) => {
  return Dog.update(data, {
    where: {
      id,
    },
  }).then((response) => {
    if (response[0] === 0) {
      throw new Error("No se puede actualizar el Dog");
    }
    return "Dog actualizado correctamente";
  });
};

const dogDelete = async (id) => {
  return Dog.destroy({
    where: {
      id,
    },
  }).then((response) => {
    if (response === 0) {
      throw new Error("No se pudo eliminar el dog");
    }
    return `Dog con id ${id} eliminado correctamente`;
  });
};

const getDogId = async (id) => {
  if (isNaN(id)) {
    const dogId = await Dog.findByPk(id,{
      include: Temperament,
    })

    const temperaments = dogId.Temperaments.map((temp) => temp.name);
    return {
      id:dogId.id,
      name:dogId.name,
      image: dogId.image,
      height_min: dogId.height_min,
      height_max: dogId.height_max,
      weight_min: dogId.weight_min,
      weight_max:dogId.weight_max,
      life_span_min: dogId.life_span_min,
      life_span_max: dogId.life_span_max,
      temperaments:temperaments
    };
  }
  const dogApi = await getDogsApi();
  const dogId = await dogApi.find((dog) => dog.id === +id);
  return dogId;
};

module.exports = { createDog, getDogs, getDogId, dogUpdate, dogDelete };
