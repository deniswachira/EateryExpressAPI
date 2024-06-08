import { eq } from "drizzle-orm";
import db from "../drizzle/db";

import { TDriver, TDriverSelect, driver_table } from "../drizzle/schema";

export const driversService = async ():Promise<TDriverSelect[] | null>=> {
    return await db.query.driver_table.findMany();    
}

export const getDriverByIdService = async (id:number):Promise<TDriverSelect | undefined> => {
    return await db.query.driver_table.findFirst({
       where: eq(driver_table.driver_id, id)
    })
}

export const insertDriverService = async(driver:TDriver) => {
     await db.insert(driver_table).values(driver)
    // .returning({id:driver_table.driver_id}
        return "Driver created successfully 🎉";
}

export const updateDriverService = async(id:number,driver:TDriver) => {
    await db.update(driver_table).set(driver).where(eq(driver_table.driver_id,id));
    return "Driver updated successfully 🎉"
}

export const deleteDriverService = async(id:number) => {
    await db.delete(driver_table).where(eq(driver_table.driver_id,id));
    return "Driver deleted successfully 🎉"
}