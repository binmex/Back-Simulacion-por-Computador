const express = require("express");
const router = express.Router();
const {
  saveInscription,
  findAllInscription,
  findByIdInscription,
  updateInscription,
  deleteInscription,
} = require("../controllers/inscriptionsController");

/**
 * @swagger
 * tags:
 *   name: Inscripciones
 *   description: Operaciones relacionadas con inscripciones
 */

/**
 * @swagger
 * /inscriptions:
 *   get:
 *     tags:
 *       - Inscripciones
 *     description: Returns all inscriptions
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 */
router.get("/", findAllInscription);

/**
 * @swagger
 * /inscriptions:
 *   post:
 *     tags:
 *       - Inscripciones
 *     description: Create a new inscription
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student:
 *                 type: string
 *                 format: objectId
 *                 example: "6085e894932ec20015bbf017" # Ejemplo de un objectId de MongoDB
 *                 description: ID del estudiante
 *               topic:
 *                 type: string
 *                 format: objectId
 *                 example: "6085e894932ec20015bbf017" # Ejemplo de un objectId de MongoDB
 *                 description: ID de la materia
 *               registrationDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de inscripción (formato YYYY-MM-DD)
 *               status:
 *                 type: string
 *                 enum: [Inscrito, No inscrito, Cancelado]
 *                 default: No inscrito
 *                 description: Estado de la inscripción
 *     responses:
 *       200:
 *         description: Success
 */
router.post("/", saveInscription);

/**
 * @swagger
 * /inscriptions/{id}:
 *   get:
 *     tags:
 *       - Inscripciones
 *     description: Returns the inscription that belongs to the provided ID (Object ID)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *           example: "6085e894932ec20015bbf017" # Ejemplo de un objectId de MongoDB
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 */
router.get("/:id", findByIdInscription);

/**
 * @swagger
 * /inscriptions/{id}:
 *   patch:
 *     tags:
 *       - Inscripciones
 *     description: Update an inscription by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *           description: ID de la inscripción a actualizar (formato ObjectID de MongoDB)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student:
 *                 type: string
 *                 format: objectId
 *                 example: "6085e894932ec20015bbf017" # Ejemplo de un objectId de MongoDB
 *                 description: ID del estudiante
 *               topic:
 *                 type: string
 *                 format: objectId
 *                 example: "6085e894932ec20015bbf017" # Ejemplo de un objectId de MongoDB
 *                 description: ID de la materia
 *               registrationDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de inscripción (formato YYYY-MM-DD)
 *               status:
 *                 type: string
 *                 enum: [Inscrito, No inscrito, Cancelado]
 *                 default: No inscrito
 *                 description: Estado de la inscripción
 *     responses:
 *       200:
 *         description: Éxito
 *       404:
 *         description: No encontrado
 *       400:
 *         description: Solicitud incorrecta
 */
router.patch("/:id", updateInscription);

/**
 * @swagger
 * /inscriptions/{id}:
 *   delete:
 *     tags:
 *       - Inscripciones
 *     description: Delete an inscription by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *           description: ID de la inscripción a eliminar (formato ObjectID de MongoDB)
 *     responses:
 *       200:
 *         description: Éxito
 *       404:
 *         description: No encontrado
 */
router.delete("/:id", deleteInscription);

module.exports = router;
