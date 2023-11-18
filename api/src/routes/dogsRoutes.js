const { Router } = require("express");
const {
  createDogHandler,
  getDogsHandler,
  getDogIdHandler,
  putDogHandler,
  deleteDogHandler,
} = require("../handlers/dogsHandlers");

const dogsRouter = Router();

dogsRouter
  .get("/", getDogsHandler)
  .get("/:id", getDogIdHandler)
  .post("/", createDogHandler)
  .put("/:id", putDogHandler)
  .delete("/:id", deleteDogHandler)

module.exports = dogsRouter;
