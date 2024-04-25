const request = require("supertest");
const app = require("../index");
const Topic = require("../models/topic-model");
const mongoose = require("../mongo/connect-db");
const { json } = require("express");

jest.mock("../models/topic-model");

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
      expect(response.body.state).toBe(true);
      expect(response.body.data).toEqual(mockTopic);
    });
  });

  describe("findById function", () => {
    test("test_findById_noTopicFound", async () => {
      const topicId = "No hay data";
      Topic.findById.mockResolvedValue(null);

      const response = await request(app).get(`/topics/byId/${topicId}`);

      expect(response.status).toBe(404);
      expect(response.body.state).toBe(false);
      expect(response.body.message).toBe("No encontrado");
    });
  });

  describe("findId function", () => {
    test("test_findId_noTopicFound", async () => {
      const topicId = "No hay data";
      Topic.findById.mockResolvedValue(null);

      const response = await request(app).get(`/topics/${topicId}`);

      expect(response.status).toBe(404);
      expect(response.body.state).toBe(false);
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
      expect(response.body.state).toBe(true);
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
      expect(response.body.state).toBe(false);
      expect(response.body.error).toBe(errorMessage);
    });
  });

  afterAll(async () => {
    // Cierra la conexión a la base de datos
    await mongoose.disconnect();
  });
});
