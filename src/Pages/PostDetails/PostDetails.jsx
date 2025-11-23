import { deletePost, getSinglePost } from "../../Services/postServices";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PostSkeleton from "../../Components/Skeletons/PostSkeleton.jsx";
import PostHeader from "./../../Components/PostCard/PostHeader.jsx";
import PostBody from "./../../Components/PostCard/PostBody.jsx";
import Comment from "./../../Components/Comment/Comment.jsx";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import CommentInput from "../../Components/Comment/CommentInput.jsx";
export default function PostDetails() {
  const { id } = useParams();
  const [postComments, setPostComments] = useState([]);
  const [editingComment, setEditingComment] = useState(null);
  const navigate = useNavigate();
const { data: post, isLoading } = useQuery({
  queryKey: ["getSinglePosts", id],
  queryFn: () => getSinglePost(id),
  select: (res) => res.data?.post, 
});
useEffect(() => {
  if (post) {
    setPostComments(post.comments || []);
  }
}, [post]);

  async function deleteSinglePost(postId) {
    try {
      const { data } = await deletePost(postId);
      navigate("/home");
      toast.success("Post deleted successfully");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <title>Post Detailes | Social App</title>
      {isLoading ? (
        <PostSkeleton />
      ) : (
        <>
          <div className="max-w-2xl h-fit bg-white rounded-lg shadow-sm border border-gray-200 mt-3">
            <PostHeader
              photo={post.user.photo}
              name={post.user.name}
              createdAt={post.createdAt}
              postUserId={post.user._id}
              postId={id}
              deleteSinglePost={deleteSinglePost}
              post={post}
            />

            <PostBody
              isPostDetailes={true}
              body={post.body}
              image={post.image}
              commentsLength={postComments?.length}
              id={id}
            />
            <CommentInput
              setPostComments={setPostComments}
              id={id}
              commentId={editingComment?._id}
              editingComment={editingComment?.content}
              clearEditing={() => setEditingComment(null)}
            />

            {postComments &&
              postComments.length > 0 &&
              postComments
                .slice()
                .reverse()
                .map((comment) => (
                  <div className="p-3" key={comment._id}>
                    <Comment
                      postComments={comment}
                      postUserId={post.user._id}
                      postId={id}
                      setPostComments={setPostComments}
                      setEditingComment={setEditingComment}
                    />
                  </div>
                ))}
          </div>
        </>
      )}
    </>
  );
}
