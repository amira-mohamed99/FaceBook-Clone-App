import { IoHomeOutline, IoStorefront } from "react-icons/io5";
import { FaUserFriends, FaBookmark, FaFlag } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";


const menuOptions = [
  {
    lable: "Home",
    icon: <IoHomeOutline size={20} className="text-purple-500" />,
    bgColor: "bg-purple-500/20",
    path: "/home",
  },
  {
    lable: "Profile",
    icon: <FaUser size={20} className="text-gray-700" />,
    bgColor: "bg-gray-700/10",
    path: "/profile",
  },
  {
    lable: "Friends",
    icon: <FaUserFriends size={20} className="text-green-500" />,
    bgColor: "bg-green-500/10",
    path: "/friends",
  },
  {
    lable: "Groups",
    icon: <MdGroups size={20} className="text-orange-500" />,
    bgColor: "bg-orange-500/10",
    path: "/groups",
  },
  {
    lable: "Marketplace",
    icon: <IoStorefront size={20} className="text-blue-500" />,
    bgColor: "bg-blue-500/10",
    path: "/marketplace",
  },
  {
    lable: "Saved",
    icon: <FaBookmark size={20} className="text-red-500" />,
    bgColor: "bg-red-500/10",
    path: "/saved",
  },
  {
    lable: "Pages",
    icon: <FaFlag size={20} className="text-sky-500" />,
    bgColor: "bg-sky-500/10",
    path: "/pages",
  },
];

const myGroups = [
  {
    groupIcon:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScJpvNPN9A4daGXB_T6MygnuUOfa4wzd_iTxjxmbM1Atl-317wxhh69E8jHHKYu7tKIEA&usqp=CAU",
    groupName: "Book Lovers",
  },
  {
    groupIcon:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwLQ45i7DF6n11SSXBFqhsN7ixDs7Ro21aMDqzgnlVej8GVxcX0AEPVwCnCFUs7tOVuWE&usqp=CAU",
    groupName: "Food City",
  },
  {
    groupIcon:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuk8lzTb294QU8RsK1uhiElLmIR5uswUwcwmm5zpS6XlMQmVDe0khQDLOSgzEA8klpUdQ&usqp=CAU",
    groupName: "Games Mix",
  },
];
export default function Sidebar() {
  return (
    <>
      <div className="p-4 rounded-full sticky top-20 h-screen hidden lg:block  ">
        <div className="flex flex-col gap-1">
          {menuOptions.map((option) => (
            <NavLink
              key={option.lable}
              to={option.path}
              className={({ isActive }) =>
                `flex items-center gap-2 ${
                  isActive ? option.bgColor : ""
                } p-2 rounded-lg`
              }
            >
              <div className={`${option.bgColor} p-2 rounded-full `}>
                {option.icon}
              </div>
              <span className="font-medium md:text-lg">{option.lable}</span>
            </NavLink>
          ))}
        </div>
        <div className="mt-4 space-y-4">
          <h2 className="text-xl font-semibold border-purple-500 pt-4">
            My Groups
          </h2>
          {myGroups.map((group) => (
            <div key={group.groupName} className="flex items-center gap-2 mb-4">
              <img src={group.groupIcon} alt={group.groupName}  className="w-8 h-8 rounded-full"/>
              <span className="font-medium md:text-lg" >{group.groupName}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
