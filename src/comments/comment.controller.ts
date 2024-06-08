import { Context } from "hono";
import { commentsService, deleteCommentService, getCommentByIdService, insertCommentService, updateCommentService } from "./comment.service";

//list comments
export const listComments = async (c:Context) => {
    try{
        const comments = await commentsService();
        if(comments == null) return c.text("No comments found 😒",404)
        return c.json(comments,200)
    }catch  (error:any) {
        return c.text(error?.message,400)
    }
}

//get comment by id
export const getCommentById = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    const id = parseInt(c.req.param("id"));
    try{
        if(isNaN(id))    return c.text("Invalid ID 😒",400)
        //search for comment
        const comment = await getCommentByIdService(id);
        if(comment == undefined) return c.text("Comment not found 😒",404)
        return c.json(comment,200)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}

//insert comment
export const insertComment = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    try {
        const comment = await c.req.json();
        const createdComment = await insertCommentService(comment);
        if(!createdComment) {
            return c.text("Comment not created 😒",400) 
        } 
        return c.json(comment,201)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}

//update comment
export const updateComment = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    const id = Number(c.req.param("id"));
    const comment = await c.req.json();
    try{
        if(isNaN(id))  return c.text("Invalid ID 😒",400)
        //search for comment
        const existingComment = await getCommentByIdService(id);
        if(existingComment == undefined) return c.text("Comment not found 😒",404)
        //update comment
        const updatedComment = await updateCommentService(id,comment);
        return c.json({msg: updatedComment},200)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}

//delete comment
export const deleteComment = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    const id = Number(c.req.param("id"));
    try{
        if(isNaN(id))  return c.text("Invalid ID 😒",400)
        //search for comment
        const existingComment = await getCommentByIdService(id);
        if(existingComment == undefined) return c.text("Comment not found 😒",404)
        //delete comment
        const deletedComment = await deleteCommentService(id);
        return c.json({msg: deletedComment},200)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}