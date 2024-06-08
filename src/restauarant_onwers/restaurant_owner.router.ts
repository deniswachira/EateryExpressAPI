import {Hono} from 'hono'

import { deleteRestaurantOwner, getRestaurantOwnerById, insertRestaurantOwner, listRestaurantOwners, updateRestaurantOwner } from  './restauarant_onwer.controller';

export const restaurantOwnerRouter = new Hono();

//list restaurants
restaurantOwnerRouter.get("/restaurants",listRestaurantOwners);

//get restaurant by id
restaurantOwnerRouter.get("/restaurants/:id",getRestaurantOwnerById);

//insert restaurant
restaurantOwnerRouter.post("/restaurants",insertRestaurantOwner);

//update restaurant
restaurantOwnerRouter.put("/restaurants/:id",updateRestaurantOwner);

//delete restaurant
restaurantOwnerRouter.delete("/restaurants/:id",deleteRestaurantOwner);