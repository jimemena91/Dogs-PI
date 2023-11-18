require("dotenv").config();
const { Temperament } = require("../db");
const axios = require("axios");

const { URL_API , API_KEY} = process.env;

const getAllTemperamentsDb = async () => {
  const temperamentsDb = await Temperament.findAll();

  if (!temperamentsDb.length) {
    const { data } = await axios.get(`${URL_API}?api_key=${API_KEY}`);

    const temperaments = [];
    data.forEach((dog) => {
      if (dog.temperament) {
        const temperamentsArray = dog.temperament.split(',').map((temp) => temp.trim());
        temperaments.push(...temperamentsArray);
      }
    });

    const temperamentsUnicos = [...new Set(temperaments)];

    for (const temperamentsName of temperamentsUnicos) {
      await Temperament.findOrCreate({
        where: { name: temperamentsName },
        defaults: { name: temperamentsName },
      });
    }

    return temperamentsUnicos;
  } else {
    // Mapear los temperamentos a un array de strings
    return temperamentsDb.map((temp) => temp.name);
  }
};



  module.exports = {getAllTemperamentsDb}

