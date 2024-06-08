import { eq } from "drizzle-orm";
import db from "../drizzle/db";

import { TIState, TStateSelect, state_table } from "../drizzle/schema";

export const statesService = async ():Promise<TStateSelect[] | null>=> {
    return await db.query.state_table.findMany();    
}

export const getStateByIdService = async (id:number):Promise<TStateSelect | undefined> => {
    return await db.query.state_table.findFirst({
       where: eq(state_table.state_id, id)
    })
}

export const insertStateService = async(state:TIState) => {
     await db.insert(state_table).values(state)
    // .returning({id:state_table.state_id}
        return "State created successfully 🎉";
}

export const updateStateService = async(id:number,state:TIState) => {
    await db.update(state_table).set(state).where(eq(state_table.state_id,id));
    return "State updated successfully 🎉"
}

export const deleteStateService = async(id:number) => {
    await db.delete(state_table).where(eq(state_table.state_id,id));
    return "State deleted successfully 🎉"
}