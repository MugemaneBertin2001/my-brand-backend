import CommentModel from "../models/commentModel";

export const addComment = async (blogId: string, name: string, body: string): Promise<string> => {
    const comment = await CommentModel.create({ blog: blogId, name, body });
    return comment._id.toString();
};

export const deleteComment = async (commentId: string): Promise<void> => {
    await CommentModel.findByIdAndDelete(commentId);
};

export const getCommentsForBlog = async (blogId: string): Promise<{ name: string; body: string }[]> => {
    const comments = await CommentModel.find({ blog: blogId }).select('name body');
    return comments.map(comment => ({ name: comment.name, body: comment.body }));
};
