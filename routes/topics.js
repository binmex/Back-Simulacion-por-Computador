const routes = require("express").Router();
const {
  save,
  update,
  findAll,
  findId,
  findById,
  deleteTopic,
} = require("../controllers/topicsControllers");

/**
 * @swagger
 * tags:
 *   name: Materias
 *   description: Operaciones relacionadas con las materias
 */

/**
 * @swagger
 * /topics:
 *   get:
 *     tags:
 *       - Materias
 *     description: Returns all topics
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 */
routes.get("/", findAll);

/**
 * @swagger
 * /topics/{id}:
 *   get:
 *     tags:
 *       - Materias
 *     description: Returns the topic that belongs to the provided ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 */
routes.get("/:id", findId);

/**
 * @swagger
 * /topics/byId/{id}:
 *   get:
 *     tags:
 *       - Materias
 *     description: Returns the topic that belongs to the provided ID (Object ID)
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
routes.get("/byId/:id", findById);

/**
 * @swagger
 * /topics:
 *   post:
 *     tags:
 *       - Materias
 *     description: Create a new topic
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 description: ID del tema
 *               name:
 *                 type: string
 *                 description: Nombre del tema
 *               aula:
 *                 type: string
 *                 description: Aula del tema
 *               credits:
 *                 type: number
 *                 description: Créditos del tema
 *               date_registration:
 *                 type: string
 *                 format: date
 *                 description: Fecha de registro del tema (formato YYYY-MM-DD)
 *               state:
 *                 type: string
 *                 enum: [activo, inactivo]
 *                 description: Estado del tema
 *               quotas:
 *                 type: number
 *                 description: Cuotas del tema
 *     responses:
 *       200:
 *         description: Éxito
 */
routes.post("/", save);

/**
 * @swagger
 * /topics/{id}:
 *   patch:
 *     tags:
 *       - Materias
 *     description: Update a topic by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 description: ID de la materia
 *               name:
 *                 type: string
 *                 description: Nombre de la materia
 *               classroom:
 *                 type: string
 *                 description: Aula de la materia
 *               credits:
 *                 type: number
 *                 description: Créditos de la materia
 *               registrationDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de registro de la materia (formato YYYY-MM-DD)
 *               state:
 *                 type: string
 *                 enum: [activo, inactivo]
 *                 description: Estado de la materia
 *               quotas:
 *                 type: number
 *                 description: Cupos de la materia
 *     responses:
 *       200:
 *         description: Éxito
 *       404:
 *         description: No encontrado
 *       400:
 *         description: Solicitud incorrecta
 */
routes.patch("/:id", update);

/**
 * @swagger
 * /topics/{id}:
 *   delete:
 *     tags:
 *       - Materias
 *     description: Delete a topic by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 */
routes.delete("/:id", deleteTopic);

module.exports = routes;
