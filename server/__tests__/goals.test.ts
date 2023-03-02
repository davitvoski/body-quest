import Database from "../database/db"
import request from "supertest"
import app from "../app";
import { IGoal } from "../../shared";
jest.mock("../database/db")

// Mock Database class with jest

describe("Testing Goals Routes", () => {
    test("POST /api/goals/ return 201", async () => {
        const goal: IGoal = {
            title: "Test Goal",
            exercise: "push-ups",
            completed: false,
            reps: 10
        }

        const res = await request(app).post("/api/goals/").send({
            email: "tesdst@gmail.com",
            goal: goal
        })

        expect(res.status).toBe(201)
    })

    test("POST /api/goals/ - missing email in body return 400", async () => {
        const goal: IGoal = {
            title: "Test Goal",
            exercise: "push-ups",
            completed: false,
            reps: 10
        }

        const res = await request(app).post("/api/goals/").send({
            goal: goal
        })

        expect(res.status).toBe(400)
    })

    test("POST /api/goals/ - missing goal in body return 400", async () => {
        const goal: IGoal = {
            title: "Test Goal",
            exercise: "push-ups",
            completed: false,
            reps: 10
        }

        const res = await request(app).post("/api/goals/").send({
            email: "jest@da.com"
        })

        expect(res.status).toBe(400)
    })


})