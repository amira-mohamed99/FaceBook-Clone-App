import { Card, CardBody, Divider } from "@heroui/react";
import { IoPersonAdd } from "react-icons/io5";

const people = [
  {
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    name: "Sarah Johnson",
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Michael Davis",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    name: "Emily Carter",
  },
  {
    avatar: "https://uifaces.co/our-content/donated/xyz.jpg",
    name: "Gimy Harbour",
  },
];

export default function PeopleCard() {
  return (
    <Card className="h-fit p-4 w-[250px] mt-2 shadow-lg rounded-2xl border border-purple-100 bg-white/90 backdrop-blur-md hidden md:block">
      <div>
        <h2 className="text-purple-600 font-semibold text-lg text-center p-2">
          People you may know
        </h2>
      </div>

      <Divider className="my-2" />
      <CardBody className="p-0">
        {people.map((person, index) => (
          <div key={person.name} className="py-3">
            <div className="flex items-center gap-4">
              <img
                src={person.avatar}
                alt={person.name}
                className="w-10 h-10 rounded-full object-cover"
              />

              <span className="font-medium text-sm">{person.name}</span>

              <span className="ml-auto text-purple-600 cursor-pointer text-lg">
                <IoPersonAdd />
              </span>
            </div>
            {index < people.length - 1 && <Divider className="my-3" />}
          </div>
        ))}
      </CardBody>
    </Card>
  );
}
