import { Dropdown, Spinner } from "@heroui/react";
import { DropdownTrigger } from "@heroui/react";
import { DropdownMenu } from "@heroui/react";
import { DropdownItem } from "@heroui/react";
import { IoIosArrowDropdown } from "react-icons/io";
import { useContext } from "react";
import { userContext } from "./../Context/UserContext.jsx";
import { useState } from "react";
import {
  deleteComment,
} from "../../Services/commentsServises.js";

export default function Comment({
  postComments,
  postUserId,
  postId,
  setPostComments,
  setEditingComment,
}) {
  const { userData } = useContext(userContext);
  const [isLoading, setIsLoading] = useState(false);

  async function deleteUserComment(commentId) {
    setIsLoading(true);
    try {
      const { data } = await deleteComment(commentId);
      console.log(data);
    setPostComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <div className="flex items-center gap-3">
        <img
          src={
            postComments?.commentCreator?.photo &&
            !postComments?.commentCreator?.photo.includes("/undefined")
              ? postComments.commentCreator.photo
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5osq5CiUcwCEI6R_ShcDl-GSKPjBIEcH9HQ&s"
          }
          alt={postComments?.commentCreator?.name || "user"}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1 bg-gray-50 rounded-2xl px-4 py-3">
          <h4 className="font-semibold text-sm text-gray-900">
            {postComments?.commentCreator?.name}
          </h4>
          <p className="text-sm text-gray-700 mt-1">{postComments?.content}</p>
        </div>
        {isLoading ? (
          <Spinner  color="secondary" />
        ) : (
          <>
            {postUserId === userData._id &&
              postComments?.commentCreator?._id == userData._id && (
                <Dropdown placement="bottom-end">
                  <DropdownTrigger className="cursor-pointer">
                    <IoIosArrowDropdown className="text-purple-700 text-2xl" />
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Profile Actions"
                    variant="flat"
                    color="secodary"
                  >
                    <DropdownItem
                      key="edit"
                      color="secondary"
                      onClick={() => setEditingComment(postComments)}
                    >
                      Edit
                    </DropdownItem>
                    <DropdownItem
                      key="delete"
                      color="danger"
                      onClick={() => {
                        deleteUserComment(postComments._id);
                      }}
                    >
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              )}
          </>
        )}
      </div>
    </>
  );
}
