import NewPostBox from "../../Components/NewPostBox/NewPostBox.jsx";
import Post from "../../Components/Post/Post.jsx";
import { getAllPosts } from "../../Services/postServices.js";
import PostSkeleton from "../../Components/Skeletons/PostSkeleton.jsx";
import { deletePost } from "../../Services/postServices.js";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Pagination, Skeleton } from "@heroui/react";
import { useEffect, useState } from "react";

function NewsFeed() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [totalePage, setTotalePage] = useState(1);
  const [initialLoad, setInitialLoad] = useState(true);
  const { data, isLoading } = useQuery({
    queryKey: ["getAllposts", page],
    queryFn: () => getAllPosts(page),
  });
  async function deleteSinglePost(postId) {
    try {
      await deletePost(postId);
      queryClient.invalidateQueries({ queryKey: ["getAllposts"] });
      toast.success("Post deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to change password");
    }
  }
  useEffect(() => {
    if (data?.data.paginationInfo.numberOfPages) {
      setTotalePage(data?.data.paginationInfo.numberOfPages);
      setInitialLoad(false);
    }
  }, [data]);
  useEffect(() => {
   scrollTo({top:0 , behavior:"smooth"})
  }, [page]);
  return (
    <>
    <title>Home | Social App</title>
      <div>
        <NewPostBox />
        {isLoading ? (
          [...Array(5)].map((skeleton, index) => <PostSkeleton key={index} />)
        ) : (
          <>
            {data?.data.posts &&
              data?.data.posts.map((post) => (
                <Post
                  key={post.id}
                  deleteSinglePost={deleteSinglePost}
                  post={post}
                />
              ))}
          </>
        )}
        {initialLoad ? (
          <Skeleton className="h-3 w-2xl rounded-lg mt-10" />
        ) : (
          <div className="pt-5 ml-35">
            <Pagination
              onChange={setPage}
              isCompact
              showControls
              initialPage={1}
              total={data?.data.paginationInfo.numberOfPages || totalePage}
              color="secondary"
              showShadow={true}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default NewsFeed;
