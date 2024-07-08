const routes = require("express").Router();
const {
  save,
  update,
  infoPaged,
  findId,
  findById,
  deleteStudent,
  countDocumentsStudents,
  findCode,
  assignPrograms,
  findEmail,
} = require("../controllers/studentsController");

/**
 * @swagger
 * tags:
 *   name: Estudiantes
 *   description: Operaciones relacionadas con estudiantes
 */

/**
 * @swagger
 * /students:
 *   get:
 *     tags:
 *       - Estudiantes
 *     description: Devuelve todos los estudiantes paginados
 *     parameters:
 *       - in: query
 *         name: PageSize
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 10
 *         description: Tamaño de la página
 *       - in: query
 *         name: PageNumber
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *         description: Número de página
 *       - in: query
 *         name: SortBy
 *         schema:
 *           type: string
 *           example: "firstName"
 *           enum: [firstName, lastName, code]
 *         description: Campo por el cual ordenar los resultados (nombre, apellido, código)
 *       - in: query
 *         name: SortDirection
 *         schema:
 *           type: string
 *           example: "Asc"
 *           enum: [Asc, Desc]
 *         description: Dirección de ordenación (Ascendente o Descendente)
 *     responses:
 *       200:
 *         description: Éxito
 *       404:
 *         description: No encontrado
 *       500:
 *         description: Error del servidor
 */
routes.get("/", infoPaged);

/**
 * @swagger
 * /students/findCode:
 *   get:
 *     tags:
 *       - Estudiantes
 *     description: Busca un estudiante por su código
 *     parameters:
 *       - in: query
 *         name: code
 *         required: true
 *         schema:
 *           type: number
 *         description: Código del estudiante
 *     responses:
 *       200:
 *         description: Éxito
 *       404:
 *         description: Estudiante no encontrado
 *       500:
 *         description: Error del servidor
 */
routes.get("/findCode", findCode);

/**
 * @swagger
 * /students/buscarId/{id}:
 *   get:
 *     tags:
 *       - Estudiantes
 *     description: Retorna el estudiante buscado por un ID
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
routes.get("/buscarId/:id", findId);

/**
 * @swagger
 * /students/byId/{objectId}:
 *   get:
 *     tags:
 *       - Estudiantes
 *     description: Retorna un estudiante buscado por su ObjectId de MongoDB
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
 */
routes.get("/byId/:id", findById);

/**
 * @swagger
 * /students:
 *   post:
 *     tags:
 *       - Estudiantes
 *     description: Crea un nuevo estudiante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *               Identification:
 *                 type: number
 *               code:
 *                 type: number
 *               documentType:
 *                 type: string
 *                 enum: [CC, TI, CE]
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               birthdate:
 *                 type: string
 *                 format: date
 *               cellphone:
 *                 type: number
 *               email:
 *                 type: string
 *               state:
 *                 type: string
 *                 enum: [matriculado, no matriculado]
 *               program:
 *                 type: string
 *                 format: objectId
 *                 example: "60d5ec49c458b845d4d4e5a2"
 *                 description: ID del programa (referencia a la colección de programas)
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error del servidor
 */
routes.post("/", save);

/**
 * @swagger
 * /students/{ObjectId}:
 *   patch:
 *     tags:
 *       - Estudiantes
 *     description: Actualiza un estudiante por su ID de MongoDB
 *     parameters:
 *       - in: path
 *         name: ObjectId
 *         required: true
 *         schema:
 *           example: "6085e894932ec20015bbf017"
 *           type: string
 *           format: objectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Identification:
 *                 type: number
 *               code:
 *                 type: number
 *               documentType:
 *                 type: string
 *                 enum: [CC, TI, CE]
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               birthdate:
 *                 type: string
 *                 format: date
 *               cellphone:
 *                 type: number
 *               email:
 *                 type: string
 *               state:
 *                 type: string
 *                 enum: [matriculado, no matriculado]
 *               program:
 *                 type: string
 *                 format: objectId
 *                 example: "60d5ec49c458b845d4d4e5a2"
 *                 description: ID del programa (referencia a la colección de programas)
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 *       400:
 *         description: Bad request
 *       500:
 *         description: Error del servidor
 */
routes.patch("/:id", update);

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     tags:
 *       - Estudiantes
 *     description: Elimina un estudiante por su ID
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
routes.delete("/:id", deleteStudent);

/**
 * @swagger
 * /students/countStudents:
 *   get:
 *     tags:
 *       - Estudiantes
 *     description: Obtiene la cantidad total de estudiantes
 *     responses:
 *       200:
 *         description: Éxito
 *       500:
 *         description: Error del servidor
 */
routes.get("/countStudents", countDocumentsStudents);

/**
 * @swagger
 * /students/assign-programs:
 *   post:
 *     tags:
 *       - Estudiantes
 *     description: Asigna programas a todos los estudiantes
 *     responses:
 *       200:
 *         description: Programas asignados exitosamente
 *       500:
 *         description: Error del servidor
 */
routes.post("/assign-programs", assignPrograms);

/*falta el Swager de este metodo*/

routes.post("/findEmail", findEmail);

module.exports = routes;
