import { eq } from "drizzle-orm";
import db from "../drizzle/db";

import { TIAddress, TAddressSelect, address_table } from "../drizzle/schema";

export const addressesService = async ():Promise<TAddressSelect[] | null>=> {
    return await db.query.address_table.findMany();    
}

export const getAddressByIdService = async (id:number):Promise<TAddressSelect | undefined> => {
    return await db.query.address_table.findFirst({
       where: eq(address_table.address_id, id)
    })
}

export const insertAddressService = async(address:TIAddress) => {
     await db.insert(address_table).values(address)
    // .returning({id:address_table.address_id}
        return "Address created successfully 🎉";
}

export const updateAddressService = async(id:number,address:TIAddress) => {
    await db.update(address_table).set(address).where(eq(address_table.address_id,id));
    return "Address updated successfully 🎉"
}

export const deleteAddressService = async(id:number) => {
    await db.delete(address_table).where(eq(address_table.address_id,id));
    return "Address deleted successfully 🎉"
}

