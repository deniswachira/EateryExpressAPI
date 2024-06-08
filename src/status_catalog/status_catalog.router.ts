import {Hono} from "hono"
import { deleteStatusCatalog, getStatusCatalogById, insertStatusCatalog, listStatusCatalogs, updateStatusCatalog } from "./status_catalog.controller";

export const statusCatalogRouter = new Hono();

//get all status_catalogs
statusCatalogRouter.get('/status_catalogs', listStatusCatalogs)

//get status_catalog by id
statusCatalogRouter.get('/status_catalogs/:id', getStatusCatalogById)

//insert status_catalog
statusCatalogRouter.post('/status_catalogs', insertStatusCatalog)

//update status_catalog
statusCatalogRouter.put('/status_catalogs/:id', updateStatusCatalog)

//delete status_catalog
statusCatalogRouter.delete('/status_catalogs/:id', deleteStatusCatalog)
