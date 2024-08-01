import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";

export const NavBtnList = [
  {
    name: "dashboard",
    path: "/Dashboard",
    icon: HiOutlineHome,
  },
  {
    name: "Bookings",
    path: "/bookings",
    icon: HiOutlineCalendarDays,
  },
  {
    name: "Cabins",
    path: "/cabins",
    icon: HiOutlineHomeModern,
  },
  {
    name: "user",
    path: "/user",
    icon: HiOutlineUsers,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: HiOutlineCog6Tooth,
  },
];
