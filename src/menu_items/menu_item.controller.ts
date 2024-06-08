import { Context } from "hono";
import { deleteMenuItemService, getMenuItemByIdService, insertMenuItemService, menuItemsService, updateMenuItemService } from "./menu_item.service";

//list menu_items
export const listMenuItems = async (c:Context) => {
    try{
        const menu_items = await menuItemsService();
        if(menu_items == null) return c.text("No menu_items found 😒",404)
        return c.json(menu_items,200)
    }catch  (error:any) {
        return c.text(error?.message,400)
    }
}

//get menu_item by id
export const getMenuItemById = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    const id = parseInt(c.req.param("id"));
    try{
        if(isNaN(id))    return c.text("Invalid ID 😒",400)
        //search for menu_item
        const menu_item = await getMenuItemByIdService(id);
        if(menu_item == undefined) return c.text("Menu_item not found 😒",404)
        return c.json(menu_item,200)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}

//insert menu_item
export const insertMenuItem = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    try {
        const menu_item = await c.req.json();
        const createdMenuItem = await insertMenuItemService(menu_item);
        if(!createdMenuItem) {
            return c.text("Menu_item not created 😒",400) 
        } 
        return c.json(menu_item,201)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}

//update menu_item
export const updateMenuItem = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    const id = Number(c.req.param("id"));
    const menu_item = await c.req.json();
    try{
        if(isNaN(id))  return c.text("Invalid ID 😒",400)
        //search for menu_item
        const existingMenuItem = await getMenuItemByIdService(id);
        if(existingMenuItem == undefined) return c.text("Menu_item not found 😒",404)
        //update menu_item
        const updatedMenuItem = await updateMenuItemService(id,menu_item);
        return c.json({msg: updatedMenuItem},200)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}

//delete menu_item
export const deleteMenuItem = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    const id = Number(c.req.param("id"));
    try{
        if(isNaN(id))  return c.text("Invalid ID 😒",400)
        //search for menu_item
        const existingMenuItem = await getMenuItemByIdService(id);
        if(existingMenuItem == undefined) return c.text("Menu_item not found 😒",404)
        //delete menu_item
        const deletedMenuItem = await deleteMenuItemService(id);
        return c.json({msg: deletedMenuItem},200)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}