const routes = require("express").Router();
const {
  save,
  update,
  findAll,
  findId,
  findById,
  deleteTopic,
  findGroupsByTopicId,
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
 *     description: Devuelve todas las materias
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 *       500:
 *         description: Error del servidor
 */
routes.get("/", findAll);

/**
 * @swagger
 * /topics/{id}:
 *   get:
 *     tags:
 *       - Materias
 *     description: Busca una materia por su ID
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
 *       500:
 *         description: Error del servidor
 */
routes.get("/:id", findId);

/**
 * @swagger
 * /topics/byId/{objectId}:
 *   get:
 *     tags:
 *       - Materias
 *     description: Busca una materia por su ObjectId de MongoDB
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
 *         description: Success
 *       404:
 *         description: Not found
 *       500:
 *         description: Error del servidor
 */
routes.get("/byId/:id", findById);

/**
 * @swagger
 * /topics:
 *   post:
 *     tags:
 *       - Materias
 *     description: Crea una nueva materia
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
 *       500:
 *         description: Error del servidor
 */
routes.post("/", save);

/**
 * @swagger
 * /topics/{id}:
 *   patch:
 *     tags:
 *       - Materias
 *     description: Actualiza una materia por su ID
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
 *       500:
 *         description: Error del servidor
 */
routes.patch("/:id", update);

/**
 * @swagger
 * /topics/{id}:
 *   delete:
 *     tags:
 *       - Materias
 *     description: Elimina una materia por su ID
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
 *       500:
 *         description: Error del servidor
 */
routes.delete("/:id", deleteTopic);

/**
 * @swagger
 * /topics/groups/{objectId}:
 *   get:
 *     tags:
 *       - Materias
 *     description: Obtiene los grupos de una materia por su ID
 *     parameters:
 *       - in: path
 *         name: objectId
 *         required: true
 *         schema:
 *           type: string
*           format: objectId
*           example: "6085e894932ec20015bbf017"
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 *       500:
 *         description: Error del servidor
 */
routes.get("/groups/:id", findGroupsByTopicId);

module.exports = routes;
