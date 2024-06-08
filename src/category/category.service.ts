import { eq } from "drizzle-orm";
import db from "../drizzle/db";

import { TCategory, TCategorySelect, category_table } from "../drizzle/schema";

export const categoriesService = async ():Promise<TCategorySelect[] | null>=> {
    return await db.query.category_table.findMany();    
}

export const getCategoryByIdService = async (id:number):Promise<TCategorySelect | undefined> => {
    return await db.query.category_table.findFirst({
       where: eq(category_table.category_id, id)
    })
}

export const insertCategoryService = async(category:TCategory) => {
     await db.insert(category_table).values(category)
    // .returning({id:category_table.category_id}
        return "Category created successfully 🎉";
}

export const updateCategoryService = async(id:number,category:TCategory) => {
    await db.update(category_table).set(category).where(eq(category_table.category_id,id));
    return "Category updated successfully 🎉"
}

export const deleteCategoryService = async(id:number) => {
    await db.delete(category_table).where(eq(category_table.category_id,id));
    return "Category deleted successfully 🎉"
}