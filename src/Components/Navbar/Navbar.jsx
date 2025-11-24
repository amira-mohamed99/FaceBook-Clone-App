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
import { userContext } from "./../Context/UserContext.jsx";

export default function Navbar() {
  const { isLoading, userData ,setToken } = useContext(userContext);

  function logoutUser() {
    localStorage.removeItem("userToken");
    setToken(false);
  }
  return (
    <HeroNavbar isBordered maxWidth="full" height="50px" className="px-4 sm:px-8 md:px-15 flex flex-wrap items-center h-16 md:h-14">
      <NavbarContent justify="start" className="shrink-0">
        <Link to={"/home"}>
          <NavbarBrand className="mr-4 flex items-center">
            <img src={logo} width={30} alt="nexify logo" />
            <span className="font-bold ms-2 text-xl ">Nexify</span>
          </NavbarBrand>
        </Link>
      </NavbarContent>
      <NavbarBrand>
        <Input
          classNames={{
            base: "max-w-full md:max-w-xl h-8",
            mainWrapper: "h-full",
            input: "text-sm",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          type="search"
          radius="full"
        />
      </NavbarBrand>
      <NavbarContent as="div" className="items-center shrink-0" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger className="cursor-pointer">
            {isLoading ? (
              <Skeleton className="flex rounded-full w-12 h-12" />
            ) : (
              <Avatar
                key={userData?.photo}
                as="button"
                name={userData.name}
                size="sm"
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
