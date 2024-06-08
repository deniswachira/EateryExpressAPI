import { eq } from "drizzle-orm";
import db from "../drizzle/db";

import { TOrderStatus, TOrderStatusSelect, order_status_table } from "../drizzle/schema";

export const orderStatusService = async ():Promise<TOrderStatusSelect[] | null>=> {
    return await db.query.order_status_table.findMany();    
}

export const getOrderStatusByIdService = async (id:number):Promise<TOrderStatusSelect | undefined> => {
    return await db.query.order_status_table.findFirst({
       where: eq(order_status_table.order_status_id, id)
    })
}

export const insertOrderStatusService = async(order_status:TOrderStatus) => {
     await db.insert(order_status_table).values(order_status)
    // .returning({id:order_status_table.order_status_id}
        return "Order status created successfully 🎉";
}

export const updateOrderStatusService = async(id:number,order_status:TOrderStatus) => {
    await db.update(order_status_table).set(order_status).where(eq(order_status_table.order_status_id,id));
    return "Order status updated successfully 🎉"
}

export const deleteOrderStatusService = async(id:number) => {
    await db.delete(order_status_table).where(eq(order_status_table.order_status_id,id));
    return "Order status deleted successfully 🎉"
}