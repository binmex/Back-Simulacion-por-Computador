const request = require("supertest");
const app = require("./server-tests");
const Group = require("../models/group-model");
const Topic = require("../models/topic-model");
const mongoose = require("../mongo/connect-db");

jest.mock("../models/group-model");
jest.mock("../models/topic-model");
let server;

beforeAll((done) => {
  server = app.listen(6000, () => {
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

describe("Group Controller Tests", () => {
  describe("save function", () => {
    test("test_save_success", async () => {
      const mockTopic = {
        _id: "topicId",
        name: "Topic Name",
        quotas: 10,
      };
      const mockGroup = {
        grupo: "Group Name",
        name: mockTopic.name,
        topic: mockTopic._id,
        quotas: mockTopic.quotas,
      };
      Topic.findById.mockResolvedValue(mockTopic);
      Group.findOne.mockResolvedValue(null);
      Group.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(mockGroup),
      }));

      const response = await request(app).post("/groups").send({
        topic: mockTopic._id,
        grupo: mockGroup.grupo,
      });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(mockGroup);
    });
  });

  describe("findById function", () => {
    test("test_findById_noGroupFound", async () => {
      const groupId = "No hay data";
      Group.findById.mockResolvedValue(null);

      const response = await request(app).get(`/groups/byId/${groupId}`);

      expect(response.status).toBe(404);
      expect(response.body.state).toBe(false);
      expect(response.body.message).toBe("No encontrado");
    });

    // Add more tests for the successful case
  });

  describe("findByName function", () => {
    test("test_findByName_noGroupFound", async () => {
      const groupName = "Algoritmoswq";
      Group.findOne.mockResolvedValue(null);

      const response = await request(app).get(`/groups/name?name=${groupName}`);

      expect(response.status).toBe(404);
      expect(response.body.state).toBe(false);
      expect(response.body.message).toBe("Grupo no encontrado");
    });
  });
});
