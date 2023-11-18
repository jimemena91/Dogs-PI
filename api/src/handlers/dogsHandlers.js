const {
  createDog,
  getDogs,
  getDogId,
  dogUpdate,
  dogDelete,
} = require("../controllers/dogsController");

const createDogHandler = async (req, res) => {
  try {
    const {
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
    } = req.body;

    const response = await createDog(
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
      
    );

    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const putDogHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await dogUpdate(id, req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteDogHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await dogDelete(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDogsHandler = async (req, res) => {
  try {
    const { name } = req.query;
    const response = await getDogs(name);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDogIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getDogId(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createDogHandler,
  getDogsHandler,
  getDogIdHandler,
  putDogHandler,
  deleteDogHandler,
};
