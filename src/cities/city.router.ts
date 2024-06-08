import {Hono} from "hono"
import { deleteCity, getCityById, insertCity, listAllCities, updateCity } from "./city.controller";

export const cityRouter = new Hono();

//get all cities
cityRouter.get('/cities', listAllCities)

//get city by id
cityRouter.get('/cities/:id', getCityById)

//insert city
cityRouter.post('/cities', insertCity)

//update city
cityRouter.put('/cities/:id', updateCity)

//delete city
cityRouter.delete('/cities/:id', deleteCity)