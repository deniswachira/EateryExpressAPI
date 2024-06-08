import { Context } from "hono";
import { zValidator } from "@hono/zod-validator";
import { usersService,getUserByIdService,insertUserService, updateUserService, deleteUserService } from "./user.service";

//list user
export const listUsers = async (c:Context) => {
    try{
    const users = await usersService();
    if(users == null) return c.text("No users found 😒",404)
    return c.json(users,200)
    }catch  (error:any) {
        return c.text(error?.message,400)
    }
}
//get user by id
export const getUserById = async (c:Context) => {
    const id = parseInt(c.req.param("id"));
    try{
    if(isNaN(id))    return c.text("Invalid ID 😒",400)
    const user = await getUserByIdService(id);
    if(user == undefined) return c.text("User not found 😒",404)
    return c.json(user,200)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}
//insert user
export const insertUser = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    try {
      const user = await c.req.json();
    const createdUser = await insertUserService(user);
    if(!createdUser) {
        return c.text("User not created 😒",400) 
    } 
    return c.json(createdUser,201)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
    
}

//update user
export const updateUser = async (c:Context) => {
    const id = Number(c.req.param("id"));
    const user = await c.req.json();
    try{
     if(isNaN(id))  return c.text("Invalid ID 😒",400)
    //search for user
    const existingUser = await getUserByIdService(id);
    if(existingUser == undefined) return c.text("User not found 😒",404)
    //update user
    const updatedUser = await updateUserService(id,user);
    return c.json({msg: updatedUser},200)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}

export const deleteUser = async (c:Context) => {
   const id = Number(c.req.param("id"));
   try{
    if(isNaN(id)) return c.text("Invalid ID 😒",400)
    //search for user
    const existingUser = await getUserByIdService(id);
    if(existingUser == undefined) return c.text("User not found 😒",404)
    //delete user
    const deletedUser = await deleteUserService(id);
    return c.json({msg: deletedUser},200)
   }catch (error:any) {
    return c.text(error?.message,400)
   }
}