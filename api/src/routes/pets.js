const express = require("express");
const router = express.Router();

const petController = require("../controllers/petController");

router.post("/", petController.creamascota);
router.get("/", petController.lismascotas);
router.get("/quantity", petController.kpidemascotas);
router.get("/:specie", petController.calcAverDev);

module.exports = router;

