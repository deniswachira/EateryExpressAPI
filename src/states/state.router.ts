import {Hono} from "hono"
import { deleteState, getStateById, getStateWithCities, insertState, listAllStates, updateState } from "./state.controller";

export const stateRouter = new Hono();

//get all states
stateRouter.get('/state', listAllStates)

//get state by id
stateRouter.get('/state/:id', getStateById)

//insert state
stateRouter.post('/state', insertState)

//update state
stateRouter.put('/state/:id', updateState)

//delete state
stateRouter.delete("/state/:id", deleteState)

stateRouter.get("/state-with-cities", getStateWithCities)
