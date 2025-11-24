import PostHeader from "../PostCard/PostHeader.jsx";
import PostBody from "../PostCard/PostBody.jsx";
import PostFooter from "./../PostCard/PostFooter.jsx";
import { useState } from "react";

export default function Post({ post, deleteSinglePost }) {
  const [postComments, setPostComments] = useState(post?.comments || []);
  return (
    <>
      <div className="max-w-lg bg-white rounded-lg shadow-sm border border-gray-200 mt-3 ">
        <PostHeader
          photo={post.user.photo}
          name={post.user.name}
          createdAt={post.createdAt}
          postUserId={post.user._id}
          postId={post._id}
          deleteSinglePost={deleteSinglePost}
          post={post}
        />

        <PostBody
          body={post.body}
          image={post.image}
          id={post._id}
          commentsLength={postComments?.length}
        />

        <PostFooter
          postComments={postComments}
          id={post._id}
          postUserId={post.user._id}
          setPostComments={setPostComments}
        />
      </div>
    </>
  );
}
