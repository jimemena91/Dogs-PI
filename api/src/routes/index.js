const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsRouter = require("../routes/dogsRoutes");
const temperamentRouter = require("../routes/temperamentsRoutes");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/dogs/temperaments", temperamentRouter);
router.use("/dogs", dogsRouter);

module.exports = router;

