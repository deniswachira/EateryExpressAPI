import { Context } from "hono";
import { deleteOrderService, getOrderByIdService, insertOrderService, ordersService, updateOrderService } from "./order.service";

//list orders
export const listOrders = async (c:Context) => {
    try{
        const orders = await ordersService();
        if(orders == null) return c.text("No orders found 😒",404)
        return c.json(orders,200)
    }catch  (error:any) {
        return c.text(error?.message,400)
    }
}

//get order by id
export const getOrderById = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    const id = parseInt(c.req.param("id"));
    try{
        if(isNaN(id))    return c.text("Invalid ID 😒",400)
        //search for order
        const order = await getOrderByIdService(id);
        if(order == undefined) return c.text("Order not found 😒",404)
        return c.json(order,200)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}

//insert order
export const insertOrder = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    try {
        const order = await c.req.json();
        const createdOrder = await insertOrderService(order);
        if(!createdOrder) {
            return c.text("Order not created 😒",400) 
        } 
        return c.json(order,201)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}

//update order
export const updateOrder = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    const id = Number(c.req.param("id"));
    const order = await c.req.json();
    try{
        if(isNaN(id))  return c.text("Invalid ID 😒",400)
        //search for order
        const existingOrder = await getOrderByIdService(id);
        if(existingOrder == undefined) return c.text("Order not found 😒",404)
        //update order
        const updatedOrder = await updateOrderService(id,order);
        return c.json({msg: updatedOrder},200)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}

//delete order
export const deleteOrder = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    const id = Number(c.req.param("id"));
    try{
        if(isNaN(id))  return c.text("Invalid ID 😒",400)
        //search for order
        const existingOrder = await getOrderByIdService(id);
        if(existingOrder == undefined) return c.text("Order not found 😒",404)
        //delete order
        const deletedOrder = await deleteOrderService(id);
        return c.json({msg: deletedOrder},200)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}