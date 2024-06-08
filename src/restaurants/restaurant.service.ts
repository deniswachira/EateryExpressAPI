import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TRestaurant, TRestaurantSelect, restaurant_table } from "../drizzle/schema";


export const restaurantsService = async ():Promise<TRestaurantSelect[] | null>=> {
    return await db.query.restaurant_table.findMany();    
}

export const getRestaurantByIdService = async (id:number):Promise<TRestaurantSelect | undefined> => {
    return await db.query.restaurant_table.findFirst({
       where: eq(restaurant_table.restaurant_id, id)
    })
}

export const insertRestaurantService = async(restaurant:TRestaurant) => {
     await db.insert(restaurant_table).values(restaurant)
    // .returning({id:restaurant_table.restaurant_id}
        return "Restaurant created successfully 🎉";
}

export const updateRestaurantService = async(id:number,restaurant:TRestaurant) => {
    await db.update(restaurant_table).set(restaurant).where(eq(restaurant_table.restaurant_id,id));
    return "Restaurant updated successfully 🎉"
}

export const deleteRestaurantService = async(id:number) => {
    await db.delete(restaurant_table).where(eq(restaurant_table.restaurant_id,id));
    return "Restaurant deleted successfully 🎉"
}