const express = require("express");
const router = express.Router();
const {
  createFaculty,
  getAllFaculties,
  deleteFaculty,
  getFacultyById,
  updateFaculty,
  getProgramsByFaculty,
  findById
} = require("../controllers/facultiesControllers");
const Program = require("../models/program-model"); 
/**
 * @swagger
 * tags:
 *   name: Facultades
 *   description: Operaciones relacionadas con facultades
 */

/**
 * @swagger
 * /faculties:
 *   get:
 *     tags:
 *       - Facultades
 *     description: Devuelve todas las facultades
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 */
router.get("/", getAllFaculties);

/**
 * @swagger
 * /faculties/save:
 *   post:
 *     tags:
 *       - Facultades
 *     description: Crea una nueva facultad
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
 *                 description: ID único de la facultad
 *               name:
 *                 type: string
 *                 example: "Facultad de Ingeniería"
 *                 description: Nombre de la facultad
 *               ubication:
 *                 type: string
 *                 example: "Sede Central Tunja–Boyacá–Colombia, Segundo piso, Avenida Central del Norte 39-115"
 *                 description: Ubicación de la facultad
 *               phone:
 *                 type: number
 *                 example: 123456789
 *                 description: Número de teléfono de la facultad
 *               date_registration:
 *                 type: string
 *                 format: date
 *                 example: "2023-06-20"
 *                 description: Fecha de registro de la facultad (formato YYYY-MM-DD)
 *               email:
 *                 type: string
 *                 example: "ingenieria@uptc.edu.co"
 *                 description: Correo electrónico de la facultad
 *               headquarter:
 *                 type: string
 *                 example: "Tunja"
 *                 description: Sede de la facultad
 *     responses:
 *       201:
 *         description: Éxito
 *       400:
 *         description: Solicitud incorrecta
 *       500:
 *         description: Error del servidor
 */
router.post("/save", createFaculty);

/**
 * @swagger
 * /faculties/findById/{objectId}:
 *   get:
 *     tags:
 *       - Facultades
 *     description: Busca una facultad por su ObjectId de MongoDB
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
router.get("/findById/:id", getFacultyById);

/**
 * @swagger
 * /faculties/findById/{objectId}:
 *   get:
 *     tags:
 *       - Facultades
 *     description: Busca una facultad por su ObjectId de MongoDB
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
router.get("/findByObjectId/:id", findById);

/**
 * @swagger
 * /faculties/update/{ObjectId}:
 *   patch:
 *     tags:
 *       - Facultades
 *     description: Actualiza una facultad por su ID de MongoDB
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
 *                 example: "Facultad de Ciencias"
 *                 description: Nombre de la facultad
 *               ubication:
 *                 type: string
 *                 example: "Sede Central Tunja–Boyacá–Colombia, Segundo piso, Avenida Central del Norte 39-115"
 *                 description: Ubicación de la facultad
 *               phone:
 *                 type: number
 *                 example: 123456789
 *                 description: Número de teléfono de la facultad
 *               date_registration:
 *                 type: string
 *                 format: date
 *                 example: "2023-06-20"
 *                 description: Fecha de registro de la facultad (formato YYYY-MM-DD)
 *               email:
 *                 type: string
 *                 example: "ciencias@universidad.edu.co"
 *                 description: Correo electrónico de la facultad
 *               headquarter:
 *                 type: string
 *                 example: "Tunja"
 *                 description: Sede de la facultad
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
router.patch("/update/:id", updateFaculty);

/**
 * @swagger
 * /faculties/delete/{ObjectId}:
 *   delete:
 *     tags:
 *       - Facultades
 *     description: Elimina una facultad por su ID de MongoDB
 *     parameters:
 *       - in: path
 *         name: ObjectId
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *           description: ID de la facultad a eliminar (formato ObjectID de MongoDB)
 *     responses:
 *       200:
 *         description: Éxito
 *       404:
 *         description: No encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete("/delete/:id", deleteFaculty);

/**
 * @swagger
 * /faculties/{id}/programs:
 *   get:
 *     tags:
 *       - Facultades
 *     description: Obtiene todos los programas de una facultad específica
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *           example: "6085e894932ec20015bbf017" # Ejemplo de un ObjectId de MongoDB
 *     responses:
 *       200:
 *         description: Éxito
 *       404:
 *         description: No se encontraron programas para esta facultad
 *       500:
 *         description: Error del servidor
 */
router.get("/:id/programs", getProgramsByFaculty);

/**
 * Endpoint temporal para listar todos los programas
 */
router.get("/all-programs", async (req, res) => {
  try {
    const programs = await Program.find().populate('faculty');
    return res.status(200).json({ success: true, data: programs });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
