import Database from "../database/db"
import request from "supertest"
import app from "../app";
import { IGoal } from "../../shared";
jest.mock("../database/db")

const date = new Date().toString()

// Mock Database class with jest
const mockGOALS: IGoal[] = [{
    id: 1,
    exercise: "push-ups",
    completed: false,
    reps: 10,
    startDate: date,
    endDate: date
}, {
    id: 2,
    exercise: "sit-ups",
    completed: true,
    reps: 10,
    time: 4,
    startDate: date,
    endDate: date,
    weight: 25
}]

beforeAll(() => {
    jest.spyOn(Database.prototype, "saveUserGoal")
        .mockImplementation(async (_: string, goal: IGoal): Promise<IGoal> => {
            return goal
        })

    jest.spyOn(Database.prototype, "getUserGoals")
        .mockImplementation(async (_: string): Promise<IGoal[]> => {
            return mockGOALS
        })
})

describe("Testing Goals Routes - POST", () => {
    test("POST /api/goals/ return 201", async () => {
        const goal: IGoal = {
            id: 2,
            exercise: "push-ups",
            completed: false,
            reps: 10,
            startDate: date,
            endDate: date,
        }

        const res = await request(app).post("/api/goals/").send({
            email: "tesdst@gmail.com",
            goal: goal
        })

        expect(res.status).toBe(201)
    })

    test("POST /api/goals/ - missing email in body return 400", async () => {
        const goal: IGoal = {
            id: 1,
            exercise: "push-ups",
            completed: false,
            reps: 10,
            startDate: date,
            endDate: date,

        }

        const res = await request(app).post("/api/goals/").send({
            goal: goal
        })

        expect(res.status).toBe(400)
    })

    test("POST /api/goals/ - missing goal in body return 400", async () => {
        const goal: IGoal = {
            id: 1,
            startDate: date,
            endDate: date,
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


describe("Testing Goals Routes - GET", () => {
    test("GET /api/goals/ return 201", async () => {
        const emailSent = "test@gmail.com"

        const res = await request(app).get("/api/goals/").send({
            email: "tesdst@gmail.com",
        })

        expect(res.status).toBe(201)
        expect(mockGOALS).toEqual(res.body)
    })

    test("GET /api/goals/ - email wasnt sent- return 400", async () => {
        const emailSent = "test@gmail.com"

        const res = await request(app).get("/api/goals/").send({
        })

        expect(res.status).toBe(400)
    })

})