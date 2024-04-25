const routes = require("express").Router();
const {
  save,
  update,
  findAll,
  findId,
  findById,
  deleteStudent,
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
 *     description: Returns all students
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 */
routes.get("/", findAll);

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     tags:
 *       - Estudiantes
 *     description: Returns the student that belongs to the provided ID
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
 * /students/byId/{id}:
 *   get:
 *     tags:
 *       - Estudiantes
 *     description: Returns the student that belongs to the provided ID (Object ID)
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
 * /students:
 *   post:
 *     tags:
 *       - Estudiantes
 *     description: Create a new student
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
 *     responses:
 *       200:
 *         description: Success
 */
routes.post("/", save);

/**
 * @swagger
 * /students/{id}:
 *   patch:
 *     tags:
 *       - Estudiantes
 *     description: Update a student by ID
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
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 *       400:
 *         description: Bad request
 */
routes.patch("/:id", update);

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     tags:
 *       - Estudiantes
 *     description: Delete a student by ID
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

module.exports = routes;
