const request = require("supertest");
const app = require("../index");
const Student = require("../models/student-model");
const mongoose = require("../mongo/connect-db");

jest.mock("../models/student-model");

describe("Students Controller Tests", () => {
  describe("Save function", () => {
    test("test_save_success", async () => {
      const mockStudent = {
        title: "New Student",
        description: "Create a new student",
      };
      Student.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(mockStudent),
      }));

      const response = await request(app).post("/students").send(mockStudent);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(mockStudent);
    });
  });

  describe("FindById function", () => {
    test("test_findById_noStudentFound", async () => {
      const studentId = "No hay data";
      Student.findById.mockResolvedValue(null);

      const response = await request(app).get(`/students/byId/${studentId}`);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("No encontrado");
    });
  });

  describe("FindId function", () => {
    test("test_findId_noStudentFound", async () => {
      const studentId = "No hay data";
      Student.findById.mockResolvedValue(null);

      const response = await request(app).get(`/students/${studentId}`);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("No encontrado");
    });

    test("test_findId_studentFound", async () => {
      // Mocking the Student.find function to simulate successful retrieval of data
      const mockData = { id: 1, title: "Sample Student" };
      Student.find.mockResolvedValue(mockData);

      // Simulating a request with the StudentId parameter
      const studentId = 1;
      const response = await request(app).get(`/students/${studentId}`);

      // Expectations for a successful response
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(mockData);
    });
  });

  describe("Delete Student function", () => {
    test("test_deleteStudent_databaseError", async () => {
      const studentId = "validId";
      const errorMessage = "Database error";
      Student.deleteOne.mockRejectedValue(new Error(errorMessage));

      const response = await request(app).delete(`/students/${studentId}`);

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe(errorMessage);
    });
  });

  afterAll(async () => {
    // Cierra la conexión a la base de datos
    await mongoose.disconnect();
  });
});
