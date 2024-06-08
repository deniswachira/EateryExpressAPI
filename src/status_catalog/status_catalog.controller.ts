import { Context } from "hono";
import { deleteStatusCatalogService, getStatusCatalogByIdService, insertStatusCatalogService, statusCatalogService, updateStatusCatalogService } from "./status_catalog.service";

//list status_catalogs
export const listStatusCatalogs = async (c:Context) => {
    try{
        const status_catalogs = await statusCatalogService();
        if(status_catalogs == null) return c.text("No status_catalogs found 😒",404)
        return c.json(status_catalogs,200)
    }catch  (error:any) {
        return c.text(error?.message,400)
    }
}

//get status_catalog by id
export const getStatusCatalogById = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    const id = parseInt(c.req.param("id"));
    try{
        if(isNaN(id))    return c.text("Invalid ID 😒",400)
        //search for status_catalog
        const status_catalog = await getStatusCatalogByIdService(id);
        if(status_catalog == undefined) return c.text("Status_catalog not found 😒",404)
        return c.json(status_catalog,200)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}

//insert status_catalog
export const insertStatusCatalog = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    try {
        const status_catalog = await c.req.json();
        const createdStatusCatalog = await insertStatusCatalogService(status_catalog);
        if(!createdStatusCatalog) {
            return c.text("Status_catalog not created 😒",400) 
        } 
        return c.json(status_catalog,201)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}

//update status_catalog 
export const updateStatusCatalog = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    const id = Number(c.req.param("id"));
    const status_catalog = await c.req.json();
    try{
        if(isNaN(id))  return c.text("Invalid ID 😒",400)
        //search for status_catalog
        const existingStatusCatalog = await getStatusCatalogByIdService(id);
        if(existingStatusCatalog == undefined) return c.text("Status_catalog not found 😒",404)
        //update status_catalog
        const updatedStatusCatalog = await updateStatusCatalogService(id,status_catalog);
        return c.json({msg: updatedStatusCatalog},200)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}

//delete status_catalog
export const deleteStatusCatalog = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    const id = Number(c.req.param("id"));
    try{
        if(isNaN(id))  return c.text("Invalid ID 😒",400)
        //search for status_catalog
        const existingStatusCatalog = await getStatusCatalogByIdService(id);
        if(existingStatusCatalog == undefined) return c.text("Status_catalog not found 😒",404)
        //delete status_catalog
        const deletedStatusCatalog = await deleteStatusCatalogService(id);
        return c.json({msg: deletedStatusCatalog},200)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}