const express = require("express");
const router = express.Router();
const {
    saveInscription,
    findAllInscription,
    findByIdInscription,
    updateInscription,
    deleteInscription,
  } = require("../controllers/inscriptionsController");
  
  router.post("/", saveInscription);
  router.get("/", findAllInscription);
  router.get("/:id", findByIdInscription);
  router.patch("/:id", updateInscription);
  router.delete("/:id", deleteInscription);

module.exports = router;
