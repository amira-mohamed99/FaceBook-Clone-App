import { Link } from "react-router-dom";
import { IoChevronDown } from "react-icons/io5";
import Comment from "./../Comment/Comment";
import { useState } from 'react';
import CommentInput from "../Comment/commentInput";

export default function PostFooter({
  postComments,
  id,
  postUserId,
  setPostComments,
}) {
  const [editingComment, setEditingComment] = useState(null);
  return (
    <>
      {/* Comment Input */}
      <CommentInput
        setPostComments={setPostComments}
        id={id}
        commentId={editingComment?._id}
        editingComment={editingComment?.content}
        clearEditing={() => setEditingComment(null)}
      />
      <div className="p-4">
        {postComments && postComments.length > 0 && (
          <Comment
            postComments={postComments[postComments.length-1]}
            postUserId={postUserId}
            postId={id}
            setPostComments={setPostComments}
            setEditingComment={setEditingComment}
          />
        )}

        <Link to={`/post-detailes/${id}`}>
          <button className="flex items-center gap-2 text-gray-500 text-sm mt-3 mx-auto hover:text-gray-700 cursor-pointer">
            View all comments
            <IoChevronDown className="w-4 h-4" />
          </button>
        </Link>
      </div>
    </>
  );
}
