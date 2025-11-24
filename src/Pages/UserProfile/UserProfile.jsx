import { useContext } from "react";
import ProfileHeader from "./ProfileHeader";
import { userContext } from "../../Components/Context/UserContext.jsx";
import AboutUser from "./AboutUser.jsx";
import { useQuery } from "@tanstack/react-query";
import PostSkeleton from "../../Components/Skeletons/PostSkeleton.jsx";
import Post from "../../Components/Post/Post.jsx";
import { getAllPosts } from "../../Services/postServices.js";

function UserProfile() {
  const { userData, uploadUserPhoto } = useContext(userContext);

  const { data: allPosts , isLoading} = useQuery({
    queryKey: ["getAllposts"],
    queryFn: getAllPosts,
    select: (data) => data?.data.posts,
  });

  return (
    <>
    <title>Profile | Nexify</title>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 max-w-lg md:max-w-4xl container">
        <div className="order-1 col-span-1 md:col-span-3">
          <ProfileHeader
            userData={userData}
            uploadUserPhoto={uploadUserPhoto}
          />
        </div>
        <div className="order-3 md:order-2 col-span-1 md:col-span-2 w-full">
          {isLoading ? (
            [...Array(5)].map((skeleton, index) => <PostSkeleton key={index} />)
          ) : (
            <>
              {allPosts &&
                allPosts.slice(0,5).map((post) => <Post key={post.id} post={post} />)}
            </>
          )}{" "}
        </div>
        <div className="order-2 md:order-3 col-span-1 md:col-span-1 ">
          <AboutUser />
        </div>
      </div>
    </>
  );
}

export default UserProfile;
