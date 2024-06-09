import { eq } from "drizzle-orm";
import db from "../drizzle/db";

import { TICity, TCitySelect, city_table } from "../drizzle/schema";

export const citiesService = async ():Promise<TCitySelect[] | null>=> {
    return await db.query.city_table.findMany();    
}

export const getCityByIdService = async (id:number):Promise<TCitySelect | undefined> => {
    return await db.query.city_table.findFirst({
       where: eq(city_table.city_id, id)
    })
}

export const insertCityService = async(city:TICity) => {
     await db.insert(city_table).values(city)
    // .returning({id:city_table.city_id}
        return "City created successfully 🎉";
}

export const updateCityService = async(id:number,city:TICity) => {
    await db.update(city_table).set(city).where(eq(city_table.city_id,id));
    return "City updated successfully 🎉"
}

export const deleteCityService = async(id:number) => {
    await db.delete(city_table).where(eq(city_table.city_id,id));
    return "City deleted successfully 🎉"
}

export const getCitiesWithRestaurantsService = async() => {
    return await db.query.city_table.findMany({
        with:{
            // list colums
            restaurants:true
          }
    })
}

export const getCityWithStateService = async() => {
    return await db.query.city_table.findMany({
        with:{
            state:true
        }
    })
}

