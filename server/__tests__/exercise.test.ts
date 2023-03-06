import Database from "../database/db"
import request from "supertest"
import app from "../app";
import { IExercise, IGoal } from "../../shared";
import e from "express";
jest.mock("../database/db")
// Mock Database class with jest
let exercises: IExercise[] = [
    {
        _id: "1",
        name: "push-ups",
        target: "chest",
        gifUrl: "https://media.giphy.com/media/3o6Zt6Uz6w7QaQhYBa/giphy.gif",
        equipment: "body",
        body_part: "chest"
    }
]
beforeAll(() => {
    for (let i = 0; i < 10; i++) {
        exercises = [...exercises, exercises[0]]
    }
})

describe("Testing Exercise Routes", () => {
    test("GET /api/exercise/ return 200 with all exercises", async () => {
        jest.spyOn(Database.prototype, "getAllExercises")
            .mockImplementation(async (limit: string): Promise<IExercise[]> => {
                if (!limit || limit === "0") limit = exercises.length.toString()
                return exercises.slice(0, parseInt(limit))
            })
        const res = await request(app).get("/api/exercises/").send()
        expect(res.status).toBe(200)
        expect(res.body).toEqual(exercises)
    })

    test("GET /api/exercise/ - limit all exercises to 5 - return 200 ", async () => {
        jest.spyOn(Database.prototype, "getAllExercises")
            .mockImplementation(async (limit: string): Promise<IExercise[]> => {
                if (!limit || limit === "0") limit = exercises.length.toString()
                const res = exercises.slice(0, parseInt(limit))
                return res
            })
        const res = await request(app).get("/api/exercises/?limit=5").send()

        expect(res.status).toBe(200)
        expect(res.body).toEqual(exercises.slice(0, 5))
    })

    test("GET /api/exercise/ - DB Didnt work - return 400 ", async () => {
        jest.spyOn(Database.prototype, "getAllExercises")
            .mockImplementation(async (_: string): Promise<IExercise[]> => {
                throw new Error("DB Error")
            })
        const res = await request(app).get("/api/exercises/?limit=5").send()

        expect(res.status).toBe(400)
    })
})