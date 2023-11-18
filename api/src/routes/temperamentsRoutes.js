const {Router}=require("express")
const {getTemperamentsHandler} = require ("../handlers/temperamentsHandlers")

const temperamentsRouter = Router()

temperamentsRouter.get("/", getTemperamentsHandler)

module.exports= temperamentsRouter