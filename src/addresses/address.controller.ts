import { Context } from "hono";
import { addressesService, deleteAddressService, getAddressByIdService, insertAddressService, updateAddressService } from "./address.service";

//list addresses
export const listAddresses = async (c:Context) => {
    try{
        const addresses = await addressesService();
        if(addresses == null) return c.text("No addresses found 😒",404)
        return c.json(addresses,200)
    }catch  (error:any) {
        return c.text(error?.message,400)
    }
}

//get address by id
export const getAddressById = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    const id = parseInt(c.req.param("id"));
    try{
        if(isNaN(id))    return c.text("Invalid ID 😒",400)
        //search for address
        const address = await getAddressByIdService(id);
        if(address == undefined) return c.text("Address not found 😒",404)
        return c.json(address,200)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}

//insert address
export const insertAddress = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    try {
        const address = await c.req.json();
        const createdAddress = await insertAddressService(address);
        if(!createdAddress) {
            return c.text("Address not created 😒",400) 
        } 
        return c.json(address,201)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}

//update address
export const updateAddress = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    const id = Number(c.req.param("id"));
    const address = await c.req.json();
    try{
        if(isNaN(id))  return c.text("Invalid ID 😒",400)
        //search for address
        const existingAddress = await getAddressByIdService(id);
        if(existingAddress == undefined) return c.text("Address not found 😒",404)
        //update address
        const updatedAddress = await updateAddressService(id,address);
        return c.json({msg: updatedAddress},200)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}

//delete address
export const deleteAddress = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    const id = Number(c.req.param("id"));
    try{
        if(isNaN(id))  return c.text("Invalid ID 😒",400)
        //search for address
        const existingAddress = await getAddressByIdService(id);
        if(existingAddress == undefined) return c.text("Address not found 😒",404)
        //delete address
        const deletedAddress = await deleteAddressService(id);
        return c.json({msg: deletedAddress},200)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}

