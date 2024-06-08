import { eq } from "drizzle-orm";
import db from "../drizzle/db";

import { TRestaurantOwner, TRestaurantOwnerSelect, restaurant_owner_table } from "../drizzle/schema";

export const restaurantOwnersService = async ():Promise<TRestaurantOwnerSelect[] | null>=> {
    return await db.query.restaurant_owner_table.findMany();    
}

export const getRestaurantOwnerByIdService = async (id:number):Promise<TRestaurantOwnerSelect | undefined> => {
    return await db.query.restaurant_owner_table.findFirst({
       where: eq(restaurant_owner_table.restaurant_owner_id, id)
    })
}

export const insertRestaurantOwnerService = async(restaurant_owner:TRestaurantOwner) => {
     await db.insert(restaurant_owner_table).values(restaurant_owner)
    // .returning({id:restaurant_owner_table.restaurant_owner_id}
        return "Restaurant owner created successfully 🎉";
}

export const updateRestaurantOwnerService = async(id:number,restaurant_owner:TRestaurantOwner) => {
    await db.update(restaurant_owner_table).set(restaurant_owner).where(eq(restaurant_owner_table.restaurant_owner_id,id));
    return "Restaurant owner updated successfully 🎉"
}

export const deleteRestaurantOwnerService = async(id:number) => {
    await db.delete(restaurant_owner_table).where(eq(restaurant_owner_table.restaurant_owner_id,id));
    return "Restaurant owner deleted successfully 🎉"
}