import { Context } from "hono";
import { citiesService, deleteCityService, getCityByIdService, insertCityService, updateCityService } from "./city.service";


//list of cities
export const listAllCities = async (c: Context) => {
    try {
        const cities = await citiesService();
        if (cities === null) return c.text("No cities found");
        return c.json(cities, 200);
    } catch (error: any) {
        return c.text("Error while fetching cities");
    }
}

//get city by id
export const getCityById = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    try {
        if (isNaN(id)) return c.text("Invalid ID", 400);
        //search for city    
        const city = await getCityByIdService(id);   
        if (city === undefined) return c.text("City not found", 404);
        return c.json(city, 200);
    } catch (error: any) {
        return c.text(error?.message, 400);
    }
}

//insert city
export const insertCity = async (c: Context) => {
    try {
        const city = await c.req.json();
        const createdCity = await insertCityService(city);
        if (!createdCity) {
            return c.json({msg: createdCity}, 400);
        }
        return c.json(city, 201);
    } catch (error: any) {
        return c.text(error?.message, 400);
    }
}

//update city
export const updateCity = async (c: Context) => {
    // return c.text("Not implemented yet", 501);
    const id = Number(c.req.param("id"));
    const city = await c.req.json();
    try {
        if (isNaN(id)) return c.text("Invalid ID", 400);
        //search for city
        const existingCity = await getCityByIdService(id);
        if (existingCity === undefined) return c.text("City not found", 404);
        //update city
        const updatedCity = await updateCityService(id, city);
        return c.json({ msg: updatedCity }, 200);
    } catch (error: any) {
        return c.text(error?.message, 400);
    }
}

//delete city
export const deleteCity = async (c: Context) => {
    // return c.text("Not implemented yet", 501);
    const id = Number(c.req.param("id"));
    try {
        //delete city
        const deletedCity = await deleteCityService(id);
        return c.json({ msg: deletedCity }, 200);
    } catch (error: any) {
        return c.text(error?.message, 400);
    }
}