import { eq } from "drizzle-orm";
import db from "../drizzle/db";

import { TStatusCatalog, TStatusCatalogSelect, status_catalog_table } from "../drizzle/schema";

export const statusCatalogService = async ():Promise<TStatusCatalogSelect[] | null>=> {
    return await db.query.status_catalog_table.findMany();    
}

export const getStatusCatalogByIdService = async (id:number):Promise<TStatusCatalogSelect | undefined> => {
    return await db.query.status_catalog_table.findFirst({
       where: eq(status_catalog_table.status_catalog_id, id)
    })
}

export const insertStatusCatalogService = async(statusCatalog:TStatusCatalog) => {
     await db.insert(status_catalog_table).values(statusCatalog)
    // .returning({id:status_catalog_table.status_catalog_id}
        return "Status Catalog created successfully 🎉";
}

export const updateStatusCatalogService = async(id:number,statusCatalog:TStatusCatalog) => {
    await db.update(status_catalog_table).set(statusCatalog).where(eq(status_catalog_table.status_catalog_id,id));
    return "Status Catalog updated successfully 🎉"
}

export const deleteStatusCatalogService = async(id:number) => {
    await db.delete(status_catalog_table).where(eq(status_catalog_table.status_catalog_id,id));
    return "Status Catalog deleted successfully 🎉"
}