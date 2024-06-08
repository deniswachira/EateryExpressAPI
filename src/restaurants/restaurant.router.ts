import {Hono} from "hono"
import { deleteRestaurant, getRestaurantById, insertRestaurant, listRestaurants, updateRestaurant } from "./restaurant.controller";

export const restaurantRouter = new Hono();

//get all restaurants
restaurantRouter.get('/restaurants', listRestaurants)

//get restaurant by id
restaurantRouter.get('/restaurants/:id', getRestaurantById)

//insert restaurant
restaurantRouter.post('/restaurants', insertRestaurant)

//update restaurant
restaurantRouter.put('/restaurants/:id', updateRestaurant)

//delete restaurant
restaurantRouter.delete('/restaurants/:id', deleteRestaurant)