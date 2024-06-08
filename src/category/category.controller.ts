import { Context } from "hono";
import { deleteCategoryService, getCategoryByIdService, insertCategoryService, updateCategoryService, categoriesService } from "./category.service";

//list categories
export const listCategories = async (c:Context) => {
    try{
        const categories = await categoriesService();
        if(categories == null) return c.text("No categories found 😒",404)
        return c.json(categories,200)
    }catch  (error:any) {
        return c.text(error?.message,400)
    }
}

//get category by id
export const getCategoryById = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    const id = parseInt(c.req.param("id"));
    try{
        if(isNaN(id))    return c.text("Invalid ID 😒",400)
        //search for category
        const category = await getCategoryByIdService(id);
        if(category == undefined) return c.text("Category not found 😒",404)
        return c.json(category,200)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}

//insert category
export const insertCategory = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    try {
        const category = await c.req.json();
        const createdCategory = await insertCategoryService(category);
        if(!createdCategory) {
            return c.text("Category not created 😒",400) 
        } 
        return c.json(category,201)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}

//update category
export const updateCategory = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    const id = Number(c.req.param("id"));
    const category = await c.req.json();
    try{
        if(isNaN(id))  return c.text("Invalid ID 😒",400)
        //search for category
        const existingCategory = await getCategoryByIdService(id);
        if(existingCategory == undefined) return c.text("Category not found 😒",404)
        //update category
        const updatedCategory = await updateCategoryService(id,category);
        return c.json({msg: updatedCategory},200)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}

//delete category
export const deleteCategory = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    const id = Number(c.req.param("id"));
    try{
        if(isNaN(id))  return c.text("Invalid ID 😒",400)
        //search for category
        const existingCategory = await getCategoryByIdService(id);
        if(existingCategory == undefined) return c.text("Category not found 😒",404)
        //delete category
        const deletedCategory = await deleteCategoryService(id);
        return c.json({msg: deletedCategory},200)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}