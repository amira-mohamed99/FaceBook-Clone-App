import {
  Card,
  CardHeader,
  Divider,
  Image,
  Input,
  Skeleton,
  useDisclosure,
} from "@heroui/react";

import { BsCameraVideoFill } from "react-icons/bs";
import { IoMdPhotos } from "react-icons/io";
import { IoLogoYoutube } from "react-icons/io";
import { MdEmojiEmotions } from "react-icons/md";
import CreatePostModal from "./CreatePostModal.jsx";
import { useContext } from "react";
import { userContext } from "./../Context/UserContext.jsx";

const myIcons = [
  {
    icon: <BsCameraVideoFill />,
    name: "Go Live",
    color: "text-orange-400",
  },
  {
    icon: <IoMdPhotos />,
    name: "Photos",
    color: "text-green-500",
  },
  {
    icon: <IoLogoYoutube />,
    name: "Vedios",
    color: "text-red-400",
  },
  {
    icon: <MdEmojiEmotions />,
    name: "Feeling",
    color: "text-blue-500",
  },
];

export default function NewPostBox() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isLoading, userData } = useContext(userContext);

  return (
    <>
      <Card className="p-3 max-w-2xl">
        {isLoading ? (
          <div className=" w-full flex items-center gap-3">
            <div>
              <Skeleton className="flex rounded-full w-12 h-12" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-3 w-3/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
          </div>
        ) : (<>
          <CardHeader className="flex gap-3">
          <Image
            alt={userData.name}
            height={48}
            width={54}
            radius="full"
            src={userData.photo}
          />
          <Input
            isReadOnly
            onClick={onOpen}
            classNames={{
              base: "max-w-full h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/10 dark:bg-default-500/20",
            }}
            placeholder={`What's on your mind, ${userData?.name?.split(" ")[0] || " "}?`}
            radius="full"
          />
          <CreatePostModal
              isOpen={isOpen}
            onOpenChange={onOpenChange}
          />
        </CardHeader>

        <Divider />

        <div className="flex justify-between items-center gap-4 cursor-pointer p-5">
          {myIcons.map((icon) => (
            <div key={icon.name} className="flex items-center gap-2 ">
              <span className={`text-2xl ${icon.color}`}>{icon.icon}</span>
              <span className="font-medium">{icon.name}</span>
            </div>
          ))}
        </div>
        </>
        )}
      </Card>
    </>
  );
}
