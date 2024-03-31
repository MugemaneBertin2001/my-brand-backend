import CommentModel from "../models/commentModel";

export const addComment = async (blogId: string, name: string, body: string): Promise<string> => {
    const comment = await CommentModel.create({ blogId: blogId, name, body });
    return comment.toString();
};

export const deleteComment = async (commentId: string): Promise<void> => {
    await CommentModel.findByIdAndDelete(commentId);
};

export const getCommentsForBlog = async (blogId: string): Promise<{ name: string; body: string; id:any }[]> => {
    const comments = await CommentModel.find({ blogId: blogId }).select('name body');
    return comments.map(comment => ({ id:comment.id,name: comment.name, body: comment.body }));
};
