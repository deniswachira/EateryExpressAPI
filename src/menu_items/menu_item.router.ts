import { Hono } from "hono";
import { deleteMenuItem, getMenuItemById, insertMenuItem, listMenuItems, updateMenuItem } from "./menu_item.controller";

export const menuItemRouter = new Hono()

//get all menu items
menuItemRouter.get("/menu-item", listMenuItems)

//get menu item by id
menuItemRouter.get("/menu-item/:id", getMenuItemById)

//insert menu item
menuItemRouter.post("/menu-item", insertMenuItem)

//update   menu item 
menuItemRouter.put("/menu-item/:id", updateMenuItem )

//delete
menuItemRouter.delete("/menu-item/:id", deleteMenuItem)
