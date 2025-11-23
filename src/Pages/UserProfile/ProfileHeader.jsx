import { Card, CardHeader, Image, Input, Skeleton } from "@heroui/react";
import { useState } from "react";
import { useRef } from "react";
import { FaPen } from "react-icons/fa6";
import { toast } from "react-toastify";

export default function ProfileHeader({ userData, uploadUserPhoto }) {
  const photoInput = useRef();
  const [isLoading, setIsLoading] = useState(false);

  function openPhotoInptu() {
    photoInput.current.click();
  }

  async function handelUserPhoto() {
    const photo = photoInput.current.files[0];
    if (!photo) {
      return toast.error("Please select a photo first");
    }
    setIsLoading(true);
    try {
     await uploadUserPhoto(photo);
      toast.success("Photo uploaded successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to upload photo");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <Card className="p-3 min-w-full h-fit relative overflow-visible">
        <div className="w-full h-56 overflow-hidden rounded-lg">
          <img
            src="https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1400&q=80"
            alt="cover"
            className="w-full h-full object-cover"
          />
        </div>

        <CardHeader className="flex justify-start -mt-10 px-4">
          <div className="relative">
            {isLoading ? (
              <Skeleton className="flex rounded-full w-20 h-20" />
            ): (    <Image
              alt="Profile Photo"
              height={100}
              width={100}
              radius="full"
              src={userData.photo}
              className="border-4 border-white shadow-md"
            />)}
        
            <FaPen
              onClick={openPhotoInptu}
              className="z-10 absolute top-15 text-purple-500 left-0 cursor-pointer hover:border-1 bg-gray-100 rounded-lg text-2xl p-1"
            />
          </div>
          <Input
            onChange={handelUserPhoto}
            ref={photoInput}
            type="file"
            className="hidden"
          />
        
          <div className="m-5 pt-3">
            <p className="font-bold pb-1 text-2xl">{userData.name}</p>
            <p>Frontend Developer</p>
          </div>
        </CardHeader>
      </Card>
    </>
  );
}
