import { Context } from "hono";
import { deleteStateService, getStateByIdService, insertStateService, statesService, updateStateService } from "./state.service";

//list of states
export const listAllStates = async (c: Context) => {
    try {
        const states = await statesService();
        if (states === null) return c.text("No states found");
        return c.json(states, 200);
    } catch (error: any) {
        return c.text("Error while fetching states");
    }
}

//get state by id
export const getStateById = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    try {
        if (isNaN(id)) return c.text("Invalid ID", 400);
        //search for state    
        const state = await getStateByIdService(id);   
        if (state === undefined) return c.text("State not found", 404);
        return c.json(state, 200);
    } catch (error: any) {
        return c.text(error?.message, 400);
    }
}

//insert state
export const insertState = async (c: Context) => {
    try {
        const state = await c.req.json();
        const createdState = await insertStateService(state);
        if (!createdState) {
            return c.json({msg: createdState}, 400);
        }
        return c.json(state, 201);
    } catch (error: any) {
        return c.text(error?.message, 400);
    }
}

//update state
export const updateState = async (c: Context) => {
    // return c.text("Not implemented yet", 501);
    const id = Number(c.req.param("id"));
    const state = await c.req.json();
    try {
        if (isNaN(id)) return c.text("Invalid ID", 400);
        //search for state
        const existingState = await getStateByIdService(id);
        if (existingState === undefined) return c.text("State not found", 404);
        //update state
        const updatedState = await updateStateService(id, state);
        return c.json({ msg: updatedState }, 200);
    } catch (error: any) {
        return c.text(error?.message, 400);
    }
}

//delete state
export const deleteState = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    try {
        if (isNaN(id)) return c.text("Invalid ID", 400);
        //search for state
        const existingState = await getStateByIdService(id);
        if (existingState === undefined) return c.text("State not found", 404);
        //delete state
        const deletedState = await deleteStateService(id);
        return c.json({ msg: deletedState }, 200);
    } catch (error: any) {
        return c.text(error?.message, 400);
    }
}