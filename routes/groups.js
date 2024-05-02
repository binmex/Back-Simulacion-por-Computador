const express = require("express");
const router = express.Router();
const {
    save,
    findById,
    findByName,
} = require("../controllers/groupController");


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
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       200:
 *         description: Grupo creado con éxito
 *       500:
 *         description: Error del servidor
 */
router.post("/", save);

/**
 * @swagger
 * /groups/{id}:
 *   get:
 *     tags:
 *       - Grupos
 *     description: Obtiene el grupo por su ID
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
 *         description: Grupo encontrado con éxito
 *       404:
 *         description: Grupo no encontrado
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
 */
router.get("/findOne", findByName);

module.exports = router;