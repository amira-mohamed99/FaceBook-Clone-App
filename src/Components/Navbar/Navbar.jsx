import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Skeleton,
} from "@heroui/react";

import logo from "../../assets/img/logo.png";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "./../Context/UserContext";

export default function Navbar() {
  const { isLoading, userData ,setToken } = useContext(userContext);

  function logoutUser() {
    localStorage.removeItem("userToken");
    setToken(false);
  }
  return (
    <HeroNavbar isBordered maxWidth="full" className="px-15">
      <NavbarContent justify="start">
        <Link to={"/home"}>
          <NavbarBrand className="mr-4">
            <img src={logo} width={35} alt="nexify logo" />
            <span className="font-bold ms-2 text-2xl ">Nexify</span>
          </NavbarBrand>
        </Link>
      </NavbarContent>
      <NavbarBrand>
        <Input
          classNames={{
            base: "max-w-full h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="md"
          type="search"
          radius="full"
        />
      </NavbarBrand>
      <NavbarContent as="div" className="items-center" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger className="cursor-pointer">
            {isLoading ? (
              <Skeleton className="flex rounded-full w-12 h-12" />
            ) : (
              <Avatar
                key={userData?.photo}
                as="button"
                name={userData.name}
                size="lg"
                src={userData?.photo}
              />
            )}
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold" color="default" variant="light">
                Signed in as
              </p>
              <p className="font-semibold" color="default">
                {userData.email}
              </p>
            </DropdownItem>
            <DropdownItem
              key="settings"
              as={Link}
              to={"/profile"}
              color="secondary"
            >
              My Profile
            </DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              onClick={() => logoutUser()}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </HeroNavbar>
  );
}
