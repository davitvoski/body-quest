import Database from "../database/db";
import request from "supertest";
import app from "../app";
import { IUser } from "../../shared";
import cookieParser from "cookie-parser";
import { NextFunction, Request, Response } from "express";
import { addProfilePictureToAzure } from "../controllers/azure";
import { isAuthenticated } from "../controllers/auth.controller";

app.use(cookieParser())

jest.mock("../database/db");
jest.mock("../controllers/azure")
jest.mock("../controllers/auth.controller")


let user: IUser = {
    username: "josh",
    email: "josh@gmail.com",
    picture: "link",
    goals: [],
    favourites: [""],
    isAdmin: false
}
const mockSession = {
    user: user,
    cookie: {
        maxAge: 3600000,
        secure: false,
        httpOnly: true,
        sameSite: 'strict'
    }
};

const addProfilePictureToAzureMock = addProfilePictureToAzure as jest.MockedFunction<typeof addProfilePictureToAzure>
const isAuthenticatedMock = isAuthenticated as jest.MockedFunction<typeof isAuthenticated>


beforeAll(() => {
    isAuthenticatedMock.mockImplementation(
        (req: Request, res: Response, next: NextFunction) => {
            if (!req.session) return res.sendStatus(401)
            next()
        }
    )

    addProfilePictureToAzureMock.mockImplementation(
        async (file: string, username: string, oldBlob: string) => {
            return `${file}${username}${oldBlob}`
        }
    )
    jest
        .spyOn(Database.prototype, "getUser")
        .mockImplementation(async (_: string) => {
            return user;
        });

});

describe("Testing User Routes - PATCH", () => {
    test("returns 200, user updated", async () => {
        jest
            .spyOn(Database.prototype, "updateUserInformation")
            .mockImplementation(async (newUsername: string, newImage: string, _: string) => {
                user = { ...user, username: newUsername, picture: newImage }
            });
        const newImage = "newImage"
        const newUsername = "newUsername"
        const res = await request(app)
            .patch("/api/users")
            .send({ avatar: newImage, username: newUsername })
            .set('Cookie', [`connect.sid=${encodeURIComponent(JSON.stringify(mockSession))}`])
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')

        expect(res.status).toBe(200);
    });

    test("returns 400, database failed", async () => {
        jest
            .spyOn(Database.prototype, "updateUserInformation")
            .mockImplementation(async (___: string, __: string, _: string) => {
                console.log("Dont worry about the error below, this is expected")
                throw new Error("Datbase Failed")
            });

        const newImage = "newImage"
        const newUsername = "newUsername"
        const res = await request(app)
            .patch("/api/users")
            .send({ avatar: newImage, username: newUsername })
            .set('Cookie', [`connect.sid=${encodeURIComponent(JSON.stringify(mockSession))}`])
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')

        expect(res.status).toBe(400);
    });

});
