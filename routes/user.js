const routes = require("express").Router();
const {
  save,
  deleteUser,
  findByUsername,
  update,
  findAll,
  createUsersFromStudents // Importa la nueva función del controlador
} = require("../controllers/userControllers");

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Operaciones relacionadas con los usuarios
 */

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Usuarios
 *     description: Devuelve todos los usuarios
 *     responses:
 *       200:
 *         description: Éxito
 *       500:
 *         description: Error del servidor
 */
routes.get("/", findAll);

/**
 * @swagger
 * /users/findUsername/{username}:
 *   get:
 *     tags:
 *       - Usuarios
 *     description: Busca un usuario por su nombre de usuario
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Éxito
 *       404:
 *         description: No encontrado
 *       500:
 *         description: Error del servidor
 */
routes.get("/findUsername/:username", findByUsername);

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - Usuarios
 *     description: Crea un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *               role:
 *                 type: string
 *                 enum: [student, admin]
 *                 description: Rol del usuario
 *               image:
 *                 type: string
 *                 description: URL de la imagen del usuario
 *     responses:
 *       200:
 *         description: Éxito
 *       400:
 *         description: Solicitud incorrecta
 *       500:
 *         description: Error del servidor
 */
routes.post("/save", save);

/**
 * @swagger
 * /users/update/{id}:
 *   patch:
 *     tags:
 *       - Usuarios
 *     description: Actualiza un usuario por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *               role:
 *                 type: string
 *                 enum: [student, admin]
 *                 description: Rol del usuario
 *               image:
 *                 type: string
 *                 description: URL de la imagen del usuario
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
routes.patch("/update/:id", update);

/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     tags:
 *       - Usuarios
 *     description: Elimina un usuario por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Éxito
 *       404:
 *         description: No encontrado
 *       500:
 *         description: Error del servidor
 */
routes.delete("/delete/:id", deleteUser);

/**
 * @swagger
 * /users/create-users-from-students:
 *   post:
 *     tags:
 *       - Usuarios
 *     description: Crea usuarios a partir de los estudiantes registrados
 *     responses:
 *       200:
 *         description: Éxito
 *       500:
 *         description: Error del servidor
 */
routes.post("/create-users-from-students", createUsersFromStudents);

module.exports = routes;
