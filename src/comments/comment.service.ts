import { eq } from "drizzle-orm";
import db from "../drizzle/db";

import { TComment, TCommentSelect, comment_table } from "../drizzle/schema";

export const commentsService = async ():Promise<TCommentSelect[] | null>=> {
    return await db.query.comment_table.findMany();    
}

export const getCommentByIdService = async (id:number):Promise<TCommentSelect | undefined> => {
    return await db.query.comment_table.findFirst({
       where: eq(comment_table.comment_id, id)
    })
}

export const insertCommentService = async(comment:TComment) => {
     await db.insert(comment_table).values(comment)
    // .returning({id:comment_table.comment_id}
        return "Comment created successfully 🎉";
}

export const updateCommentService = async(id:number,comment:TComment) => {
    await db.update(comment_table).set(comment).where(eq(comment_table.comment_id,id));
    return "Comment updated successfully 🎉"
}

export const deleteCommentService = async(id:number) => {
    await db.delete(comment_table).where(eq(comment_table.comment_id,id));
    return "Comment deleted successfully 🎉"
}