const request = require("supertest");
const app = require("./server-tests");
const Topic = require("../models/topic-model");
const mongoose = require("../mongo/connect-db");

jest.mock("../models/topic-model");
let server;

beforeAll((done) => {
  server = app.listen(7000, () => {
    done();
  });
});

afterAll((done) => {
  server.close(() => {
    mongoose.connection
      .close()
      .then(() => {
        done();
      })
      .catch((error) => {
        console.log("Failed to close the DB connection", error);
        done();
      });
  });
});

describe("Topic Controller Tests", () => {
  describe("save function", () => {
    test("test_save_success", async () => {
      const mockTopic = {
        title: "New Topic",
        description: "A new topic description",
      };
      Topic.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(mockTopic),
      }));

      const response = await request(app).post("/topics").send(mockTopic);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(mockTopic);
    });
  });

  describe("findById function", () => {
    test("test_findById_noTopicFound", async () => {
      const topicId = "No hay data";
      Topic.findById.mockResolvedValue(null);

      const response = await request(app).get(`/topics/byId/${topicId}`);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("No encontrado");
    });
  });

  describe("findId function", () => {
    test("test_findId_noTopicFound", async () => {
      const topicId = "No hay data";
      Topic.findById.mockResolvedValue(null);

      const response = await request(app).get(`/topics/${topicId}`);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("No encontrado");
    });

    test("test_findId_TopicFound", async () => {
      // Mocking the Topic.find function to simulate successful retrieval of data
      const mockData = { id: 1, title: "Sample Topic" };
      Topic.find.mockResolvedValue(mockData);

      // Simulating a request with the topicId parameter
      const topicId = 1;
      const response = await request(app).get(`/topics/${topicId}`);

      // Expectations for a successful response
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(mockData);
    });
  });

  describe("deleteTopic function", () => {
    test("test_deleteTopic_databaseError", async () => {
      const topicId = "validId";
      const errorMessage = "Database error";
      Topic.deleteOne.mockRejectedValue(new Error(errorMessage));

      const response = await request(app).delete(`/topics/${topicId}`);

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe(errorMessage);
    });
  });
  describe("update function", () => {
    test("test_update_success", async () => {
      const mockTopic = {
        id: 19,
        name: "simss",
        aula: "BINF-9",
        credits: 4,
        date_registration: "2020-09-21",
        state: "activo",
        quotas: 25,
      };
      const mockUpdateResponse = {
        matchedCount: 1,
        modifiedCount: 1,
      };
      Topic.updateOne.mockResolvedValue(mockUpdateResponse);

      const response = await request(app).patch("/topics/1").send(mockTopic);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(mockUpdateResponse);
    });

    test("test_update_noTopicFound", async () => {
      const mockTopic = {
        title: "Updated Topic",
        description: "Updated topic description",
      };
      const mockUpdateResponse = {
        matchedCount: 0,
        modifiedCount: 0,
      };
      // Mock de la función updateOne para simular que no se encontró ningún tema para actualizar
      Topic.updateOne.mockResolvedValue(mockUpdateResponse);

      // Envía una solicitud para actualizar un tema que no se encuentra
      const response = await request(app)
        .patch("/topics/1") // Esta ruta puede variar según la configuración de tu aplicación
        .send(mockTopic);

      // Verifica que la respuesta sea la esperada
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("No encontrado");
    });
  });
});
