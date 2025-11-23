import { Card, Divider, useDisclosure } from "@heroui/react";
import { MdEmail } from "react-icons/md";
import { FaUser, FaBirthdayCake } from "react-icons/fa";
import { useContext } from "react";
import ChangePassModal from "./ChangePassModal";
import { userContext } from "../../Components/Context/UserContext.jsx";

export default function AboutUser() {
  const { userData ,setToken } = useContext(userContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  function logoutUser() {
    localStorage.removeItem("userToken");
    setToken(false);
  }

  return (
    <Card className="h-fit p-6 shadow-lg rounded-2xl border border-purple-100 bg-white/90 backdrop-blur-md sticky top-24">
      <h2 className="text-center text-purple-600 font-semibold text-2xl mb-4">
        About
      </h2>
      <Divider className="mb-4" />
      <div className="space-y-5">
        <div className="flex gap-3 items-center">
          <FaUser className="text-purple-500 text-xl" />
          <p className="text-gray-700 capitalize">{userData.gender}</p>
        </div>
        <Divider />
        <div className="flex gap-3 items-center">
          <MdEmail className="text-purple-500 text-2xl" />
          <p className="text-gray-700 break-all text-sm">{userData.email}</p>
        </div>
        <Divider />
        <div className="flex gap-3 items-center">
          <FaBirthdayCake className="text-purple-500 text-xl" />
          <p className="text-gray-700">{userData.dateOfBirth}</p>
        </div>

        <Divider />
        <div className="flex justify-between items-center pt-2">
          <button
            className="text-purple-600 font-medium hover:underline cursor-pointer"
            onClick={onOpen}
          >
            Change password
          </button>
          <ChangePassModal onOpenChange={onOpenChange} isOpen={isOpen} />
          <button
            className="text-red-500 font-medium hover:underline cursor-pointer"
            onClick={() => logoutUser()}
          >
            Logout
          </button>
        </div>
      </div>
    </Card>
  );
}
