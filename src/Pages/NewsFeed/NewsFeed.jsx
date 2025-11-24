import NewPostBox from "../../Components/NewPostBox/NewPostBox.jsx";
import Post from "../../Components/Post/Post.jsx";
import { getAllPosts } from "../../Services/postServices.js";
import PostSkeleton from "../../Components/Skeletons/PostSkeleton.jsx";
import { deletePost } from "../../Services/postServices.js";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Pagination, Skeleton } from "@heroui/react";
import { useEffect, useState } from "react";
import PeopleCard from "../../Components/PeopleCard/PeopleCard.jsx";

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
      toast.error("Failed to deleted Post");
    }
  }
  useEffect(() => {
    if (data?.data.paginationInfo.numberOfPages) {
      setTotalePage(data?.data.paginationInfo.numberOfPages);
      setInitialLoad(false);
    }
  }, [data]);
  useEffect(() => {
    scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);
  return (
    <>
      <title>Home | Nexify </title>
      <div className="grid grid-cols-1  md:grid-cols-3 gap-6 md:gap-4 ">
        <div className="col-span-1 md:col-span-2 mx-auto">
          <NewPostBox />
          {isLoading ? (
            [...Array(5)].map((_, index) => <PostSkeleton key={index} />)
          ) : (
            <>
              {data?.data.posts?.map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  deleteSinglePost={deleteSinglePost}
                />
              ))}
            </>
          )}
          {initialLoad ? (
            <Skeleton className="h-3 w-2xl rounded-lg mt-10" />
          ) : (
            <div className="pt-5 flex justify-center">
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
        <div className="col-span-1 mx-auto">
          <PeopleCard />
        </div>
      </div>
    </>
  );
}

export default NewsFeed;
