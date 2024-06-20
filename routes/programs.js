const express = require("express");
const router = express.Router();
const {
    createProgram,
    deleteProgram,
    getAllPrograms,
    getProgramById,
    updateProgram
} = require("../controllers/programsControllers");

/**
 * @swagger
 * tags:
 *   name: Programas
 *   description: Operaciones relacionadas con programas
 */

/**
 * @swagger
 * /programs:
 *   get:
 *     tags:
 *       - Programas
 *     description: Devuelve todos los programas
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 */
router.get("/", getAllPrograms);

/**
 * @swagger
 * /programs/save:
 *   post:
 *     tags:
 *       - Programas
 *     description: Crea un nuevo programa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 example: 1
 *                 description: ID único del programa
 *               name:
 *                 type: string
 *                 example: "Ingeniería de Sistemas"
 *                 description: Nombre del programa
 *               snies_code:
 *                 type: string
 *                 example: "123456"
 *                 description: Código SNIES del programa
 *               faculty:
 *                 type: string
 *                 format: objectId
 *                 example: "60d5ec49c458b845d4d4e5a2"
 *                 description: ID de la programa (referencia a la colección de programaes)
 *               location:
 *                 type: string
 *                 enum: ["Tunja", "Duitama", "Sogamoso", "Chiquinquirá", "Aguazul"]
 *                 example: "Tunja"
 *                 description: Ubicación del programa
 *               modality:
 *                 type: string
 *                 enum: ["Virtual", "Distancia", "Presencial"]
 *                 example: "Presencial"
 *                 description: Modalidad del programa
 *               date_registration:
 *                 type: string
 *                 format: date
 *                 example: "2023-06-20"
 *                 description: Fecha de registro del programa (formato YYYY-MM-DD)
 *     responses:
 *       201:
 *         description: Éxito
 *       400:
 *         description: Solicitud incorrecta
 *       500:
 *         description: Error del servidor
 */
router.post("/save", createProgram);

/**
 * @swagger
 * /programs/findById/{ObjectId}:
 *   get:
 *     tags:
 *       - Programas
 *     description: Busca un programa por su ObjectId de MongoDB
 *     parameters:
 *       - in: path
 *         name: ObjectId
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
router.get("/findById/:id", getProgramById);

/**
 * @swagger
 * /programs/update/{ObjectId}:
 *   patch:
 *     tags:
 *       - Programas
 *     description: Actualiza un programa por su ID de MongoDB
 *     parameters:
 *       - in: path
 *         name: ObjectId
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
 *               name:
 *                 type: string
 *                 example: "Ingeniería de Sistemas"
 *                 description: Nombre del programa
 *               snies_code:
 *                 type: string
 *                 example: "123456"
 *                 description: Código SNIES del programa
 *               faculty:
 *                 type: string
 *                 format: objectId
 *                 example: "60d5ec49c458b845d4d4e5a2"
 *                 description: ID de la facultad (referencia a la colección de facultades)
 *               location:
 *                 type: string
 *                 enum: ["Tunja", "Duitama", "Sogamoso", "Chiquinquirá", "Aguazul"]
 *                 example: "Tunja"
 *                 description: Ubicación del programa
 *               modality:
 *                 type: string
 *                 enum: ["Virtual", "Distancia", "Presencial"]
 *                 example: "Presencial"
 *                 description: Modalidad del programa
 *               date_registration:
 *                 type: string
 *                 format: date
 *                 example: "2023-06-20"
 *                 description: Fecha de registro del programa (formato YYYY-MM-DD)
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
router.patch("/update/:id", updateProgram);

/**
 * @swagger
 * /programs/delete/{ObjectId}:
 *   delete:
 *     tags:
 *       - Programas
 *     description: Elimina un programa por su ID
 *     parameters:
 *       - in: path
 *         name: ObjectId
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *           description: ID de la programa a eliminar (formato ObjectID de MongoDB)
 *     responses:
 *       200:
 *         description: Éxito
 *       404:
 *         description: No encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete("/delete/:id", deleteProgram);

module.exports = router;
