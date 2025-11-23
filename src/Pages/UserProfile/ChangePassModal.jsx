import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useContext, useState } from "react";
import { userContext } from "../../Components/Context/UserContext.jsx";
import { toast } from "react-toastify";

export default function ChangePassModal({ isOpen, onOpenChange }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { changeUserPass, isLoading } = useContext(userContext);

  async function makeNewPassword() {
    try {
      const message = await changeUserPass(currentPassword, newPassword);
      console.log(message);
      setNewPassword("");
      setCurrentPassword("");
      onOpenChange(false);
      toast.success("Password changed Successfully");
    } catch (error) {
      toast.error("Failed to change password");
    }
  }
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={(open) => {
          onOpenChange(open);
          if (!open) {
            setNewPassword("");
            setCurrentPassword("");
          }
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-center font-bold text-2xl text-purple-500">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  type={showPassword ? "text" : "password"}
                  label="Current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  endContent={
                    showPassword ? (
                      <IoEye
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-2xl text-default-400 "
                      />
                    ) : (
                      <IoEyeOff
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-2xl text-default-400"
                      />
                    )
                  }
                />
                <Input
                  isRequired
                  type={showNewPassword ? "text" : "password"}
                  label="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  endContent={
                    showNewPassword ? (
                      <IoEye
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="text-2xl text-default-400 "
                      />
                    ) : (
                      <IoEyeOff
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="text-2xl text-default-400"
                      />
                    )
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  fullWidth
                  color="secondary"
                  className="text-xl"
                  onPress={makeNewPassword}
                  isLoading={isLoading}
                >
                  change
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
