import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
  Image,
  Input,
  Textarea,
} from "@heroui/react";
import { useContext, useRef, useState } from "react";
import { IoMdPhotos } from "react-icons/io";
import { createPost, updatePost } from "../../Services/postServices.js";
import { userContext } from "../Context/UserContext.jsx";
import { useQueryClient } from "@tanstack/react-query";

export default function CreatePostModal({ post, isOpen, onOpenChange }) {
  const fileInput = useRef();
  const bodyMsg = useRef();
  const [selectedPhoto, setSelectedPhoto] = useState(post?.image || "");
  const [formDataFile, setFormDataFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useContext(userContext);
  const queryClient = useQueryClient();

  function openFileInput() {
    fileInput.current.click();
  }
  function getFile() {
    const file = fileInput.current.files[0];
    setSelectedPhoto(URL.createObjectURL(file));
    setFormDataFile(file);
  }
  async function editPost() {
    const formData = new FormData();
    formData.append("body", bodyMsg.current.value || " ");
    if (formDataFile) {
      formData.append("image", formDataFile);
    }
    setIsLoading(true);
    try {
      if (post) {
        await updatePost(post._id, formData);
        queryClient.invalidateQueries({ queryKey: ["getAllposts"] });
        queryClient.invalidateQueries({
          queryKey: ["getSinglePosts", post._id],
        });
      } else {
        await createPost(formData);
        queryClient.invalidateQueries({ queryKey: ["getAllposts"] });
      }
      onOpenChange(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <Modal
        size="lg"
        isOpen={isOpen}
        onOpenChange={() => {
          onOpenChange(false);
          if (!post) {
            setSelectedPhoto("");
          }
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-center font-bold text-xl text-purple-500">
                {post ? "Update" : "Create"} Post
              </ModalHeader>
              <Divider />

              <ModalBody>
                <div className="flex gap-2">
                  <Image
                    className="rounded-full border-purple-500"
                    alt="heroui logo"
                    height={40}
                    radius="sm"
                    width={40}
                    src={
                      userData.photo ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5osq5CiUcwCEI6R_ShcDl-GSKPjBIEcH9HQ&s"
                    }
                  />
                  <p className="flex flex-col ">
                    <span className="font-bold"> {userData.name}</span>
                    <span>puplic</span>
                  </p>
                </div>
                <Textarea
                  minRows={`${selectedPhoto ? "" : 50}`}
                  placeholder={`What's on your mind, ${
                    userData?.name?.split(" ")[0] || " "
                  }?`}
                  radius="full"
                  ref={bodyMsg}
                  defaultValue={post?.body || ""}
                />
                {selectedPhoto && (
                  <div className="relative w-full">
                    <Button
                      variant="light"
                      isIconOnly
                      size="sm"
                      onPress={() => setSelectedPhoto("")}
                      className="absolute top-0 right-0 text-black font-bold z-20"
                    >
                      ✕
                    </Button>
                    <Image alt="photo" src={selectedPhoto} className="z-10" />
                  </div>
                )}
              </ModalBody>
              <div className="flex items-center gap-2 p-5">
                <span className="font-bold">Add to your post: </span>
                <IoMdPhotos
                  onClick={openFileInput}
                  className="text-2xl text-green-500 cursor-pointer"
                />
                <Input
                  onChange={getFile}
                  ref={fileInput}
                  type="file"
                  className="hidden"
                />
              </div>
              <Divider />
              <ModalFooter>
                <Button
                  fullWidth
                  color="secondary"
                  isLoading={isLoading}
                  onPress={editPost}
                  className="text-lg"
                >
                  {post ? "Update" : "Post"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
