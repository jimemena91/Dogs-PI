const { getAllTemperamentsDb } = require("../controllers/temperamentsController");

const getTemperamentsHandler = async (req, res) => {
  try {
    
    const response = await getAllTemperamentsDb();
  
    res.status(200).json(response);
  } catch (error) {
    
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getTemperamentsHandler };
