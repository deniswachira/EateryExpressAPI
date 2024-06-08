import { Context } from "hono";
import { deleteRestaurantService, getRestaurantByIdService, insertRestaurantService, restaurantsService, updateRestaurantService } from "./restaurant.service";

//list restaurants
export const listRestaurants = async (c:Context) => {
    try{
        const restaurants = await restaurantsService();
        if(restaurants == null) return c.text("No restaurants found 😒",404)
        return c.json(restaurants,200)
    }catch  (error:any) {
        return c.text(error?.message,400)
    }
}

//get restaurant by id
export const getRestaurantById = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    const id = parseInt(c.req.param("id"));
    try{
        if(isNaN(id))    return c.text("Invalid ID 😒",400)
        //search for restaurant
        const restaurant = await getRestaurantByIdService(id);
        if(restaurant == undefined) return c.text("Restaurant not found 😒",404)
        return c.json(restaurant,200)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}

//insert restaurant
export const insertRestaurant = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    try {
        const restaurant = await c.req.json();
        const createdRestaurant = await insertRestaurantService(restaurant);
        if(!createdRestaurant) {
            return c.text("Restaurant not created 😒",400) 
        } 
        return c.json(restaurant,201)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}

//update restaurant
export const updateRestaurant = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    const id = Number(c.req.param("id"));
    const restaurant = await c.req.json();
    try{
        if(isNaN(id))  return c.text("Invalid ID 😒",400)
        //search for restaurant
        const existingRestaurant = await getRestaurantByIdService(id);
        if(existingRestaurant == undefined) return c.text("Restaurant not found 😒",404)
        //update restaurant
        const updatedRestaurant = await updateRestaurantService(id,restaurant);
        return c.json({msg: updatedRestaurant},200)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}

//delete restaurant
export const deleteRestaurant = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    const id = Number(c.req.param("id"));
    try{
        if(isNaN(id)) return c.text("Invalid ID 😒",400)
        //search for restaurant
        const existingRestaurant = await getRestaurantByIdService(id);
        if(existingRestaurant == undefined) return c.text("Restaurant not found 😒",404)
        //delete restaurant
        const deletedRestaurant = await deleteRestaurantService(id);
        return c.text("Restaurant deleted successfully 🎉",200)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}