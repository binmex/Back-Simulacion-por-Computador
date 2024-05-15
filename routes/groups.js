const express = require("express");
const router = express.Router();
const {
  save,
  findAll,
  findById,
  findName,
  update,
  deleteGroup,
  countDocuments,
} = require("../controllers/groupController");

/**
 * @swagger
 * /groups:
 *   get:
 *     tags:
 *       - Grupos
 *     description: Devuelve todos los grupos
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
 *                 enum: [grupo 60, grupo 62, grupo 63]
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
 * /groups/byId/{objectId}:
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
router.get("/byId/:id", findById);

/**
 * @swagger
 * /groups/name:
 *   get:
 *     tags:
 *       - Grupos
 *     description: Busca un grupo por su nombre
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre del grupo
 *     responses:
 *       200:
 *         description: Grupo encontrado con éxito
 *       404:
 *         description: Grupo no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get("/name", findName);

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
 *         example: "6085e894932ec20015bbf017"
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
 *                 enum: [grupo 60, grupo 61, grupo 62]
 *               topic:
 *                 type: string
 *                 format: objectId
 *                 example: "6085e894932ec20015bbf017"
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
 *     description: Elimina un grupo por su ID (ObjectID)
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
 *         description: Grupo eliminado exitosamente
 *       404:
 *         description: Grupo no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete("/:id", deleteGroup);

/**
 * @swagger
 * /groups/count:
 *   get:
 *     tags:
 *       - Grupos
 *     description: Devuelve la cantidad de grupos
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error del servidor
 */
router.get("/count", countDocuments);

module.exports = router;
