module.exports = {
  Faculty: {
    type: "object",
    properties: {
      id: {
        type: "number",
        example: 1,
        description: "ID único de la facultad",
      },
      name: {
        type: "string",
        example: "Facultad de Ingeniería",
        description: "Nombre de la facultad",
      },
      ubication: {
        type: "string",
        example:
          "Sede Central Tunja–Boyacá–Colombia, Segundo piso, Avenida Central del Norte 39-115",
        description: "Ubicación de la facultad",
      },
      phone: {
        type: "number",
        example: 123456789,
        description: "Número de teléfono de la facultad",
      },
      date_registration: {
        type: "string",
        format: "date",
        example: "2023-06-20",
        description: "Fecha de registro de la facultad (formato YYYY-MM-DD)",
      },
      email: {
        type: "string",
        example: "ingenieria@uptc.edu.co",
        description: "Correo electrónico de la facultad",
      },
      headquarter: {
        type: "string",
        example: "Tunja",
        description: "Sede de la facultad",
      },
    },
    required: [
      "id",
      "name",
      "ubication",
      "phone",
      "date_registration",
      "email",
      "headquarter",
    ],
  },
  Program: {
    type: "object",
    properties: {
      id: {
        type: "number",
        example: 1,
        description: "ID único del programa",
      },
      name: {
        type: "string",
        example: "Ingeniería de Sistemas",
        description: "Nombre del programa",
      },
      snies_code: {
        type: "string",
        example: "123456",
        description: "Código SNIES del programa",
      },
      faculty: {
        type: "string",
        format: "objectId",
        example: "60d0fe4f5311236168a109ca",
        description: "ID de la facultad a la que pertenece el programa",
      },
      location: {
        type: "string",
        enum: ["Tunja", "Duitama", "Sogamoso", "Chiquinquirá", "Aguazul"],
        example: "Tunja",
        description: "Ubicación del programa",
      },
      modality: {
        type: "string",
        description: "Modalidad del programa",
        enum: ["Virtual", "Distancia", "Presencial"],
        example: "Presencial",
      },
      date_registration: {
        type: "string",
        format: "date",
        example: "2023-06-20",
        description: "Fecha de registro del programa (formato YYYY-MM-DD)",
      },
    },
    required: [
      "id",
      "name",
      "snies_code",
      "faculty",
      "location",
      "modality",
      "date_registration",
    ],
  },
  Group: {
    type: "object",
    properties: {
      name: {
        type: "string",
        example: "Grupo de Matemáticas",
        description: "El nombre del grupo",
      },
      grupo: {
        type: "string",
        enum: ["grupo 60", "grupo 61", "grupo 62"],
        example: "grupo 60",
        description: "El grupo específico",
      },
      topic: {
        type: "string",
        format: "objectId",
        example: "60d0fe4f5311236168a109ca",
        description: "El ID de la materia asociada con el grupo",
      },
      quotas: {
        type: "integer",
        example: 30,
        description: "Los cupos asociados con el grupo",
      },
    },
    required: ["name", "grupo", "topic", "quotas"],
  },
  Inscription: {
    type: "object",
    properties: {
      student: {
        type: "string",
        format: "objectId",
        example: "60d0fe4f5311236168a109ca",
        description: "El ID del estudiante inscrito",
      },
      group: {
        type: "string",
        format: "objectId",
        example: "60d0fe4f5311236168a109ca",
        description: "El ID del grupo al que está inscrito el estudiante",
      },
      registrationDate: {
        type: "string",
        format: "date-time",
        example: "2023-06-20T15:30:00Z",
        description: "La fecha de inscripción del estudiante",
      },
      status: {
        type: "string",
        enum: ["Inscrito", "No inscrito", "Cancelado"],
        example: "Inscrito",
        description: "El estado de la inscripción",
      },
    },
    required: ["student", "group", "registrationDate", "status"],
  },
  Student: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        example: 1,
        description: "El ID único del estudiante",
      },
      Identification: {
        type: "integer",
        example: 12345678,
        description: "La identificación única del estudiante",
      },
      code: {
        type: "integer",
        example: 87654321,
        description: "El código único del estudiante",
      },
      documentType: {
        type: "string",
        enum: ["CC", "TI", "CE"],
        example: "CC",
        description: "El tipo de documento del estudiante",
      },
      firstName: {
        type: "string",
        example: "Juan",
        description: "El nombre del estudiante",
      },
      lastName: {
        type: "string",
        example: "Pérez",
        description: "El apellido del estudiante",
      },
      birthdate: {
        type: "string",
        format: "date",
        example: "2000-01-01",
        description: "La fecha de nacimiento del estudiante",
      },
      cellphone: {
        type: "integer",
        example: 3001234567,
        description: "El número de celular del estudiante",
      },
      email: {
        type: "string",
        example: "juan.perez@universidad.edu.co",
        description: "El correo electrónico del estudiante",
      },
      state: {
        type: "string",
        enum: ["matriculado", "no matriculado"],
        example: "matriculado",
        description: "El estado de matrícula del estudiante",
      },
      program: {
        type: "string",
        format: "objectId",
        example: "60d0fe4f5311236168a109ca",
        description: "El ID del programa al que pertenece el estudiante",
      },
      profile_picture: {
        type: "string",
        example: "https://example.com/imagen.jpg",
        description: "La URL de la foto de perfil del estudiante",
      },
    },
    required: [
      "id",
      "Identification",
      "code",
      "documentType",
      "firstName",
      "lastName",
      "program",
    ],
  },
  Topic: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        example: 1,
        description: "El ID único de la materia",
      },
      name: {
        type: "string",
        example: "Matemáticas",
        description: "El nombre de la materia",
      },
      aula: {
        type: "string",
        example: "Aula 101",
        description: "El aula de la materia",
      },
      credits: {
        type: "integer",
        example: 3,
        description: "Los créditos de la materia",
      },
      date_registration: {
        type: "string",
        format: "date",
        example: "2023-06-20",
        description: "La fecha de registro de la materia",
      },
      state: {
        type: "string",
        enum: ["activo", "inactivo"],
        example: "activo",
        description: "El estado de la materia",
      },
      quotas: {
        type: "integer",
        example: 30,
        description: "Las cuotas de la materia",
      },
      program: {
        type: "string",
        format: "objectId",
        example: "60d0fe4f5311236168a109ca",
        description: "El ID del programa al que pertenece la materia",
      },
    },
    required: [
      "id",
      "name",
      "aula",
      "credits",
      "date_registration",
      "state",
      "quotas",
      "program",
    ],
  },
};
