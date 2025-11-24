import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@heroui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useContext } from "react";
import { userContext } from "./../Context/UserContext.jsx";
import CreatePostModal from "./../NewPostBox/CreatePostModal.jsx";

export default function PostHeader({
  photo,
  name,
  createdAt,
  postUserId,
  postId,
  deleteSinglePost,
  post,
  
}) {
  const { userData } = useContext(userContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  

  return (
    <>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <img
            src={photo}
            alt={name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">
              {new Date(createdAt).toLocaleString("en-us", {
                dateStyle: "medium",
                timeStyle: "short",
                timeZone: "Africa/cairo",
              })}
            </p>
          </div>
        </div>
        {userData._id == postUserId && (
          <Dropdown placement="bottom-end">
            <DropdownTrigger className="cursor-pointer">
              <BsThreeDotsVertical className="w-5 h-5" />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Profile Actions"
              variant="flat"
              color="secodary"
            >
              <DropdownItem key="edit" color="secondary" onPress={onOpen}>
                Edit
              </DropdownItem>
              <DropdownItem
                key="delete"
                color="danger"
                onClick={() => {
                  deleteSinglePost(postId);
                }}
              >
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
        <CreatePostModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          post={post}
        />
      </div>
    </>
  );
}
