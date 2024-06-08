import {Hono} from 'hono'
import { deleteAddress, getAddressById, insertAddress, listAddresses, updateAddress } from './address.controller'

export const addressRouter = new Hono()

//get all addresses
addressRouter.get('/addresses', listAddresses)

//get address by id
addressRouter.get('/addresses/:id', getAddressById)

//insert address
addressRouter.post('/addresses', insertAddress)

//update address
addressRouter.put('/addresses/:id', updateAddress)

//delete address
addressRouter.delete('/addresses/:id', deleteAddress)