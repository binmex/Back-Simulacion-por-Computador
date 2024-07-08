const routes = require("express").Router();
const {
  save,
  update,
  findAll,
  findId,
  findById,
  deleteTopic,
  findGroupsByTopicId,
  addProgramToTopic,
  getTopicsByProgram,
  assignProgramsToAllTopics,
  assignTopicsToPrograms,
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
 *               programs:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: objectId
 *                   description: IDs de los programas (referencia a la colección de programas)
 *     responses:
 *       201:
 *         description: Éxito
 *       400:
 *         description: Solicitud incorrecta
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
 *               aula:
 *                 type: string
 *                 description: Aula de la materia
 *               credits:
 *                 type: number
 *                 description: Créditos de la materia
 *               date_registration:
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
 *               programs:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: objectId
 *                   description: IDs de los programas (referencia a la colección de programas)
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

/**
 * @swagger
 * /topics/add-program:
 *   post:
 *     tags:
 *       - Materias
 *     description: Añade un programa a una materia existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               topicId:
 *                 type: string
 *                 format: objectId
 *                 description: ID de la materia
 *               programId:
 *                 type: string
 *                 format: objectId
 *                 description: ID del programa
 *     responses:
 *       200:
 *         description: Programa añadido exitosamente
 *       404:
 *         description: Materia o programa no encontrado
 *       500:
 *         description: Error del servidor
 */
routes.post("/add-program", addProgramToTopic);

/**
 * @swagger
 * /topics/by-program/{programId}:
 *   get:
 *     tags:
 *       - Materias
 *     description: Obtiene todas las materias de un programa
 *     parameters:
 *       - in: path
 *         name: programId
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *     responses:
 *       200:
 *         description: Éxito
 *       404:
 *         description: Materia no encontrada
 *       500:
 *         description: Error del servidor
 */
routes.get("/by-program/:programId", getTopicsByProgram);

/**
 * @swagger
 * /topics/assign-programs:
 *   post:
 *     tags:
 *       - Materias
 *     description: Asigna programas específicos a todas las materias existentes
 *     responses:
 *       200:
 *         description: Programas asignados exitosamente
 *       404:
 *         description: Uno o más programas no encontrados
 *       500:
 *         description: Error del servidor
 */
routes.post("/assign-programs", assignProgramsToAllTopics);


/**
 * @swagger
 * /topics/assign-to-programs:
 *   post:
 *     tags:
 *       - Materias
 *     description: Asigna materias a todos los programas
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error del servidor
 */
routes.post("/assign-to-programs", assignTopicsToPrograms);

module.exports = routes;
