import {Hono} from 'hono'
import { deleteComment, getCommentById, insertComment, listComments, updateComment } from './comment.controller'

export const commentRouter = new Hono()

//get all comments
commentRouter.get('/comments', listComments)

//get comment by id
commentRouter.get('/comments/:id', getCommentById)

//insert comment
commentRouter.post('/comments', insertComment)

//update comment
commentRouter.put('/comments/:id', updateComment)

//delete comment
commentRouter.delete('/comments/:id', deleteComment)