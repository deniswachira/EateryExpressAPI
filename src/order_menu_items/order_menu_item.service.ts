import { eq } from "drizzle-orm";
import db from "../drizzle/db";

import { TOrderMenu, TOrderMenuSelect, order_menu_table } from "../drizzle/schema";

export const orderMenuItemsService = async ():Promise<TOrderMenuSelect[] | null>=> {
    return await db.query.order_menu_table.findMany();    
}

export const getOrderMenuItemsByIdService = async (id:number):Promise<TOrderMenuSelect | undefined> => {
    return await db.query.order_menu_table.findFirst({
       where: eq(order_menu_table.order_menu_id, id)
    })
}

export const insertOrderMenuItemsService = async(order_menu:TOrderMenu) => {
     await db.insert(order_menu_table).values(order_menu)
    // .returning({id:order_menu_table.order_menu_id}
        return "Order menu item created successfully 🎉";
}

export const updateOrderMenuItemsService = async(id:number,order_menu:TOrderMenu) => {
    await db.update(order_menu_table).set(order_menu).where(eq(order_menu_table.order_menu_id,id));
    return "Order menu item updated successfully 🎉"
}

export const deleteOrderMenuItemsService = async(id:number) => {
    await db.delete(order_menu_table).where(eq(order_menu_table.order_menu_id,id));
    return "Order menu item deleted successfully 🎉"
}