import { Context }  from "hono";
import {  deleteOrderMenuItemsService, getOrderMenuItemsByIdService, insertOrderMenuItemsService, orderMenuItemsService, updateOrderMenuItemsService} from "./order_menu_item.service";  

//list order menu items
export const listOrderMenuItems = async (c:Context) => {
    try{
        const order_menu_items = await orderMenuItemsService();
        if(order_menu_items == null) return c.text("No order menu items found 😒",404)
        return c.json(order_menu_items,200)
    }catch  (error:any) {
        return c.text(error?.message,400)
    }
}

//get order menu item by id
export const getOrderMenuItemById = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    const id = parseInt(c.req.param("id"));
    try{
        if(isNaN(id))    return c.text("Invalid ID 😒",400)
        //search for order menu item
        const order_menu_item = await getOrderMenuItemsByIdService(id);
        if(order_menu_item == undefined) return c.text("Order menu item not found 😒",404)
        return c.json(order_menu_item,200)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}

//insert order menu item
export const insertOrderMenuItem = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    try {
        const order_menu_item = await c.req.json();
        const createdOrderMenuItem = await insertOrderMenuItemsService(order_menu_item);
        if(!createdOrderMenuItem) {
            return c.text("Order menu item not created 😒",400) 
        } 
        return c.json(order_menu_item,201)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}

//update order menu item
export const updateOrderMenuItem = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    const id = Number(c.req.param("id"));
    const order_menu_item = await c.req.json();
    try{
        if(isNaN(id))  return c.text("Invalid ID 😒",400)
        //search for order menu item
        const existingOrderMenuItem = await getOrderMenuItemsByIdService(id);
        if(existingOrderMenuItem == undefined) return c.text("Order menu item not found 😒",404)
        //update order menu item
        const updatedOrderMenuItem = await updateOrderMenuItemsService(id,order_menu_item);
        return c.json({msg: updatedOrderMenuItem},200)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}

//delete order menu item
export const deleteOrderMenuItem = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    const id = Number(c.req.param("id"));
    try{
        if(isNaN(id))  return c.text("Invalid ID 😒",400)
        //search for order menu item
        const existingOrderMenuItem = await getOrderMenuItemsByIdService(id);
        if(existingOrderMenuItem == undefined) return c.text("Order menu item not found 😒",404)
        //delete order menu item
        const deletedOrderMenuItem = await deleteOrderMenuItemsService(id);
        return c.json({msg: deletedOrderMenuItem},200)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}