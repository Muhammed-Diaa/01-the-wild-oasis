import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
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
    name: "Settings",
    path: "/settings",
    icon: HiOutlineCog6Tooth,
  },
];
