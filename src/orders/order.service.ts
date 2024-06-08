import { eq } from "drizzle-orm";
import db from "../drizzle/db";

import { TOrder, TOrderSelect, order_table } from "../drizzle/schema";

export const ordersService = async ():Promise<TOrderSelect[] | null>=> {
    return await db.query.order_table.findMany();    
}

export const getOrderByIdService = async (id:number):Promise<TOrderSelect | undefined> => {
    return await db.query.order_table.findFirst({
       where: eq(order_table.order_id, id)
    })
}

export const insertOrderService = async(order:TOrder) => {
     await db.insert(order_table).values(order)
    // .returning({id:order_table.order_id}
        return "Order created successfully 🎉";
}

export const updateOrderService = async(id:number,order:TOrder) => {
    await db.update(order_table).set(order).where(eq(order_table.order_id,id));
    return "Order updated successfully 🎉"
}

export const deleteOrderService = async(id:number) => {
    await db.delete(order_table).where(eq(order_table.order_id,id));
    return "Order deleted successfully 🎉"
}