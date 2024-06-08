import {Hono} from 'hono'
import { deleteCategory, getCategoryById, insertCategory, listCategories, updateCategory } from './category.controller';


export const categoryRouter = new Hono();

//list categories
categoryRouter.get("/categories",listCategories);

//get category by id
categoryRouter.get("/categories/:id",getCategoryById);

//insert category
categoryRouter.post("/categories",insertCategory);

//update category
categoryRouter.put("/categories/:id",updateCategory);

//delete category
categoryRouter.delete("/categories/:id",deleteCategory);