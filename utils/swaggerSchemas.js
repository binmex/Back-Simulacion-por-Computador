module.exports = {
  Group: {
    type: "object",
    properties: {
      grupo: {
        type: "string",
        enum: ["grupo1", "grupo2", "grupo3"],
        description: "El nombre del grupo",
      },
      name: {
        type: "string",
        description: "El nombre de la materia del grupo",
      },
      topic: {
        type: "string",
        format: "uuid",
        description: "El ID de la materia asociada con el grupo",
      },
      quotas: {
        type: "integer",
        description: "Los cupos asociados con el grupo",
      },
    },
    required: ["grupo", "topic"],
  },
  Inscription: {
    type: "object",
    properties: {
      student: {
        type: "string",
        format: "uuid",
        description: "El ID del estudiante inscrito",
      },
      group: {
        type: "string",
        format: "uuid",
        description: "El ID del grupo al que está inscrito el estudiante",
      },
      registrationDate: {
        type: "string",
        format: "date-time",
        description: "La fecha de inscripción del estudiante",
      },
      status: {
        type: "string",
        enum: ["Inscrito", "No inscrito", "Cancelado"],
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
        description: "El ID único del estudiante",
      },
      Identification: {
        type: "integer",
        description: "La identificación única del estudiante",
      },
      code: {
        type: "integer",
        description: "El código único del estudiante",
      },
      documentType: {
        type: "string",
        enum: ["CC", "TI", "CE"],
        description: "El tipo de documento del estudiante",
      },
      firstName: {
        type: "string",
        description: "El nombre del estudiante",
      },
      lastName: {
        type: "string",
        description: "El apellido del estudiante",
      },
      birthdate: {
        type: "string",
        format: "date",
        description: "La fecha de nacimiento del estudiante",
      },
      cellphone: {
        type: "integer",
        description: "El número de celular del estudiante",
      },
      email: {
        type: "string",
        description: "El correo electrónico del estudiante",
      },
      state: {
        type: "string",
        enum: ["matriculado", "no matriculado"],
        description: "El estado de matrícula del estudiante",
      },
    },
    required: [
      "id",
      "Identification",
      "code",
      "documentType",
      "firstName",
      "lastName",
    ],
  },
  Topic: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "El ID único de la materia",
      },
      name: {
        type: "string",
        description: "El nombre de la materia",
      },
      aula: {
        type: "string",
        description: "El aula de la materia",
      },
      credits: {
        type: "integer",
        description: "Los créditos de la materia",
      },
      date_registration: {
        type: "string",
        format: "date-time",
        description: "La fecha de registro de la materia",
      },
      state: {
        type: "string",
        enum: ["activo", "inactivo"],
        description: "El estado de la materia",
      },
      quotas: {
        type: "integer",
        description: "Las cuotas de la materia",
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
    ],
  },
};
