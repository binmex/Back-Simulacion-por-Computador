const express = require("express");
const router = express.Router();
const {
  save,
  findById,
  findByName,
} = require("../controllers/groupController");

/**
 * @swagger
 * tags:
 *   name: Grupos
 *   description: Operaciones relacionadas con grupos
 */

/**
 * @swagger
 * /groups:
 *   post:
 *     tags:
 *       - Grupos
 *     description: Crea un nuevo grupo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               grupo:
 *                 type: string
 *                 enum: [grupo1, grupo2, grupo3]
 *               name:
 *                 type: string
 *               topic:
 *                 type: string
 *                 format: ObjectId
 *                 example: "6085e894932ec20015bbf017"
 *               quotas:
 *                 type: number
 *     responses:
 *       200:
 *         description: Grupo creado exitosamente
 *       500:
 *         description: Error del servidor
 */
router.post("/", save);

/**
 * @swagger
 * /groups/{objectId}:
 *   get:
 *     tags:
 *       - Grupos
 *     description: Obtiene el grupo por su ObjectId de MonogDB
 *     parameters:
 *       - in: path
 *         name: objectId
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *           example: "6085e894932ec20015bbf017" # Ejemplo de un objectId de MongoDB
 *     responses:
 *       200:
 *         description: Grupo encontrado con éxito
 *       404:
 *         description: Grupo no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get("/:id", findById);

/**
 * @swagger
 * /groups/findOne:
 *   get:
 *     tags:
 *       - Grupos
 *     description: Encuentra un grupo por su nombre
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Grupo encontrado con éxito
 *       404:
 *         description: Grupo no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get("/findOne", findByName);

module.exports = router;
