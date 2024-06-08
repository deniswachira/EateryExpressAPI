import {Hono} from "hono"
import { deleteOrderStatus, getOrderStatusById, insertOrderStatus, listOrdersStatus, updateOrderStatus } from "./order_status.controller";


export const orderStatusRouter = new Hono();

//get all orders_status
orderStatusRouter.get('/orders-status', listOrdersStatus);

//get orderstatus by id
orderStatusRouter.get('/orders-status/:id', getOrderStatusById);

//insert orderstatus
orderStatusRouter.post('/orders-status', insertOrderStatus);

//update orderstatus
orderStatusRouter.put('/orderstatus/:id', updateOrderStatus);

//delete orderstatus
orderStatusRouter.delete('/orderstatus/:id', deleteOrderStatus);