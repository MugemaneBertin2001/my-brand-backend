import request from "supertest";
import { loginData, userData } from "../src/data/statics";
import UserModel from "../src/models/userModel";
import BlogModel from "../src/models/blogModel";
import MessageModel from "../src/models/messageModel";
import LikeModel from "../src/models/likesModel";
import CommentModel from "../src/models/commentModel";
import { App } from './../src/app';

const app = new App()

// function to register and login user
export async function registerAndLoginUser() {
  // Register user
  const { body: registerResponse } = await request(app.getApp())
    .post("/api/v1/users/register")
    .send(userData)
    .expect(201);
  expect(registerResponse.message).toStrictEqual(
    "User registered successfully"
  );

  // Login user
  const { body: loginResponse } = await request(app.getApp())
    .post("/api/v1/users/login")
    .send(loginData)
    .expect(200);
  expect(loginResponse.token).toBeDefined();

  return loginResponse.token;
}

export async function beforeAllHook() {
   await app.connectDBForTesting()
}

export async function afterAllHook() {
  await UserModel.deleteMany();
  await MessageModel.deleteMany();
  await BlogModel.deleteMany();
  await CommentModel.deleteMany();
  await LikeModel.deleteMany();
}