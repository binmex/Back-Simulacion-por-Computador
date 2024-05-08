const request = require("supertest");
const app = require("./server-tests");
const Student = require("../models/student-model");
const mongoose = require("../mongo/connect-db");

jest.mock("../models/student-model");
let server;

beforeAll((done) => {
  server = app.listen(5000, () => {});
  done();
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

      expect(response.status).toBe(201);
    });
  });

  describe("FindById function", () => {
    test("test_findById_noStudentFound", async () => {
      const studentId = "No hay data";
      Student.findById.mockResolvedValue(null);

      const response = await request(app).get(`/students/byId/${studentId}`);

      expect(response.status).toBe(404);
    });
  });

  describe("FindId Controller Test", () => {
    test("test_findId_studentFound", async () => {
      // Mocking the Student.find function to simulate successful retrieval of data
      const mockData = [{ id: 1, name: "John Doe" }];
      Student.find.mockResolvedValue(mockData);

      // Simulating a request with the ID parameter
      const studentId = 1;
      const response = await request(app).get(`/students/${studentId}`);

      // Expectations for a successful response
      expect(response.status).toBe(200);
      expect(response.body.state).toBe(true);
      expect(response.body.data).toEqual(mockData);
    });

    test("test_findId_studentNotFound", async () => {
      // Mocking the Student.find function to simulate no data found
      Student.find.mockResolvedValue([]);

      // Simulating a request with the ID parameter
      const studentId = "invalidId";
      const response = await request(app).get(`/students/${studentId}`);

      // Expectations for a not found response
      expect(response.status).toBe(404);
      expect(response.body.state).toBe("Usuario no encontrado");
    });

    test("test_findId_databaseError", async () => {
      // Mocking the Student.find function to simulate a database error
      const errorMessage = "Database error";
      Student.find.mockRejectedValue(new Error(errorMessage));

      // Simulating a request with the ID parameter
      const studentId = "validId";
      const response = await request(app).get(`/students/${studentId}`);

      // Expectations for a database error response
      expect(response.status).toBe(500);
      expect(response.body.state).toBe(false);
      expect(response.body.error).toBe(errorMessage);
    });
  });

  describe("FindId function", () => {
    test("test_findId_studentFound", async () => {
      // Mocking the Student.find function to simulate successful retrieval of data
      const mockData = { id: 1, title: "Sample Student" };
      Student.find.mockResolvedValue(mockData);

      // Simulating a request with the StudentId parameter
      const studentId = 1;
      const response = await request(app).get(`/students/${studentId}`);

      // Expectations for a successful response
      expect(response.status).toBe(200);
    });
  });

  describe("Delete Student function", () => {
    test("test_deleteStudent_databaseError", async () => {
      const studentId = "validId";
      const errorMessage = "Database error";
      Student.deleteOne.mockRejectedValue(new Error(errorMessage));

      const response = await request(app).delete(`/students/${studentId}`);

      expect(response.status).toBe(500);
    });
  });
});
