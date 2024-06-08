import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIUser,TUserSelect, user_table } from "../drizzle/schema";

export const usersService = async ():Promise<TUserSelect[] | null>=> {
    return await db.query.user_table.findMany();    
}

export const getUserByIdService = async (id:number):Promise<TUserSelect | undefined> => {
    return await db.query.user_table.findFirst({
       where: eq(user_table.user_id, id)
    })
}

export const insertUserService = async(user:TIUser) => {
     await db.insert(user_table).values(user)
    // .returning({id:user_table.user_id}
        return "User created successfully 🎉";
}

export const updateUserService = async(id:number,user:TIUser) => {
    await db.update(user_table).set(user).where(eq(user_table.user_id,id));
    return "User updated successfully 🎉"
}

export const deleteUserService = async(id:number) => {
    await db.delete(user_table).where(eq(user_table.user_id,id));
    return "User deleted successfully 🎉"
}
