import { eq } from "drizzle-orm";
import db from "../drizzle/db";

import { TMenuItem, TMenuItemSelect, menu_item_table } from "../drizzle/schema";

export const menuItemsService = async ():Promise<TMenuItemSelect[] | null>=> {
    return await db.query.menu_item_table.findMany();    
}

export const getMenuItemByIdService = async (id:number):Promise<TMenuItemSelect | undefined> => {
    return await db.query.menu_item_table.findFirst({
       where: eq(menu_item_table.menu_item_id, id)
    })
}

export const insertMenuItemService = async(menu_item:TMenuItem) => {
     await db.insert(menu_item_table).values(menu_item)
    // .returning({id:menu_item_table.menu_item_id}
        return "Menu item created successfully 🎉";
}

export const updateMenuItemService = async(id:number,menu_item:TMenuItem) => {
    await db.update(menu_item_table).set(menu_item).where(eq(menu_item_table.menu_item_id,id));
    return "Menu item updated successfully 🎉"
}

export const deleteMenuItemService = async(id:number) => {
    await db.delete(menu_item_table).where(eq(menu_item_table.menu_item_id,id));
    return "Menu item deleted successfully 🎉"
}