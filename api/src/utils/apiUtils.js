require("dotenv").config();
const axios = require("axios");

const { URL_API, API_KEY } = process.env;

const getDogsApi = async () => {
  try {
    const { data } = await axios.get(`${URL_API}?api_key=${API_KEY}`);
    const filteredDogs = data.map((dog) => {
      const weightMetric = dog.weight.metric;
      const [weightMinMetric, weightMaxMetric] = weightMetric.split(" - ");

      const heightMetric = dog.height.metric;
      const [heightMinMetric, heightMaxMetric] = heightMetric.split(" - ");

      const lifeSpan = dog.life_span.split(" - ");
      const lifeSpanMin = lifeSpan[0];
      const lifeSpanMax = lifeSpan[1];

      const temperaments = dog.temperament ? dog.temperament.split(",") : [];

      return {
        id: dog.id,
        name: dog.name,
        image: dog.image.url,
        weight_min: weightMinMetric,
        weight_max: weightMaxMetric,
        height_min: heightMinMetric,
        height_max: heightMaxMetric,
        life_span_min: lifeSpanMin,
        life_span_max: lifeSpanMax,
        temperaments: temperaments,
      };
    });

    return filteredDogs;
  } catch (error) {
    throw new Error("Error al obtener datos de la API.");
  }
};

module.exports = { getDogsApi };
