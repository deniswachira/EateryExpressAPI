import { Context } from "hono";
import { deleteRestaurantOwnerService, getRestaurantOwnerByIdService, insertRestaurantOwnerService, restaurantOwnersService, updateRestaurantOwnerService } from "./restauarant_onwer.service";

//list restaurant owners
export const listRestaurantOwners = async (c:Context) => {
    try{
        const restaurantOwners = await restaurantOwnersService();
        if(restaurantOwners == null) return c.text("No restaurant owners found 😒",404)
        return c.json(restaurantOwners,200)
    }catch  (error:any) {
        return c.text(error?.message,400)
    }
}

//get restaurant owner by id
export const getRestaurantOwnerById = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    const id = parseInt(c.req.param("id"));
    try{
        if(isNaN(id))    return c.text("Invalid ID 😒",400)
        //search for restaurant owner
        const restaurantOwner = await getRestaurantOwnerByIdService(id);
        if(restaurantOwner == undefined) return c.text("Restaurant owner not found 😒",404)
        return c.json(restaurantOwner,200)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}

//insert restaurant owner
export const insertRestaurantOwner = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    try {
        const restaurantOwner = await c.req.json();
        const createdRestaurantOwner = await insertRestaurantOwnerService(restaurantOwner);
        if(!createdRestaurantOwner) {
            return c.text("Restaurant owner not created 😒",400) 
        } 
        return c.json(restaurantOwner,201)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}

//update restaurant owner
export const updateRestaurantOwner = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    const id = Number(c.req.param("id"));
    const restaurantOwner = await c.req.json();
    try{
        if(isNaN(id))  return c.text("Invalid ID 😒",400)
        //search for restaurant owner
        const existingRestaurantOwner = await getRestaurantOwnerByIdService(id);
        if(existingRestaurantOwner == undefined) return c.text("Restaurant owner not found 😒",404)
        //update restaurant owner
        const updatedRestaurantOwner = await updateRestaurantOwnerService(id,restaurantOwner);
        return c.json({msg: updatedRestaurantOwner},200)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}

//delete restaurant owner
export const deleteRestaurantOwner = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    const id = Number(c.req.param("id"));
    try{
        if(isNaN(id))  return c.text("Invalid ID 😒",400)
        //search for restaurant owner
        const existingRestaurantOwner = await getRestaurantOwnerByIdService(id);
        if(existingRestaurantOwner == undefined) return c.text("Restaurant owner not found 😒",404)
        //delete restaurant owner
        const deletedRestaurantOwner = await deleteRestaurantOwnerService(id);
        return c.json({msg: deletedRestaurantOwner},200)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}