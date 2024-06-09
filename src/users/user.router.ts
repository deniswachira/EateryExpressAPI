import {Hono} from "hono"
import { listUsers,getUserById,insertUser, updateUser, deleteUser } from "./user.controller";
import { zValidator } from "@hono/zod-validator";
import { createUserValidator } from "../validators/user.validator";

export const userRouter = new Hono();
//get all users
userRouter.get('/users', listUsers)

//get user by id
userRouter.get('/users/:id', getUserById)

//insert user
userRouter.post('/users',zValidator('json',createUserValidator,(result,c)=>{
    if(!result.success) return c.text( result.error.message + "😒",400)}), 
    insertUser)

//update user
userRouter.put('/users/:id', updateUser)

//delete user
userRouter.delete('/users/:id', deleteUser)