import Database from "../database/db";
import request from "supertest";
import app from "../app";
import { IGoal, IUser } from "../../shared";
import cookieParser from "cookie-parser";
import { isAuthenticated } from "../controllers/auth.controller";
import { NextFunction, Request, Response } from "express";

app.use(cookieParser())

jest.mock("../database/db");
jest.mock("../controllers/auth.controller")

const isAuthenticatedMock = isAuthenticated as jest.MockedFunction<typeof isAuthenticated>

// jest.mock(isAuthenticated)
const date = new Date().toString()

// Mock Database class with jest
const mockGOALS: IGoal[] = [{
  id: 1,
  exercise: "push-ups",
  startDate: date,
  endDate: date,
  completed: false,
  type: "reps",
  goal: 10,
}, {
  id: 2,
  exercise: "sit-ups",
  completed: true,
  type: "reps",
  goal: 10,
  startDate: date,
  endDate: date,
}]

const mockSession = {
  user: {
    username: "josh",
    email: "test@gmail.com",
    picture: "link",
    goals: [],
    favourites: [""],
    isAdmin:false
  } as IUser,
  cookie: {
    maxAge: 3600000,
    secure: false,
    httpOnly: true,
    sameSite: 'strict'
  }
};

beforeAll(() => {
  isAuthenticatedMock.mockImplementation(
    (req: Request, res: Response, next: NextFunction) => {
      if (!req.session) return res.sendStatus(401)
      next()
    }
  )

  jest
    .spyOn(Database.prototype, "saveUserGoal")
    .mockImplementation(async (_: string, goal: IGoal): Promise<IGoal> => {
      return goal;
    });

  jest
    .spyOn(Database.prototype, "getUserGoals")
    .mockImplementation(async (email: string): Promise<IGoal[]> => {
      if (email === undefined) return mockGOALS
      return mockGOALS;
    });

});

describe("Testing Goals Routes - POST", () => {
  test("returns 201 and success message when valid goal is provided with a logged in user session", async () => {
    const goal: IGoal = {
      id: 2,
      exercise: "push-ups",
      completed: false,
      type: "reps",
      goal: 10,
      startDate: date,
      endDate: date,
    }
    const res = await request(app)
      .post("/api/goals/")
      .send({ goal: goal })
      .set('Cookie', [`connect.sid=${encodeURIComponent(JSON.stringify(mockSession))}`])
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')

    expect(res.status).toBe(201);
    expect(res.text).toBe("Goal saved successfully");
  });

  test("POST /api/goals/ return 201", async () => {
    const goal: IGoal = {
      id: 2,
      exercise: "push-ups",
      completed: false,
      type: "reps",
      goal: 10,
      startDate: date,
      endDate: date,
    }

    const res = await request(app)
      .post("/api/goals/")
      .send({ goal: goal })
      .set('Cookie', [`connect.sid=${encodeURIComponent(JSON.stringify(mockSession))}`])
    expect(res.status).toBe(201);

  });

  test("POST /api/goals/ - missing goal in body return 400", async () => {
    const res = await request(app)
      .post("/api/goals/")
      .send()
      .set('Cookie', [`connect.sid=${encodeURIComponent(JSON.stringify(mockSession))}`])
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')

    expect(res.status).toBe(400);
  });
});


describe("Testing Goals Routes - GET", () => {
  test("GET /api/goals/ return 201", async () => {

    const res = await request(app)
      .get("/api/goals/")
      .send()
      .set('Cookie', [`connect.sid=${encodeURIComponent(JSON.stringify(mockSession))}`])
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')


    expect(res.status).toBe(201);
    expect(mockGOALS).toEqual(res.body);
  });
})

describe("Testing Goals Routes - PATCH", () => {
  test("Update goal to completed - /api/goals/completed return 201", async () => {
    let goal: IGoal = {
      id: 1,
      type: "reps",
      goal: 10,
      startDate: date,
      endDate: date,
      exercise: "push-ups",
      completed: false,
    }

    jest.spyOn(Database.prototype, "updateGoalCompleted")
      .mockImplementation(async (__: string, _: IGoal) => {
      })

    goal.completed = true
    const res = await request(app)
      .patch("/api/goals/completed").send({
        goal: goal
      })
      .set('Cookie', [`connect.sid=${encodeURIComponent(JSON.stringify(mockSession))}`])
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')



    expect(res.status).toBe(204)
    expect(goal.completed).toEqual(true)
  })

  test("Goal not sent- /api/goals/completed return 400", async () => {
    let goal: IGoal = {
      id: 1,
      type: "reps",
      goal: 10,
      startDate: date,
      endDate: date,
      exercise: "push-ups",
      completed: false,
    }

    jest.spyOn(Database.prototype, "updateGoalCompleted")
      .mockImplementation(async (__: string, _: IGoal) => {
      })

    goal.completed = true
    const res = await request(app)
      .patch("/api/goals/completed").send({})
      .set('Cookie', [`connect.sid=${encodeURIComponent(JSON.stringify(mockSession))}`])
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')


    expect(res.status).toBe(400)
  })
})
