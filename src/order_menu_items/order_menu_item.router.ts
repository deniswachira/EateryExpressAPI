import {Hono} from 'hono'
import { getOrderMenuItemById, insertOrderMenuItem, listOrderMenuItems } from  './order_menu_item.controller'

export const orderMenuItemRouter = new Hono();

//list order menu items
orderMenuItemRouter.get("/order_menu_items",listOrderMenuItems);

//get order menu item by id
orderMenuItemRouter.get("/order_menu_items/:id",getOrderMenuItemById);

//insert order menu item
orderMenuItemRouter.post("/order_menu_items",insertOrderMenuItem);

//update order menu item
orderMenuItemRouter.put("/order_menu_items/:id",insertOrderMenuItem);

//delete order menu item
orderMenuItemRouter.delete("/order_menu_items/:id",insertOrderMenuItem);