const express = require("express");
const router = express.Router();
const {
  save,
  findAll,
  findById,
  findByName,
  update,
  deleteGroup
} = require("../controllers/groupController");

/**
 * @swagger
 * /groups:
 *   get:
 *     tags:
 *       - Grupos
 *     description: Devuelve todas los grupos
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 *       500:
 *         description: Error del servidor
 */
router.get("/", findAll);

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
 *               topic:
 *                 type: string
 *                 format: ObjectId
 *                 example: "6085e894932ec20015bbf017"
 *     responses:
 *       201:
 *         description: Grupo creado exitosamente
 *       400:
 *         description: Solicitud incorrecta
 *       404:
 *         description: Materia no encontrada
 *       409:
 *         description: Conflicto, el grupo ya existe para esa materia
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

/**
 * @swagger
 * /groups/{id}:
 *   patch:
 *     tags:
 *       - Grupos
 *     description: Actualiza un grupo por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               grupo:
 *                 type: string
 *               topic:
 *                 type: string
 *                 format: objectId
 *     responses:
 *       200:
 *         description: Grupo actualizado exitosamente
 *       404:
 *         description: Grupo no encontrado
 *       500:
 *         description: Error del servidor
 */
router.patch("/:id", update);

/**
 * @swagger
 * /groups/{id}:
 *   delete:
 *     tags:
 *       - Grupos
 *     description: Elimina un grupo por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *     responses:
 *       200:
 *         description: Grupo eliminado exitosamente
 *       404:
 *         description: Grupo no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete("/:id", deleteGroup);

module.exports = router;
