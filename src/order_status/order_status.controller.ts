import { Context } from "hono";
import { deleteOrderStatusService, getOrderStatusByIdService, insertOrderStatusService, orderStatusService, updateOrderStatusService } from "./order_status.service";


//list orders
export const listOrdersStatus = async (c:Context) => {
    try{
        const orders = await orderStatusService();
        if(orders == null) return c.text("No orders found 😒",404)
        return c.json(orders,200)
    }catch  (error:any) {
        return c.text(error?.message,400)
    }
}

//get order by id
export const getOrderStatusById = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    const id = parseInt(c.req.param("id"));
    try{
        if(isNaN(id))    return c.text("Invalid ID 😒",400)
        //search for order
        const order = await getOrderStatusByIdService(id);
        if(order == undefined) return c.text("Order not found 😒",404)
        return c.json(order,200)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}

//insert order
export const insertOrderStatus = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    try {
        const order = await c.req.json();
        const createdOrder = await insertOrderStatusService(order);
        if(!createdOrder) {
            return c.text("Order not created 😒",400) 
        } 
        return c.json(order,201)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}

//update order
export const updateOrderStatus = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    const id = Number(c.req.param("id"));
    const order = await c.req.json();
    try{
        if(isNaN(id))  return c.text("Invalid ID 😒",400)
        //search for order
        const existingOrder = await getOrderStatusByIdService(id);
        if(existingOrder == undefined) return c.text("Order not found 😒",404)
        //update order
        const updatedOrder = await updateOrderStatusService(id,order);
        return c.json({msg: updatedOrder},200)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}

//delete order
export const deleteOrderStatus = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    const id = Number(c.req.param("id"));
    try{
        if(isNaN(id)) return c.text("Invalid ID 😒",400)
        const deletedOrder = await deleteOrderStatusService(id);
        return c.json({msg: deletedOrder},200)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}